import express, { Router } from 'express';
const router: Router = express.Router();

/**
 *  @swagger
 *  /api/hello:
 *   get:
 *     summary: Returns a hello message
 *     tags: [{Example}]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad Request - No message for you.
 */

router.get("/", (req, res) => {
    res.json({ message: 'Success'});
});

export default router