import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable(
  "leads",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    email: text("email").notNull(),
    goal: text("goal").notNull().default("recomp"),
    source: text("source").notNull().default("body-composition-quiz"),
    createdAt: integer("created_at").notNull().$defaultFn(() => Date.now()),
  },
  (table) => [uniqueIndex("leads_email_unique").on(table.email)],
);
