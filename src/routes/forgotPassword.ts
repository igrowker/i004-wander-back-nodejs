import express, { Router } from 'express';
import axios from 'axios'

const router: Router = express.Router();

const SECRET_KEY = 'your_secret_key';

/**
 * @swagger
 * /auth/recovePassword:
 *   post:
 *     summary: Create a token to request a password recovery.
 *     tags: [Password Recovery]
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
 *                 example: "sample@gmail.com"
 *     responses:
 *       200:
 *         description: Recovery request successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Success"
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

router.post("/auth/recoverPassword", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    try {
        const response = await axios.post(`${JAVA_BACKEND_URL}/`, {
            email
        });
        
        res.json({
            message: "Recovery request sent successfully."
        })
    } catch (error: any) {
        console.log("Error in the recovery request.", error);

        if (error.response) {
            switch (error.response.status) {
                case 404:
                    return res.status(404).json({ message: "Email not found" });
                case 401:
                    return res.status(401).json({ message: "Invalid credentials" });
                default:
                    return res.status(500).json({ message: "Internal server error." });
            }
        }
    }
});

export default router;