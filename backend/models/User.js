const { eq } = require('drizzle-orm');
const bcrypt = require('bcryptjs');
const db = require('../db');
const { users } = require('../db/schema');

class User {
  constructor(data) {
    this.id = data.id;
    this.nama = data.nama;
    this.usia = data.usia;
    this.alamat = data.alamat;
    this.jenisKelamin = data.jenisKelamin;
    this.email = data.email;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  static async create({ email, password, nama, usia, alamat, jenisKelamin }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [user] = await db.insert(users).values({
      email,
      password: hashedPassword,
      nama,
      usia,
      alamat,
      jenisKelamin,
      updatedAt: new Date()
    }).returning();
    return new User(user);
  }

  static async findByEmail(email) {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email)
    });
    return user ? new User(user) : null;
  }

  static async findById(id) {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id)
    });
    return user ? new User(user) : null;
  }

  async verifyPassword(password) {
    const user = await db.query.users.findFirst({
      where: eq(users.id, this.id)
    });
    return bcrypt.compare(password, user.password);
  }

  async update(updates) {
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const [updated] = await db
      .update(users)
      .set({
        ...updates,
        updatedAt: new Date()
      })
      .where(eq(users.id, this.id))
      .returning();
    Object.assign(this, new User(updated));
    return this;
  }

  toJSON() {
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
}

module.exports = User; 