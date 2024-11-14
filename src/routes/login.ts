import express, { Router } from 'express';

const router: Router = express.Router();

const SECRET_KEY = 'your_secret_key';

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login with email
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 format: email
 *                 example: "12093sjiad0109dsao"
 *               email:
 *                 type: string
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
 *                 token:
 *                   type: string
 *                   example: "token-string"
 *       400:
 *         description: Bad Request || Invalid request parameters
 *       401:
 *         description: Unauthorized || Invalid credentials
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */


router.post("/", (req, res) => {
    
})

export default router