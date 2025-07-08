import jwt from 'jsonwebtoken';
const secret=process.env.JWT_SECRET || "your" ;
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
     if (!token) return res.status(401).json({ error: 'Not authenticated' });
    console.log("jwt",token);
  try {
    const payload = jwt.verify(token, secret);
    req.id = payload.id;
    req.role = payload.role;
    next();
  } catch (err) {
    console.error('JWT error', err);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
}
export default authenticateJWT;