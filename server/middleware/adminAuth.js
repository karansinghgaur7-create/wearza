import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {

        const { token } = req.headers;

        // Check token exists
        if (!token) {
            return res.json({
                success: false,
                message: "Not Authorized login Again"
            });
        }

        // Verify token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        console.log(token_decode);

        // Check admin email
        if (token_decode.email !== process.env.ADMIN_EMAIL) {
            return res.json({
                success: false,
                message: "Not Authorized login Again"
            });
        }

        next();

    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: error.message
        });
    }
};

export default adminAuth;