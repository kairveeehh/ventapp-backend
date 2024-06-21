import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { rants } from "./db/schema";

export type ENV = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: ENV }>();

app
  .get("/rants", async (c: any) => {
    const db = drizzle(c.env.DB); // connect database

    if (!db) {
      return c.json({ error: "Database not connected" });
    }

    const result = await db.select().from(rants).all();

    if (!result) {
      return c.json({ error: "Database error" });
    }

    return c.json(result);
  })
  .post("/rants",
  async (c: any) => {
    const db = drizzle(c.env.DB);

    if (!db) {
      return c.json({ error: "Database not connected" });
    }

    const { name, message } = await c.req.json();
    const result = await db.insert(rants).values({ name, message }).returning();

    if (!result) {
      return c.json({ error: "Database error" });
    }

    return c.json(result);
  });

export default app;
