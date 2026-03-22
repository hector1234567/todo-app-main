import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'prueba_jwt_secret';

export function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}
