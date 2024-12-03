import * as yup from "yup";

export const userRegistrationSchema = yup.object().shape({
    name: yup.string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters long')
        .max(50, 'Name cannot exceed 50 characters')
        .matches(/^[A-Za-z\s]+$/, 'Name can only contain letters and spaces'),
    
    email: yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    
    password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .max(12, 'Password cannot exceed 12 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#!]).{8,12}$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol (@#!)'
        ),
    
    role: yup.string()
        .oneOf(['tourist', 'provider'], 'Invalid role')
        .required('Role is required'),
    
    location: yup.string()
        .optional()
        .max(100, 'Location cannot exceed 100 characters'),

    phone: yup.string()
        .required()
        .matches(
            /^\+?[1-9]\d{1,14}$/,
            'Phone number must be a valid E.164 format (e.g., +1234567890)'
        )
    
});

export const updateProfileSchema = yup.object().shape({
     name: yup.string()
     .optional()
     .min(2, 'Name must be at least 2 characters long')
     .max(50, 'Name cannot exceed 50 characters')
     .matches(/^[A-Za-z\s]+$/, 'Name can only contain letters and spaces'),
    
    email: yup.string()
        .email('Invalid email address')
        .optional(),
    
    password: yup.string()
        .optional()
        .min(8, 'Password must be at least 8 characters long')
        .max(12, 'Password cannot exceed 12 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#!]).{8,12}$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol (@#!)'
        ),
    
    role: yup.string()
        .oneOf(['tourist', 'provider'], 'Invalid role')
        .optional(),
    
    preferences: yup.array()
        .of(yup.string().max(30, 'Each preference cannot exceed 30 characters'))
        .optional(),
    
    location: yup.array()
        .of(yup.string()
            .min(2, "Each field must be at least 3 characters long"))
            .max(25, "Each field cannot exceed 25 characters")
        .required("The location is required"),

    phone: yup.string()
        .optional()
        .matches(
            /^\+?[1-9]\d{1,14}$/,
            'Phone number must be a valid E.164 format (e.g., +1234567890)'
        )
});

export const uploadExperienceSchema = yup.object().shape({
    title: yup.string()
        .required("The title is required")
        .min(3, "The title must be at least 3 characters long"),
    
    description: yup.string()
        .required("The description is required")
        .min(10, "The description must be at least 10 characters long"),
    
    location: yup.array()
        .of(yup.string()
            .min(2, "Each field must be at least 3 characters long"))
            .max(25, "Each field cannot exceed 25 characters")
        .required("The location is required"),
    
    price: yup.number()
        .required("The price is required")
        .positive("The price must be a positive number"),
    
    availabilityDates: yup.array()
        .of(yup.date().required("Each date must be valid"))
        .required("Availability dates are required")
        .min(1, "At least one availability date is required"),
    
    tags: yup.array().of(yup.string().max(15, 'Tags cannot surpass 15 characters')).optional(),
    
    capacity: yup.number()
        .required("The capacity is required")
        .positive("The capacity must be a positive number")
        .integer("The capacity must be an integer")
        .min(1, "The capacity must be at least 1"),

    hostId: yup.string().required("El ID del usuario es obligatorio."),
});

// Update schema for upload experience
export const updateExperienceSchema = uploadExperienceSchema.concat(
    yup.object().shape({
        id: yup.string().required(),
        title: yup.string().optional(),
        description: yup.string().optional(),
        location: yup.array().of(yup.string()).optional(),
        hostId: yup.string().required(),
        price: yup.number().optional(),
        availabilityDates: yup.array().of(yup.date().required("Each date must be valid")).optional(),
        capacity: yup.number().optional(),
        tags: yup.array().of(yup.string()).optional(),
    })
);

export const uploadReviewSchema = yup.object().shape({
    experienceId: yup.string()
        .required("Experience ID is required"),
    
    rating: yup.number()
        .required("Rating is required")
        .min(1, "Rating must be at least 1")
        .max(5, "Rating cannot exceed 5"),
    
    comment: yup.string()
        .required("Comment is required")
        .min(10, "Comment must be at least 10 characters long")
        .max(500, "Comment cannot exceed 500 characters"),

    userId: yup.string().required("El ID del usuario es obligatorio."),
        
});

// Update schema for review
export const updateReviewSchema = uploadReviewSchema.concat(
    yup.object().shape({
        reviewId: yup.string().required("Review Id is required."),
        rating: yup.number().optional(),
        comment: yup.string().optional(),
        userId: yup.string().required()
    })
);

// Schema for make a booking
export const bookingSchema = yup.object().shape({
    experienceId: yup.string().required(),
    userId: yup.string().required(),
    bookingDate: yup.date().required(),
    participants: yup.number().required().min(1),
  });

export const userVerification = yup.object().shape({
    email: yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    
    verificationCode: yup.string()
        .matches(/^\d{6}$/, 'Verification code must be exactly 6 digits')
        .required('Verification code is required'),
});

export const passwordChangeSchema = yup.object().shape({
    newPassword: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .max(12, 'Password cannot exceed 12 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#!]).{8,12}$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol (@#!)'
        ),
    email: yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    code: yup.string()
        .matches(/^\d{6}$/, 'Verification code must be exactly 6 digits')
        .required('Verification code is required'),
});