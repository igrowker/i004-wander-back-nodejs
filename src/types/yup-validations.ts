import * as yup from "yup";

export const userRegistrationSchema = yup.object().shape({
    name: yup.string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters long')
        .max(50, 'Name cannot exceed 50 characters'),
    
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
    
    preferences: yup.array()
        .of(yup.string().max(30, 'Each preference cannot exceed 30 characters'))
        .optional(),
    
    location: yup.string()
        .optional()
        .max(100, 'Location cannot exceed 100 characters'),
});

export const updateProfileSchema = yup.object().shape({
     // Allow all fields to be optional
    name: yup.string()
    .nullable()
        .min(2, 'Name must be at least 2 characters long')
        .max(50, 'Name cannot exceed 50 characters'),
    
    email: yup.string()
        .email('Invalid email address')
        .nullable(),
    
    password: yup.string()
        .nullable()
        .min(8, 'Password must be at least 8 characters long')
        .max(12, 'Password cannot exceed 12 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#!]).{8,12}$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol (@#!)'
        ),
    
    role: yup.string()
        .oneOf(['tourist', 'provider'], 'Invalid role')
        .nullable(),
    
    preferences: yup.array()
        .of(yup.string().max(30, 'Each preference cannot exceed 30 characters'))
        .nullable(),
    
    location: yup.string()
        .nullable()
        .max(100, 'Location cannot exceed 100 characters'),
});

export const uploadExperienceSchema = yup.object().shape({
    title: yup.string()
        .required("The title is required")
        .min(3, "The title must be at least 3 characters long"),
    
    description: yup.string()
        .required("The description is required")
        .min(10, "The description must be at least 10 characters long"),
    
    location: yup.string()
        .required("The location is required")
        .min(3, "The location must be at least 3 characters long"),
    
    price: yup.number()
        .required("The price is required")
        .positive("The price must be a positive number"),
    
    availabilityDates: yup.array()
        .of(yup.date().required("Each date must be valid"))
        .required("Availability dates are required")
        .min(1, "At least one availability date is required"),
    
    tags: yup.array().of(yup.string().max(15, 'Tags cannot surpass 15 characters')).optional(),
    
    rating: yup.array()
        .of(yup.number().min(1).max(5))
        .optional(),
    
    capacity: yup.number()
        .required("The capacity is required")
        .positive("The capacity must be a positive number")
        .integer("The capacity must be an integer")
        .min(1, "The capacity must be at least 1")
});

// Update schema for upload experience
export const updateExperienceSchema = uploadExperienceSchema.concat(
    yup.object().shape({
        title: yup.string().nullable(),
        description: yup.string().nullable(),
        location: yup.string().nullable(),
        price: yup.number().nullable(),
        availabilityDates: yup.array().of(yup.date().required("Each date must be valid")).nullable(),
        capacity: yup.number().nullable(),
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
    
    date: yup.date()
        .required("Date is required")
        .nullable() // Allow date to be nullable if needed?????
});

// Update schema for review
export const updateReviewSchema = uploadReviewSchema.concat(
    yup.object().shape({
        experienceId: yup.string().nullable(),
        rating: yup.number().nullable(),
        comment: yup.string().nullable(),
        date: yup.date().nullable(),
    })
);
