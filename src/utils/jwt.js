import 'dotenv/config'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY || 'test'

export function createToken(payload, options = {}) {
    return jwt.sign(payload, SECRET_KEY, {
        expiresIn: '1h',
        ...options
    });
}


export function verifyToken(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
}
