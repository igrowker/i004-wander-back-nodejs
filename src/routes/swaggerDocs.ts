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
 *         description: Email Not Found
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
 *     description: |
 *       This endpoint requires a Bearer token for authentication.
 *       Include the token in the Authorization header as follows:
 *       Authorization: Bearer <your_token_here>
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
 *     description: |
 *       This endpoint requires a Bearer token for authentication.
 *       Include the token in the Authorization header as follows:
 *       Authorization: Bearer <your_token_here>
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
 *     description: |
 *       This endpoint requires a Bearer token for authentication.
 *       Include the token in the Authorization header as follows:
 *       Authorization: Bearer <your_token_here>
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
 *                 description: Optional user preferences (e.g., ["adventure", "beach"]).
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
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: "newemail@mail.com"
 *                     name:
 *                       type: string
 *                       example: "New Name"
 *                     location:
 *                       type: string
 *                       example: "New York, USA"
 *                     preferences:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["adventure", "beach"]
 *                   example:
 *                     email: "newemail@mail.com"
 *                     name: "New Name"
 *                     location: "New York, USA"
 *                     preferences: ["adventure", "beach"]
 *       400:
 *         description: Bad Request || Invalid data provided
 *       401:
 *         description: Unauthorized || No token provided
 *       404:
 *         description: Not Found || User not found
 *       500:
 *         description: Internal Server Error
 */

// USER REGISTRATION ENDPOINT
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     description: Valida los datos del usuario, los envía al backend principal y devuelve la respuesta al frontend.
 *     tags: [Register]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *                 description: Nombre completo del usuario.
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@sample.com
 *                 description: Correo electrónico del usuario.
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Passw0rd@
 *                 description: Contraseña del usuario (8-12 caracteres, al menos una mayúscula, una minúscula, un número y un símbolo `@#!`).
 *               role:
 *                 type: string
 *                 enum:
 *                   - tourist
 *                   - provider
 *                 example: tourist
 *                 description: Rol del usuario.
 *               preferences:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["adventure", "beach"]
 *                 description: Preferencias personales del usuario.
 *               location:
 *                 type: string
 *                 example: New York, USA
 *                 description: Ubicación del usuario.
 *     responses:
 *       200:
 *         description: Registro exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully.
 *                 userId:
 *                   type: string
 *                   example: 64afc392d9e3b0a9e8c92f11
 *       400:
 *         description: Errores de validación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - "El nombre es obligatorio"
 *                     - "Correo electrónico inválido"
 *                     - "La contraseña debe tener entre 8 y 12 caracteres"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error.
 *                 details:
 *                   type: string
 *                   example: Error inesperado.
 */

// GET EXPERIENCES EXTERNAL ENDPOINT
/**
 * @swagger
 * /api/experiences/get-all:
 *   get:
 *     summary: Retrieve experiences with optional filtering
 *     tags: [Experiences]
 *     parameters:
 *       - in: query
 *         name: Any filter parameter
 *         schema:
 *           type: object
 *         description: Dynamic query parameters for filtering experiences
 *     responses:
 *       200:
 *         description: Successfully retrieved experiences
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "experience123"
 *                   title:
 *                     type: string
 *                     example: "Skydiving Adventure"
 *                   location:
 *                     type: string
 *                     example: "California"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al obtener experiencias
 */