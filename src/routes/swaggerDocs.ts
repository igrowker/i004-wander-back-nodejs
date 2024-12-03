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
 *                 idUser:
 *                   type: string
 *                   example: "64afc392d9e3b0a9e8c92f11"
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
 * /api/recovery/forgot-password:
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
 *               idUser:
 *                 type: string
 *                 description: ID of the user whose profile is being updated
 *                 example: "64afc392d9e3b0a9e8c92f11"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "pedrito@gmail.com"
 *               name:
 *                 type: string
 *                 example: "Pedro"
 *               location:
 *                 type: array
 *                 items: string
 *                 example: ["Spain", "Valencia"]
 *               preferences:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Optional user preferences (e.g., ["adventure", "beach"]).
 *               role:
 *                 type: string
 *                 example: "tourist"
 *               phone:
 *                 type: string
 *                 example: "+12345678900"
 *               password:
 *                 type: string
 *                 example: "NewPassword!"
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
 *                       type: array
 *                       example: ["New York", "USA"]
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
 *                 type: array
 *                 example: ["New York", "USA"]
 *                 description: User's location.
 *               phone:
 *                 type: string
 *                 example: "+12345678900"
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
 *                     example: ["California"]
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
 *                   type: array
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
 *               - capacity
 *               - hostId
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
 *                 type: array
 *                 example: ["Oviedo", "Spain"]
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
 *               capacity:
 *                 type: number
 *                 description: Maximum number of participants for the experience.
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
 *                   type: array
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
 *                 capacity:
 *                   type: number
 *                   description: Maximum number of participants for the experience.
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
 *               - experienceId
 *               - title
 *               - description
 *               - location
 *               - providerId
 *               - price
 *               - availabilityDates
 *               - tags
 *               - capacity
 *             properties:
 *               experienceId:
 *                 type: string
 *                 example: "kjlsad89ahf9a8rwofa2"
 *                 description: The Id of the experience.
 *               title:
 *                 type: string
 *                 example: "Horse Riding"
 *                 description: Name of the experience.
 *               description:
 *                 type: string
 *                 example: "One hour of horse riding with an instructor."
 *                 description: Detailed description of the experience.
 *               location:
 *                 type: array
 *                 example: ["Oviedo", "Spain"]
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
 *               - userId
 *             properties:
 *               experienceId:
 *                 type: string
 *                 example: "experience123"
 *                 description: ID of the experience being reviewed.
 *               userId:
 *                 type: string
 *                 example: "64afc392d9e3b0a9e8c92f11"
 *                 description: ID of the user creating the experience.
 *               rating:
 *                 type: number
 *                 format: float
 *                 description: Rating given to the experience (0-5).
 *               comment:
 *                 type: string
 *                 example: "It was an amazing experience!"
 *                 description: User's comment about the experience.
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
 *     tags:
 *       - Bookings
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUser:
 *                 type: string
 *                 description: ID of the user requesting the deletion.
 *                 example: "64afc392d9e3b0a9e8c92f11"
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

// UPDATE REWIEV ENDPOINT
/**
 * @swagger
 * /api/reviews/update:
 *   put:
 *     summary: Actualiza una reseña existente
 *     description: Permite a un usuario actualizar una reseña de una experiencia, siempre y cuando sea el creador de la reseña.
 *     tags:
 *       - Reviews
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reviewId:
 *                 type: string
 *                 description: ID único de la reseña a actualizar
 *                 example: "63f1f0a12345abcde6789012"
 *               userId:
 *                 type: string
 *                 description: ID del usuario que intenta realizar la actualización
 *                 example: "63f1f0b12345abcde6789013"
 *               rating:
 *                 type: integer
 *                 description: Nueva calificación de la reseña (opcional)
 *                 example: 4
 *               comment:
 *                 type: string
 *                 description: Nuevo comentario de la reseña (opcional)
 *                 example: "Excelente experiencia, muy recomendada."
 *     responses:
 *       200:
 *         description: Reseña actualizada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: Detalles de la reseña actualizada
 *       400:
 *         description: Error de validación o datos faltantes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "reviewId and userId are required"
 *       403:
 *         description: El usuario no tiene permiso para actualizar la reseña
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You do not have permission to update this review"
 *       404:
 *         description: Reseña no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Review not found."
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error updating review."
 */

// GET ALL REVIEWS by EXPERIENCE ID ENDPOINT
/**
 * @swagger
 * /api/reviews/experience/{experienceId}:
 *   get:
 *     summary: Obtiene las reseñas de una experiencia
 *     description: Permite obtener las reseñas de una experiencia específica.
 *     tags:
 *       - Reviews
 *     parameters:
 *       - name: experienceId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "63f1f0a12345abcde6789012"
 *     responses:
 *       200:
 *         description: Reseñas obtenidas con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "63f1f0a12345abcde6789012"
 *                   userId:
 *                     type: string
 *                     example: "63f1f0b12345abcde6789013"
 *                   rating:
 *                     type: integer
 *                     example: 4
 *                   comment:
 *                     type: string
 *                     example: "Excelente experiencia, muy recomendada."
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-08-01T10:00:00Z"
 *                 required:
 *                   - id
 *                   - userId
 *                   - rating
 *                   - comment
 *                   - createdAt
 *       404:
 *         description: Experiencia no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Experience not found."
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error getting reviews."
 */

//VERIFY-USER ENDPOINT
/**
 * @swagger
 * /api/auth/verify-user:
 *   post:
 *     summary: Verify a user with a verification code
 *     description: Validates user input and sends the data to the backend to verify the user's account.
 *     tags:
 *       - UserAuth
 *     requestBody:
 *       description: The user verification data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@sample.com
 *                 description: The email address of the user.
 *               code:
 *                 type: string
 *                 example: "123456"
 *                 description: The verification code sent to the user.
 *             required:
 *               - email
 *               - code
 *     responses:
 *       200:
 *         description: User verification successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Verification successful
 *                   description: Success message.
 *                 data:
 *                   type: object
 *                   description: Response data from the backend.
 *       400:
 *         description: Invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error communicating with the verification service
 *                 details:
 *                   type: object
 *                   description: Details about the validation error.
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

//RE-SEND CODE ENDPOINT
/**
 * @swagger
 * /api/auth/resend-code:
 *   post:
 *     summary: Resend the user verification code
 *     description: Sends a request to the backend to resend the user's verification code.
 *     tags:
 *       - UserAuth
 *     responses:
 *       200:
 *         description: Verification code re-sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Code re-sent
 *                   description: Success message.
 *       400:
 *         description: Bad request or validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error communicating with the service
 *                   description: Error message.
 *                 details:
 *                   type: object
 *                   description: Additional details about the error from the backend.
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

//GET EXPERIENCES BY HOST ENDPOINT
/**
 * @swagger
 * /api/experiences/host/{hostId}:
 *   get:
 *     tags:
 *       - Experiences
 *     summary: Retrieve all experiences for a specific host.
 *     description: Fetches a list of experiences associated with a given host, filtered by query parameters if provided.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the host.
 *         schema:
 *           type: string
 *       - in: query
 *         name: title
 *         description: Filter experiences by title.
 *         schema:
 *           type: string
 *       - in: query
 *         name: location
 *         description: Filter experiences by location.
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *       - in: query
 *         name: price
 *         description: Filter experiences by price range.
 *         schema:
 *           type: number
 *       - in: query
 *         name: availabilityDates
 *         description: Filter experiences by available dates.
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *             format: date
 *       - in: query
 *         name: tags
 *         description: Filter experiences by tags.
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *       - in: query
 *         name: capacity
 *         description: Filter experiences by capacity.
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: A list of experiences for the specified host.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier of the experience.
 *                   title:
 *                     type: string
 *                     description: The title of the experience.
 *                   description:
 *                     type: string
 *                     description: Detailed description of the experience.
 *                   location:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Array of strings describing the location of the experience.
 *                   price:
 *                     type: number
 *                     description: Price of the experience.
 *                   availabilityDates:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: date
 *                     description: Array of available dates for the experience.
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Tags associated with the experience.
 *                   capacity:
 *                     type: number
 *                     description: The capacity of participants for the experience.
 *                   hostId:
 *                     type: string
 *                     description: The ID of the host associated with the experience.
 *       400:
 *         description: Bad request. ID parameter is missing or query parameters are invalid.
 *       404:
 *         description: No experiences found for the provided host ID.
 *       500:
 *         description: An internal server error occurred.
 */

//GET TOP RATED EXPERIENCES ENDPOINT
/**
 * @swagger
 * /api/experiences/top-rated:
 *   get:
 *     tags:
 *       - Experiences
 *     summary: Retrieve a list of top-rated experiences.
 *     description: Fetches a list of top-rated experiences, filtered by query parameters if provided.
 *     parameters:
 *       - in: query
 *         name: title
 *         description: Filter top-rated experiences by title.
 *         schema:
 *           type: string
 *       - in: query
 *         name: location
 *         description: Filter top-rated experiences by location.
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *       - in: query
 *         name: price
 *         description: Filter top-rated experiences by price range.
 *         schema:
 *           type: number
 *       - in: query
 *         name: availabilityDates
 *         description: Filter top-rated experiences by available dates.
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *             format: date
 *       - in: query
 *         name: tags
 *         description: Filter top-rated experiences by tags.
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *       - in: query
 *         name: capacity
 *         description: Filter top-rated experiences by capacity.
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: A list of top-rated experiences.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier of the experience.
 *                   title:
 *                     type: string
 *                     description: The title of the experience.
 *                   description:
 *                     type: string
 *                     description: Detailed description of the experience.
 *                   location:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Array of strings describing the location of the experience.
 *                   price:
 *                     type: number
 *                     description: Price of the experience.
 *                   availabilityDates:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: date
 *                     description: Array of available dates for the experience.
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Tags associated with the experience.
 *                   capacity:
 *                     type: number
 *                     description: The capacity of participants for the experience.
 *                   hostId:
 *                     type: string
 *                     description: The ID of the host associated with the experience.
 *       400:
 *         description: Bad request. Query parameters are invalid.
 *       404:
 *         description: No top-rated experiences found.
 *       500:
 *         description: An internal server error occurred.
 */

//MOST BOOKED EXPERIENCES ENDPOINT
/**
 * @swagger
 * /api/experiences/most-booked:
 *   get:
 *     tags:
 *       - Experiences
 *     summary: Retrieve a list of most-booked experiences.
 *     description: Fetches a list of the most-booked experiences, filtered by query parameters if provided.
 *     parameters:
 *       - in: query
 *         name: title
 *         description: Filter most-booked experiences by title.
 *         schema:
 *           type: string
 *       - in: query
 *         name: location
 *         description: Filter most-booked experiences by location.
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *       - in: query
 *         name: price
 *         description: Filter most-booked experiences by price range.
 *         schema:
 *           type: number
 *       - in: query
 *         name: availabilityDates
 *         description: Filter most-booked experiences by available dates.
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *             format: date
 *       - in: query
 *         name: tags
 *         description: Filter most-booked experiences by tags.
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *       - in: query
 *         name: capacity
 *         description: Filter most-booked experiences by capacity.
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: A list of the most-booked experiences.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier of the experience.
 *                   title:
 *                     type: string
 *                     description: The title of the experience.
 *                   description:
 *                     type: string
 *                     description: Detailed description of the experience.
 *                   location:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Array of strings describing the location of the experience.
 *                   price:
 *                     type: number
 *                     description: Price of the experience.
 *                   availabilityDates:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: date
 *                     description: Array of available dates for the experience.
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Tags associated with the experience.
 *                   capacity:
 *                     type: number
 *                     description: The capacity of participants for the experience.
 *                   hostId:
 *                     type: string
 *                     description: The ID of the host associated with the experience.
 *       400:
 *         description: Bad request. Query parameters are invalid.
 *       404:
 *         description: No most-booked experiences found.
 *       500:
 *         description: An internal server error occurred.
 */

//LATEST EXPERIENCES ENDPOINT
/**
 * @swagger
 * /api/experiences/latest:
 *   get:
 *     tags:
 *       - Experiences
 *     summary: Retrieve a list of the latest experiences.
 *     description: Fetches a list of the most recent experiences, filtered by query parameters if provided.
 *     parameters:
 *       - in: query
 *         name: title
 *         description: Filter latest experiences by title.
 *         schema:
 *           type: string
 *       - in: query
 *         name: location
 *         description: Filter latest experiences by location.
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *       - in: query
 *         name: price
 *         description: Filter latest experiences by price range.
 *         schema:
 *           type: number
 *       - in: query
 *         name: availabilityDates
 *         description: Filter latest experiences by available dates.
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *             format: date
 *       - in: query
 *         name: tags
 *         description: Filter latest experiences by tags.
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *       - in: query
 *         name: capacity
 *         description: Filter latest experiences by capacity.
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: A list of the latest experiences.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier of the experience.
 *                   title:
 *                     type: string
 *                     description: The title of the experience.
 *                   description:
 *                     type: string
 *                     description: Detailed description of the experience.
 *                   location:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Array of strings describing the location of the experience.
 *                   price:
 *                     type: number
 *                     description: Price of the experience.
 *                   availabilityDates:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: date
 *                     description: Array of available dates for the experience.
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Tags associated with the experience.
 *                   capacity:
 *                     type: number
 *                     description: The capacity of participants for the experience.
 *                   hostId:
 *                     type: string
 *                     description: The ID of the host associated with the experience.
 *       400:
 *         description: Bad request. Query parameters are invalid.
 *       404:
 *         description: No latest experiences found.
 *       500:
 *         description: An internal server error occurred.
 */

//GET EXPERIENCES BY TAG ENDPOINT
/**
 * @swagger
 * /api/experiences/tags/{tag}:
 *   get:
 *     tags:
 *       - Experiences
 *     summary: Retrieve a list of experiences by tag.
 *     description: Fetches experiences filtered by a specific tag.
 *     parameters:
 *       - in: path
 *         name: tag
 *         required: true
 *         description: The tag to filter experiences by.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of experiences filtered by the provided tag.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier of the experience.
 *                   title:
 *                     type: string
 *                     description: The title of the experience.
 *                   description:
 *                     type: string
 *                     description: Detailed description of the experience.
 *                   location:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Array of strings describing the location of the experience.
 *                   price:
 *                     type: number
 *                     description: Price of the experience.
 *                   availabilityDates:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: date
 *                     description: Array of available dates for the experience.
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Tags associated with the experience.
 *                   capacity:
 *                     type: number
 *                     description: The capacity of participants for the experience.
 *                   hostId:
 *                     type: string
 *                     description: The ID of the host associated with the experience.
 *       400:
 *         description: Bad request. The tag parameter is missing or invalid.
 *       404:
 *         description: No experiences found with the provided tag.
 *       500:
 *         description: Internal server error occurred.
 */

//GET TAGS ENDPOINT
/**
 * @swagger
 * /api/experiences/tags:
 *   get:
 *     tags:
 *       - Experiences
 *     summary: Retrieve all available tags for experiences.
 *     description: Fetches a list of all tags that can be associated with experiences.
 *     responses:
 *       200:
 *         description: A list of all tags available for experiences.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 description: A tag associated with experiences.
 *       404:
 *         description: No tags found.
 *       500:
 *         description: Internal server error occurred.
 */

//RESET PASSWORD ENDPOINT
/**
 * @swagger
 * /api/recovery/reset-password:
 *   post:
 *     tags:
 *       - Password Recovery
 *     summary: Reset the user's password.
 *     description: Allows a user to set a new password by providing their email, verification code, and new password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: The new password for the user.
 *                 example: "NewPassword123@"
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 example: "user@sample.com"
 *               code:
 *                 type: string
 *                 description: The verification code sent to the user.
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: New password successfully set.
 *       400:
 *         description: Bad request due to validation errors. Includes error details in the response.
 *       500:
 *         description: Internal server error occurred.
 */

// UPDATE BOOKING ENDPOINT BY ID
/**
 * @swagger
 * /api/bookings/{id}:
 *   put:
 *     summary: Update a booking
 *     description: Update a booking with the specified ID.
 *     tags:
 *       - Bookings
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the booking to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBookingRequest'
 *     responses:
 *       '200':
 *         description: The booking was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       '400':
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       '401':
 *         description: Bearer token is required
 *       '500':
 *         description: Error processing the request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 * components:
 *   schemas:
 *     UpdateBookingRequest:
 *       type: object
 *       properties:
 *         experienceId:
 *           type: string
 *         userId:
 *           type: string
 *         status:
 *           type: string
 *           enum:
 *             - pending
 *             - confirmed
 *             - canceled
 *         totalPrice:
 *           type: number
 *         participants:
 *           type: number
 *         paymentStatus:
 *           type: string
 *           enum:
 *             - paid
 *             - pending
 *     Booking:
 *       $ref: '#/components/schemas/Booking'
 *     ValidationError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: The error message
 *           example: Invalid request data
 *         details:
 *           type: array
 *           items:
 *             type: string
 *             description: The validation error details
 *             example:
 *               - Field is required
 *               - Must be a valid email
 */

// GET BOOKINGS BY USER ENDPOINT
/**
 * @swagger
 * /bookings/user/{userId}:
 *   get:
 *     summary: Obtiene las bookings de un usuario por su ID
 *     description: Realiza una petición a la API de Java para obtener las bookings del usuario con el ID proporcionado
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID del usuario
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Bearer token de autenticación
 *     responses:
 *       200:
 *         description: Bookings del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Bearer token no proporcionado o inválido
 *       500:
 *         description: Error interno del servidor
 */