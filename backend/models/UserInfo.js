const { eq } = require('drizzle-orm');
const db = require('../db');
const { userInfo } = require('../db/schema');

class UserInfo {
  constructor(data) {
    this.id = data.id;
    this.userId = data.userId;
    this.nama = data.nama;
    this.usia = data.usia;
    this.alamat = data.alamat;
    this.jenisKelamin = data.jenisKelamin;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  static async create(data) {
    const [info] = await db.insert(userInfo).values({
      ...data,
      updatedAt: new Date()
    }).returning();
    return new UserInfo(info);
  }

  static async findByUserId(userId) {
    const info = await db.query.userInfo.findFirst({
      where: eq(userInfo.userId, userId)
    });
    return info ? new UserInfo(info) : null;
  }

  async update(updates) {
    const [updated] = await db
      .update(userInfo)
      .set({
        ...updates,
        updatedAt: new Date()
      })
      .where(eq(userInfo.userId, this.userId))
      .returning();
    Object.assign(this, new UserInfo(updated));
    return this;
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      nama: this.nama,
      usia: this.usia,
      alamat: this.alamat,
      jenisKelamin: this.jenisKelamin,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = UserInfo; 