// LOGIN ENDPOINT
/**
 * @swagger
 * /api/auth/login:
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

// PASSWORD RECOVERY ENDPOINT
/**
 * @swagger
 * /api/recoverPassword:
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
 * /api/auth/logout:
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
 *                   example: "User logged out successfully"
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
 *                   example: "There was a problem logging out"
 */

// GET USER PROFILE ENDPOINT
/**
 * @swagger
 * /api/auth/profile:
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
 * /api/auth/profile:
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
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Validates user data, sends it to the main backend, and returns the response to the frontend.
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
 *                 example: "John Doe"
 *                 description: Full name of the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.doe@sample.com"
 *                 description: User's email address.
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "Passw0rd@"
 *                 description: User's password (8-12 characters, at least one uppercase letter, one lowercase letter, one number, and one special character `@#!`).
 *               role:
 *                 type: string
 *                 enum:
 *                   - tourist
 *                   - provider
 *                 example: "tourist"
 *                 description: User's role.
 *               preferences:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["adventure", "beach"]
 *                 description: User's personal preferences.
 *               location:
 *                 type: string
 *                 example: "New York, USA"
 *                 description: User's location.
 *     responses:
 *       200:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully."
 *                 userId:
 *                   type: string
 *                   example: "64afc392d9e3b0a9e8c92f11"
 *       400:
 *         description: Validation errors
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
 *                     - "Name is required"
 *                     - "Invalid email address"
 *                     - "Password must be between 8 and 12 characters"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 *                 details:
 *                   type: string
 *                   example: "Unexpected error."
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
 *         name: filter
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
 *                   example: "Error retrieving experiences"
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
 *                   example: "Experience not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

// UPLOAD EXPERIENCE ENDPOINT
/**
 * @swagger
 * /api/experiences/create:
 *   post:
 *     summary: Register a new experience
 *     tags: [Experiences]
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
 *             required:
 *               - title
 *               - description
 *               - location
 *               - providerId
 *               - price
 *               - availabilityDates
 *               - tags
 *               - rating
 *               - capacity
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Horse Riding"
 *                 description: Name of the experience.
 *               description:
 *                 type: string
 *                 example: "One hour of horse riding with an instructor."
 *                 description: Detailed description of the experience.
 *               location:
 *                 type: string
 *                 example: "Oviedo, Spain"
 *                 description: Location where the experience takes place.
 *               providerId:
 *                 type: string
 *                 example: "aoiwufioaujf1983u4aj891u9"
 *                 description: ID of the user uploading the experience.
 *               price:
 *                 type: string
 *                 example: "65$"
 *                 description: Price of the experience.
 *               availabilityDates:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: date
 *                 example: ["2023-12-01", "2023-12-15"]
 *                 description: Available dates to book the experience.
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Tags associated with the experience.
 *               rating:
 *                 type: number
 *                 format: float
 *                 description: Rating of the experience (0-5).
 *               capacity:
 *                 type: number
 *                 description: Maximum number of participants for the experience.
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 description: Date when the experience was created.
 *     responses:
 *       200:
 *         description: Experience registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Unique identifier of the experience.
 *                 title:
 *                   type: string
 *                   description: Title of the experience.
 *                 description:
 *                   type: string
 *                   description: Detailed description of the experience.
 *                 location:
 *                   type: string
 *                   description: Location where the experience takes place.
 *                 hostId:
 *                   type: string
 *                   description: Unique identifier of the host.
 *                 price:
 *                   type: number
 *                   format: float
 *                   description: Price of the experience.
 *                 availabilityDates:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: date-time
 *                   description: List of available dates for the experience.
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Tags associated with the experience.
 *                 rating:
 *                   type: number
 *                   format: float
 *                   description: Rating of the experience.
 *                 capacity:
 *                   type: number
 *                   description: Maximum number of participants for the experience.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Date when the experience was created.
 *       400:
 *         description: Bad Request || Invalid data provided (e.g., missing required fields).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input data"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - "Title is required"
 *                     - "Price must be a valid number"
 *       401:
 *         description: Unauthorized || User not authorized to create experience (e.g., missing or invalid token).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized access"
 *       500:
 *         description: Internal Server Error || An unexpected error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 details:
 *                   type: string
 *                   example: "Unexpected error occurred while processing the request."
 */

// UPDATE EXPERIENCE ENDPOINT
/**
 * @swagger
 * /api/experiences/{id}:
 *   put:
 *     summary: Update an existing experience
 *     tags: [Experiences]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       This endpoint requires a Bearer token for authentication.
 *       Include the token in the Authorization header as follows:
 *       Authorization: Bearer <your_token_here>
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique ID of the experience to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - location
 *               - providerId
 *               - price
 *               - availabilityDates
 *               - tags
 *               - rating
 *               - capacity
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Horse Riding"
 *                 description: Name of the experience.
 *               description:
 *                 type: string
 *                 example: "One hour of horse riding with an instructor."
 *                 description: Detailed description of the experience.
 *               location:
 *                 type: string
 *                 example: "Oviedo, Spain"
 *                 description: Location where the experience takes place.
 *               providerId:
 *                 type: string
 *                 example: "aoiwufioaujf1983u4aj891u9"
 *                 description: ID of the user uploading the experience.
 *               price:
 *                 type: string
 *                 example: "65$"
 *                 description: Price of the experience.
 *               availabilityDates:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: date
 *                 example: ["2023-12-01", "2023-12-15"]
 *                 description: Available dates to book the experience.
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Tags associated with the experience.
 *               rating:
 *                 type: number
 *                 format: float
 *                 description: Rating of the experience (0-5).
 *               capacity:
 *                 type: number
 *                 description: Maximum number of participants for the experience.
 *     responses:
 *       200:
 *         description: Experience updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Experience updated successfully"
 *                 updatedExperience:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Unique identifier of the experience.
 *                     title:
 *                       type: string
 *                       description: Title of the experience.
 *                     description:
 *                       type: string
 *                       description: Detailed description of the experience.
 *                     location:
 *                       type: string
 *                       description: Location where the experience takes place.
 *                     providerId:
 *                       type: string
 *                       description: ID of the user uploading the experience.
 *                     price:
 *                       type: number
 *                       format: float
 *                       description: Price of the experience.
 *                     availabilityDates:
 *                       type: array
 *                       items:
 *                         type: string
 *                         format: date-time
 *                       description: List of available dates for the experience.
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: Tags associated with the experience.
 *                     rating:
 *                       type: number
 *                       format: float
 *                       description: Rating of the experience.
 *                     capacity:
 *                       type: number
 *                       description: Maximum number of participants for the experience.
 *       400:
 *         description: Bad Request || Invalid data provided (e.g., missing required fields).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input data"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - "Title is required"
 *                     - "Price must be a valid number"
 *       401:
 *         description: Unauthorized || User not authorized to update experience (e.g., missing or invalid token).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized access"
 *       404:
 *         description: Experience not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Experience not found"
 *       500:
 *         description: Internal Server Error || An unexpected error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 details:
 *                   type: string
 *                   example: "Unexpected error occurred while processing the request."
 */

// UPLOAD REVIEW ENDPOINT
/**
 * @swagger
 * /api/reviews/create:
 *   post:
 *     summary: Upload a new review
 *     tags: [Reviews]
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
 *             required:
 *               - experienceId
 *               - rating
 *               - comment
 *               - date
 *             properties:
 *               experienceId:
 *                 type: string
 *                 example: "experience123"
 *                 description: ID of the experience being reviewed.
 *               rating:
 *                 type: number
 *                 format: float
 *                 description: Rating given to the experience (0-5).
 *               comment:
 *                 type: string
 *                 example: "It was an amazing experience!"
 *                 description: User's comment about the experience.
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Date when the review was submitted.
 *     responses:
 *       200:
 *         description: Review uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Review uploaded successfully."
 *                 review:
 *                   type: object
 *                   properties:
 *                     experienceId:
 *                       type: string
 *                       description: ID of the experience reviewed.
 *                     rating:
 *                       type: number
 *                       format: float
 *                       description: Rating given to the experience.
 *                     comment:
 *                       type: string
 *                       description: User's comment about the experience.
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       description: Date when the review was submitted.
 *       400:
 *         description: Bad Request || Invalid data provided (e.g., missing required fields).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All fields are required. Please provide experienceId, rating, comment and date."
 *       401:
 *         description: Unauthorized || No token provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No token provided"
 *       500:
 *         description: Internal Server Error || An unexpected error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred. Please try again later."
 */

// GET BOOKING BY ID
/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     summary: Retrieves a booking by ID
 *     description: Returns the booking data for the specified ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the booking to retrieve
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: The authorization token
 *     responses:
 *       200:
 *         description: Booking data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID de la reserva
 *                 experienceId:
 *                   type: string
 *                   description: ID de la experiencia
 *                 userId:
 *                   type: string
 *                   description: ID del usuario
 *                 status:
 *                   type: string
 *                   description: Estado de la reserva
 *                 bookingDate:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de la reserva
 *                 totalPrice:
 *                   type: number
 *                   format: float
 *                   description: Precio total de la reserva
 *                 participants:
 *                   type: integer
 *                   description: Número de participantes
 *                 paymentStatus:
 *                   type: string
 *                   description: Estado del pago
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de creación de la reserva
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */

// CREATE A BOOKING
/**
 * @swagger
 * /api/bookings/create:
 *   post:
 *     summary: Create a booking
 *     description: Creates a new booking by validating the request body and forwarding it to the main backend service.
 *     tags:
 *       - Bookings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               experienceId:
 *                 type: string
 *                 description: The ID of the experience to be booked.
 *                 example: "650f9f1bfc13ae1c79000001"
 *               userId:
 *                 type: string
 *                 description: The ID of the user making the booking.
 *                 example: "650f9f1bfc13ae1c79000002"
 *               participants:
 *                 type: integer
 *                 description: The number of participants for the booking.
 *                 example: 2
 *               totalPrice:
 *                 type: number
 *                 description: The total price for the booking.
 *                 example: 120.5
 *             required:
 *               - experienceId
 *               - userId
 *               - participants
 *               - totalPrice
 *     responses:
 *       201:
 *         description: Booking successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Booking confirmed"
 *                 reserva:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "650f9f1bfc13ae1c79000003"
 *                     experienceId:
 *                       type: string
 *                       example: "650f9f1bfc13ae1c79000001"
 *                     userId:
 *                       type: string
 *                       example: "650f9f1bfc13ae1c79000002"
 *                     status:
 *                       type: string
 *                       description: The current status of the booking.
 *                       example: "confirmed"
 *                     bookingDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-25T10:30:00.000Z"
 *                     totalPrice:
 *                       type: number
 *                       example: 120.5
 *                     participants:
 *                       type: integer
 *                       example: 2
 *                     paymentStatus:
 *                       type: string
 *                       description: The payment status of the booking.
 *                       example: "paid"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-24T15:00:00.000Z"
 *       400:
 *         description: Validation error or booking rejected.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation error"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["participants must be greater than 0"]
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error processing the request"
 */

// DELETE REVIEW ENDPOINT
/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Delete a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique ID of the review to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Review deleted successfully."
 *                 response:
 *                   type: object
 *                   description: The response data from the backend.
 *       400:
 *         description: Invalid request. Please check the review ID and try again.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid request. Please check the review ID and try again."
 *       404:
 *         description: Review not found. Please ensure the review exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Review not found. Please ensure the review exists."
 *       401:
 *         description: Unauthorized. Please check your credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized. Please check your credentials."
 *       500:
 *         description: An unexpected error occurred while deleting the review. Please try again later.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred while deleting the review. Please try again later."
 */

//VERIFY USER ENDPOINT
/**
 * @swagger
 * /api/auth/verify:
 *   post:
 *     summary: Verify a user
 *     tags: [UserAuth]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       This endpoint verifies a user by sending a request to the backend service.
 *       Include the token in the Authorization header as follows:
 *       Authorization: Bearer <your_token_here>
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - verificationCode
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@sample.com"
 *                 description: The email of the user to verify.
 *               verificationCode:
 *                 type: string
 *                 example: "123456"
 *                 description: The verification code sent to the user.
 *     responses:
 *       200:
 *         description: Verification successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Verification successful"
 *                 data:
 *                   type: object
 *                   description: Data returned from the verification service.
 *       400:
 *         description: Bad Request || Invalid data provided (e.g., missing required fields).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input data"
 *       401:
 *         description: Unauthorized || No valid token provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized access"
 *       500:
 *         description: Internal Server Error || An unexpected error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 details:
 *                   type: string
 *                   example: "Error communicating with the verification service"
 */