const fs = require('fs');
const path = require('path');

class ModelGenerator {
  constructor() {
    this.modelsDir = path.join(process.cwd(), 'models');
    this.migrationsDir = path.join(process.cwd(), 'supabase', 'migrations');
    this.ensureDirectories();
  }

  ensureDirectories() {
    if (!fs.existsSync(this.modelsDir)) {
      fs.mkdirSync(this.modelsDir, { recursive: true });
    }
    if (!fs.existsSync(this.migrationsDir)) {
      fs.mkdirSync(this.migrationsDir, { recursive: true });
    }
  }

  generateModelFile(modelName, schema) {
    const modelTemplate = `const supabase = require('../supabase/client');

class ${modelName} {
  constructor(data) {
    ${Object.keys(schema).map(field => `this.${field} = data.${field};`).join('\n    ')}
  }

  static async findById(id) {
    const { data, error } = await supabase
      .from('${modelName.toLowerCase()}s')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data ? new ${modelName}(data) : null;
  }

  static async findAll(options = {}) {
    const { limit = 10, offset = 0, orderBy = 'created_at' } = options;
    const { data, error } = await supabase
      .from('${modelName.toLowerCase()}s')
      .select('*')
      .order(orderBy, { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data.map(item => new ${modelName}(item));
  }

  static async create(data) {
    const { data: newData, error } = await supabase
      .from('${modelName.toLowerCase()}s')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return new ${modelName}(newData);
  }

  async update(updates) {
    const { data, error } = await supabase
      .from('${modelName.toLowerCase()}s')
      .update(updates)
      .eq('id', this.id)
      .select()
      .single();

    if (error) throw error;
    Object.assign(this, new ${modelName}(data));
    return this;
  }

  async delete() {
    const { error } = await supabase
      .from('${modelName.toLowerCase()}s')
      .delete()
      .eq('id', this.id);

    if (error) throw error;
    return true;
  }

  static async search(field, query) {
    const { data, error } = await supabase
      .from('${modelName.toLowerCase()}s')
      .select('*')
      .ilike(field, \`%\${query}%\`)
      .limit(10);

    if (error) throw error;
    return data.map(item => new ${modelName}(item));
  }
}

module.exports = ${modelName};`;

    const filePath = path.join(this.modelsDir, `${modelName}.js`);
    fs.writeFileSync(filePath, modelTemplate);
    console.log(`Generated model file: ${filePath}`);
  }

  generateMigration(modelName, schema) {
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
    const fileName = `${timestamp}_create_${modelName.toLowerCase()}s.sql`;
    
    const migrationTemplate = `-- Create ${modelName.toLowerCase()}s table
CREATE TABLE public.${modelName.toLowerCase()}s (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  ${Object.entries(schema).map(([field, type]) => `${field} ${type}`).join(',\n  ')},
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up RLS (Row Level Security)
ALTER TABLE public.${modelName.toLowerCase()}s ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public ${modelName.toLowerCase()}s are viewable by everyone."
  ON public.${modelName.toLowerCase()}s FOR SELECT
  USING ( true );

CREATE POLICY "Authenticated users can create ${modelName.toLowerCase()}s."
  ON public.${modelName.toLowerCase()}s FOR INSERT
  WITH CHECK ( auth.role() = 'authenticated' );

CREATE POLICY "Users can update their own ${modelName.toLowerCase()}s."
  ON public.${modelName.toLowerCase()}s FOR UPDATE
  USING ( auth.uid() = created_by )
  WITH CHECK ( auth.uid() = created_by );

CREATE POLICY "Users can delete their own ${modelName.toLowerCase()}s."
  ON public.${modelName.toLowerCase()}s FOR DELETE
  USING ( auth.uid() = created_by );

-- Create updated_at trigger
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.${modelName.toLowerCase()}s
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();`;

    const filePath = path.join(this.migrationsDir, fileName);
    fs.writeFileSync(filePath, migrationTemplate);
    console.log(`Generated migration file: ${filePath}`);
  }
}

module.exports = new ModelGenerator(); 