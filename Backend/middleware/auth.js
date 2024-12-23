import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const {token} = req.headers;
    if (!token) return res.status(401).json({success:false, message: 'Access Denied' });
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = verified.id;
        next();
    } catch (err) {
        console.log(err);
        res.status(400).json({success:false, message: 'error' });
    }
}

export default authMiddleware;