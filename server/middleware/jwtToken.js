import jwt from 'jsonwebtoken';
const secret=process.env.JWT_SECRET ;

function authenticateJWT(req, res, next) {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ error: 'Not authenticated' });

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