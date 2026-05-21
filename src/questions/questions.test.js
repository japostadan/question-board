import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("GET /questions", () => {
  it("returns an array of questions", async () => {
    const res = await request(app).get("/questions").set("x-username", "testuser");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("each question has id, text, and votes", async () => {
    const res = await request(app).get("/questions").set("x-username", "testuser");

    for (const q of res.body) {
      expect(q).toHaveProperty("id");
      expect(q).toHaveProperty("text");
      expect(q).toHaveProperty("votes");
    }
  });
});

describe("POST /questions", () => {
  it("creates a question and returns 201 with the new question", async () => {
    const res = await request(app)
      .post("/questions")
      .set("x-username", "testuser")
      .send({ text: "What is TDD?" });

    expect(res.status).toBe(201);
    expect(res.body.text).toBe("What is TDD?");
    expect(res.body).toHaveProperty("id");
    expect(res.body.votes).toBe(0);
  });

  it("returns 400 when text is missing", async () => {
    const res = await request(app).post("/questions").set("x-username", "testuser").send({});

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("text is required");
  });
});
