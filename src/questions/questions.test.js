import { describe, it, expect, afterEach } from "vitest";
import request from "supertest";
import app from "../app.js";
import { supabase } from "../db.js";

const createdIds = [];

afterEach(async () => {
  if (createdIds.length > 0) {
    await supabase.from("questions").delete().in("id", createdIds);
    createdIds.length = 0;
  }
});

describe("GET /questions", () => {
  it("returns an array of questions", async () => {
    const res = await request(app)
      .get("/questions")
      .set("x-username", "testuser");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("each question has id, text, votes, voterIds, and createdAt", async () => {
    const created = await request(app)
      .post("/questions")
      .set("x-username", "testuser")
      .send({ text: "Shape check question?" });
    createdIds.push(created.body.id);

    const res = await request(app)
      .get("/questions")
      .set("x-username", "testuser");

    const q = res.body.find((q) => q.id === created.body.id);
    expect(q).toHaveProperty("id");
    expect(q).toHaveProperty("text");
    expect(q).toHaveProperty("votes");
    expect(q).toHaveProperty("voterIds");
    expect(q).toHaveProperty("createdAt");
  });
});

describe("POST /questions", () => {
  it("creates a question and returns 201 with the new question", async () => {
    const res = await request(app)
      .post("/questions")
      .set("x-username", "testuser")
      .send({ text: "What is TDD?" });
    createdIds.push(res.body.id);

    expect(res.status).toBe(201);
    expect(res.body.text).toBe("What is TDD?");
    expect(res.body).toHaveProperty("id");
    expect(res.body.votes).toBe(0);
    expect(res.body.voterIds).toEqual([]);
    expect(res.body).toHaveProperty("createdAt");
  });

  it("returns 400 when text is missing", async () => {
    const res = await request(app)
      .post("/questions")
      .set("x-username", "testuser")
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("text is required");
  });
});
