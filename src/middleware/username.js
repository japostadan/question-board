export function requireUsername(req, res, next) {
  const username = req.headers["x-username"];
  if (!username) {
    return res.status(400).json({ error: "x-username header is required" });
  }
  req.user = username;
  next();
}
