#!/usr/bin/env node

const modelGenerator = require('../utils/modelGenerator');

function printUsage() {
  console.log(`
Usage: node generate.js model <ModelName> [fields...]

Example:
  node generate.js model Post title:text content:text published:boolean author_id:uuid

Available field types:
  - text
  - varchar
  - integer
  - float
  - boolean
  - uuid
  - jsonb
  - timestamp
  - date
  `);
}

function parseFieldType(type) {
  const typeMap = {
    text: 'text',
    varchar: 'varchar(255)',
    integer: 'integer',
    float: 'double precision',
    boolean: 'boolean',
    uuid: 'uuid',
    jsonb: 'jsonb',
    timestamp: 'timestamp with time zone',
    date: 'date'
  };

  return typeMap[type] || 'text';
}

function generateModel() {
  const [,, command, modelName, ...fields] = process.argv;

  if (!command || !modelName || fields.length === 0) {
    printUsage();
    process.exit(1);
  }

  const schema = {};
  fields.forEach(field => {
    const [name, type] = field.split(':');
    schema[name] = parseFieldType(type || 'text');
  });

  try {
    modelGenerator.generateModelFile(modelName, schema);
    modelGenerator.generateMigration(modelName, schema);
    console.log(`Successfully generated model and migration for ${modelName}`);
  } catch (error) {
    console.error('Error generating files:', error);
    process.exit(1);
  }
}

generateModel(); 