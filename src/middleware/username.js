const VALID_USERNAME = /^[a-zA-Z0-9\-_. ]+$/;

export function requireUsername(req, res, next) {
  const username = req.headers["x-username"];
  if (!username) {
    return res.status(400).json({ error: "x-username header is required" });
  }
  if (!VALID_USERNAME.test(username)) {
    return res.status(400).json({
      error:
        "Invalid username. Permitted characters: alphanumeric, hyphen, underscore, dot, space.",
    });
  }
  req.user = username;
  next();
}
