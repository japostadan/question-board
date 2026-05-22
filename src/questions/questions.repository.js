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

export async function findById(id) {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    // PGRST116 = no rows returned — question genuinely not found
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return normalize(data);
}

export async function castVote(id, username, currentVotes, currentVoterIds) {
  const { data, error } = await supabase
    .from("questions")
    .update({
      votes: currentVotes + 1,
      voter_ids: [...currentVoterIds, username],
    })
    .eq("id", id)
    .not("voter_ids", "cs", `{"${username}"}`)
    .select()
    .single();

  if (error) throw error;
  return normalize(data);
}
