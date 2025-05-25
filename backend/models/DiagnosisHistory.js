const { eq } = require('drizzle-orm');
const db = require('../db');
const { diagnosisHistory } = require('../db/schema');

class DiagnosisHistory {
  constructor(data) {
    this.id = data.id;
    this.userId = data.userId;
    this.symptoms = data.symptoms;
    this.diagnosis = data.diagnosis;
    this.confidence = data.confidence;
    this.recommendations = data.recommendations;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  static async create(data) {
    const [history] = await db.insert(diagnosisHistory).values({
      ...data,
      symptoms: JSON.stringify(data.symptoms),
      recommendations: data.recommendations ? JSON.stringify(data.recommendations) : null
    }).returning();
    return new DiagnosisHistory(history);
  }

  static async findByUserId(userId, options = {}) {
    const { limit = 10, offset = 0 } = options;
    const histories = await db.query.diagnosisHistory.findMany({
      where: eq(diagnosisHistory.userId, userId),
      orderBy: (diagnosisHistory, { desc }) => [desc(diagnosisHistory.createdAt)],
      limit,
      offset
    });
    return histories.map(history => new DiagnosisHistory(history));
  }

  static async findById(id) {
    const history = await db.query.diagnosisHistory.findFirst({
      where: eq(diagnosisHistory.id, id)
    });
    return history ? new DiagnosisHistory(history) : null;
  }

  async update(updates) {
    const [updated] = await db
      .update(diagnosisHistory)
      .set({
        ...updates,
        symptoms: updates.symptoms ? JSON.stringify(updates.symptoms) : this.symptoms,
        recommendations: updates.recommendations ? JSON.stringify(updates.recommendations) : this.recommendations,
        updatedAt: new Date()
      })
      .where(eq(diagnosisHistory.id, this.id))
      .returning();
    Object.assign(this, new DiagnosisHistory(updated));
    return this;
  }

  async delete() {
    await db
      .delete(diagnosisHistory)
      .where(eq(diagnosisHistory.id, this.id));
    return true;
  }

  toJSON() {
    return {
      ...this,
      symptoms: typeof this.symptoms === 'string' ? JSON.parse(this.symptoms) : this.symptoms,
      recommendations: this.recommendations && typeof this.recommendations === 'string' 
        ? JSON.parse(this.recommendations) 
        : this.recommendations
    };
  }
}

module.exports = DiagnosisHistory; 