import express, { Router } from 'express';
import axios from 'axios';

const router: Router = express.Router();

const SECRET_KEY = 'your_secret_key';

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate user and retrieve JWT token
 *     tags: [UserAuth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "sample@mail.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "pass1234"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Success"
 *                 token:
 *                   type: string
 *                   example: "userInfo-token"
 *       400:
 *         description: Bad Request || Invalid request parameters
 *       401:
 *         description: Unauthorized || Invalid credentials
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */

const JAVA_BACKEND_URL = process.env.JAVA_BACKEND_URL;

router.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(404).json({message: "Email and password are required."})
    }

    //Maybe add email format validation (regex)

    try {
        //Send request to the backend to retrieve the jwt
        const response = await axios.post(`${JAVA_BACKEND_URL}/users/login`, {
            email,
            password
        });
        //If successful, store the response
        const { token } = response.data

        //Send the token and and user details
        res.json({
            message: "Log in successful",
            token
        })
    } catch (error: any) {
        console.log("Error logging in.", error);

        if (error.response) {
            switch (error.response.status) {
                case 404:
                    return res.status(404).json({ message: "User not found" });
                case 401:
                    return res.status(401).json({ message: "Invalid credentials" });
                default:
                    return res.status(500).json({ message: "Internal server error." });
            }
        }
    }
});

export default router;