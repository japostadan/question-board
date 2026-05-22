import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("Username Middleware", () => {
  it("returns 400 when x-username header is missing", async () => {
    const res = await request(app).get("/questions");
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "x-username header is required" });
  });

  it("passes request through when x-username header is present", async () => {
    const res = await request(app)
      .get("/questions")
      .set("x-username", "testuser");
    expect(res.status).not.toBe(400);
  });

  it("passes through usernames with allowed special characters", async () => {
    const res = await request(app)
      .get("/questions")
      .set("x-username", "valid-user_1.name");
    expect(res.status).not.toBe(400);
  });

  it('returns 400 when username contains a double quote', async () => {
    const res = await request(app)
      .get("/questions")
      .set("x-username", 'bad"user');
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/permitted characters/i);
  });

  it("returns 400 when username contains curly braces", async () => {
    const res = await request(app)
      .get("/questions")
      .set("x-username", "bad{user}");
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/permitted characters/i);
  });

  it("returns 400 when username contains a backslash", async () => {
    const res = await request(app)
      .get("/questions")
      .set("x-username", "bad\\user");
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/permitted characters/i);
  });
});
