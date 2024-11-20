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
 *     summary: Cierra la sesión del usuario
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Sesión cerrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sesión cerrada exitosamente
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Hubo un problema al cerrar la sesión
 */


// USER REGISTRATION ENDPOINT
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     description: Valida los datos del usuario, los envía al backend principal y devuelve la respuesta al frontend.
 *     tags:
 *       - Auth
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
 *                 example: john.doe@example.com
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

// GET EXPERIENCES ENDPOINT
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
 *                 description: Experience object
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

// GET EXPERIENCES BY ID ENDPOINT
/**
 * @swagger
 * /api/experiences/{id}:
 *   get:
 *     summary: Get an experience by ID
 *     description: Retrieve details of a specific experience by its unique ID.
 *     tags:
 *       - Experiences
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique ID of the experience to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Experience details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the experience.
 *                 title:
 *                   type: string
 *                   description: The title of the experience.
 *                 description:
 *                   type: string
 *                   description: A detailed description of the experience.
 *                 location:
 *                   type: string
 *                   description: The location where the experience takes place.
 *                 hostId:
 *                   type: string
 *                   description: The unique identifier of the host.
 *                 price:
 *                   type: number
 *                   format: float
 *                   description: The price of the experience.
 *                 availabilityDates:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: date-time
 *                   description: A list of available dates for the experience.
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Tags associated with the experience.
 *                 rating:
 *                   type: number
 *                   format: float
 *                   description: The rating of the experience.
 *                 capacity:
 *                   type: number
 *                   description: The maximum number of participants for the experience.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date when the experience was created.
 *       404:
 *         description: Experience not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Experience not found
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */