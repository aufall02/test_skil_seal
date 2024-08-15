import {verifyToken} from "../utils/jwt.js";
import {prismaClient} from "../config/database.js";
import {ResponseError} from "../error/responsError.js";

export const authenticateJWT = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({
            errors: "unAuthorization"
        }).end();
    }

    try {
        const user = await verifyToken(token);
        const countUser = await prismaClient.user.count({
            where: {
                email: user.email
            }
        });

        if(countUser === 0) {
            throw new ResponseError(404, 'user not found');
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            errors: "Invalid or expired token"
        });
    }
};