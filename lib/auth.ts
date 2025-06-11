import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Use a secure env var in production

export function verifyToken(token: string | undefined): {id:string , username:string} | null {
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string  , username:string};
    const user = {id:decoded.id , username:decoded.username}
    return  user
    // return decoded.id;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
}