// LOGIN ENDPOINT
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

//PASSWORD RECOVERY ENDPOINT
/**
 * @swagger
 * /recoverPassword:
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

// LOGOUT USER
/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logs out user invalidating token
 *     tags: [UserAuth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User logged out successfully
 *       401:
 *         description: Unauthorized || No valid token provided
 *       500:
 *         description: Internal server error || There was a problem logging out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: There was a problem logging out
 */

// GET USER PROFILE ENDPOINT
/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Retrieve the user's profile
 *     tags: [UserProfile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile retrieved successfully"
 *                 profile:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Carlos"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "cgarcia@sample.com"
 *                     location:
 *                       type: string
 *                       example: "Spain"
 *       401:
 *         description: Unauthorized || No token provided
 *       404:
 *         description: Not Found || Profile not found
 *       500:
 *         description: Internal Server Error
 */

// UPDATE USER PROFILE ENDPOINT
/**
 * @swagger
 * /users/profile:
 *   put:
 *     summary: Update the user's profile
 *     tags: [UserProfile]
 *     security:
 *       - bearerAuth: []
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
 *                 example: "pedrito@gmail.com"
 *               name:
 *                 type: string
 *                 example: "Pedro"
 *               location:
 *                 type: string
 *                 example: "Spain"
 *               preferences:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["things"]
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile updated successfully"
 *                 updatedProfile:
 *                   type: object
 *                   example: {updated user profile data}
 *       400:
 *         description: Bad Request || Invalid data provided
 *       401:
 *         description: Unauthorized || No token provided
 *       404:
 *         description: Not Found || User not found
 *       500:
 *         description: Internal Server Error
 */