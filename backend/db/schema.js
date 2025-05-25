const {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  json,
  integer,
} = require("drizzle-orm/pg-core");

const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  nama: text("nama").notNull(),
  usia: integer("usia").notNull(),
  alamat: text("alamat").notNull(),
  jenisKelamin: text("jenis_kelamin").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

const diagnosisHistory = pgTable("diagnosis_history", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  symptoms: json("symptoms").notNull(),
  diagnosis: text("diagnosis").notNull(),
  confidence: text("confidence").notNull(),
  recommendations: json("recommendations"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

module.exports = {
  users,
  diagnosisHistory,
};
