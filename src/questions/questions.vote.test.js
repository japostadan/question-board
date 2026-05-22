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

describe("POST /questions/:id/vote", () => {
  it("returns 404 for an unknown question id", async () => {
    const res = await request(app)
      .post("/questions/00000000-0000-0000-0000-000000000000/vote")
      .set("x-username", "testuser");

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Question not found");
  });

  it("returns 409 when the same user votes twice", async () => {
    const created = await request(app)
      .post("/questions")
      .set("x-username", "testuser")
      .send({ text: "Duplicate vote question?" });
    createdIds.push(created.body.id);

    await request(app)
      .post(`/questions/${created.body.id}/vote`)
      .set("x-username", "testuser");

    const res = await request(app)
      .post(`/questions/${created.body.id}/vote`)
      .set("x-username", "testuser");

    expect(res.status).toBe(409);
    expect(res.body.error).toBe("Already voted");
  });

  it("increments votes and appends username to voterIds", async () => {
    const created = await request(app)
      .post("/questions")
      .set("x-username", "testuser")
      .send({ text: "Vote test question?" });
    createdIds.push(created.body.id);

    const res = await request(app)
      .post(`/questions/${created.body.id}/vote`)
      .set("x-username", "testuser");

    expect(res.status).toBe(200);
    expect(res.body.votes).toBe(1);
    expect(res.body.voterIds).toContain("testuser");
  });
});
