import { supabase } from "../db.js";

function normalize(row) {
  return {
    id: row.id,
    text: row.text,
    votes: row.votes,
    voterIds: row.voter_ids,
    createdAt: row.created_at,
  };
}

export async function findAll() {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .order("votes", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data.map(normalize);
}

export async function save({ text }) {
  const { data, error } = await supabase
    .from("questions")
    .insert({ text })
    .select()
    .single();

  if (error) throw error;
  return normalize(data);
}

export async function castVote(id, username) {
  const { data, error } = await supabase.rpc("cast_vote", {
    question_id: id,
    username,
  });

  if (error) throw error;

  if (data.outcome === "voted") return normalize(data.question);
  return data.outcome;
}
