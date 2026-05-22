-- cast_vote: atomically record a vote on a question.
--
-- Returns a JSON object with:
--   outcome  "voted"        — vote recorded; question contains the updated row
--            "already_voted"— username is already in voter_ids; question is null
--            "not_found"    — no question with this id exists; question is null
--   question the updated row as JSON (only populated when outcome = 'voted')
--
-- Apply via Supabase SQL Editor on both test and prod projects.
CREATE OR REPLACE FUNCTION cast_vote(question_id uuid, username text)
RETURNS json
LANGUAGE plpgsql
AS $$
DECLARE
  updated_row questions%ROWTYPE;
BEGIN
  UPDATE questions
  SET
    votes     = votes + 1,
    voter_ids = array_append(voter_ids, username)
  WHERE id = question_id
    AND NOT voter_ids @> ARRAY[username]
  RETURNING * INTO updated_row;

  IF FOUND THEN
    RETURN json_build_object(
      'outcome',  'voted',
      'question', row_to_json(updated_row)
    );
  END IF;

  -- UPDATE matched no rows: distinguish duplicate vote from missing question
  IF EXISTS (SELECT 1 FROM questions WHERE id = question_id) THEN
    RETURN json_build_object('outcome', 'already_voted', 'question', NULL);
  END IF;

  RETURN json_build_object('outcome', 'not_found', 'question', NULL);
END;
$$;
