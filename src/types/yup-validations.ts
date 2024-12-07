import * as yup from "yup";

export const userRegistrationSchema = yup.object().shape({
    name: yup.string()
        .required('El nombre es obligatorio')
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(50, 'El nombre no puede tener más de 50 caracteres')
        .matches(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo se permiten letras'),

    email: yup.string()
        .email('El formato del correo es incorrecto: ejemplo@demo.com')
        .required('El correo es obligatorio')
        .min(2, 'El correo debe tener al menos 2 caracteres')
        .max(50, 'El correo no puede tener más de 50 caracteres'),

    password: yup.string()
        .required('La contraseña es obligatoria')
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .max(12, 'La contraseña no puede tener más de 12 caracteres')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#!]).{8,12}$/,
            'La contraseña debe contener al menos una minúscula, una mayúscula, un número y uno de estos caracteres (@, #, !)'
        ),

    role: yup.string()
        .oneOf(['tourist', 'provider'], 'El rol es inválido')
        .required('El rol es obligatorio'),

    location: yup.string()
        .oneOf(['España', 'Italia', 'Francia'])
        .required(),

    phone: yup.string()
        .required('El número de teléfono es obligatorio')
        .matches(
            /^\+?[1-9]\d{1,14}$/,
            'Número de teléfono inválido (ejemplo: +3434567890)'
        ),
});

export const updateProfileSchema = yup.object().shape({
    name: yup.string()
        .optional()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(50, 'El nombre no puede tener más de 50 caracteres')
        .matches(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo se permiten letras y espacios'),
    
    email: yup.string()
        .email('El formato del correo es incorrecto')
        .optional(),
    
    password: yup.string()
        .optional()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .max(12, 'La contraseña no puede tener más de 12 caracteres')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#!]).{8,12}$/,
            'La contraseña debe contener al menos una minúscula, una mayúscula, un número y uno de estos caracteres (@, #, !)'
        ),
    
    role: yup.string()
        .oneOf(['TOURIST', 'PROVIDER'], 'El rol es inválido')
        .optional(),
    
    preferences: yup.array()
        .of(yup.string().max(30, 'Cada preferencia no puede superar los 30 caracteres'))
        .optional(),
    
    location: yup.string()
        .oneOf(['España', 'Italia', 'Francia'])
        .optional(),

    phone: yup.string()
        .optional()
        .matches(
            /^\+?[1-9]\d{1,14}$/,
            'Número de teléfono inválido (ejemplo: +1234567890)'
        ),
});

export const uploadExperienceSchema = yup.object().shape({
    title: yup.string()
        .required('El título es obligatorio')
        .min(3, 'El título debe tener al menos 3 caracteres')
        .max(50, 'El título no puede tener más de 50 caracteres'),
    
    description: yup.string()
        .required('La descripción es obligatoria')
        .min(10, 'La descripción debe tener al menos 10 caracteres')
        .max(300, 'La descripción no puede superar los 300 caracteres'),
    
    location: yup.array()
        .of(yup.string()
            .min(2, 'Cada campo debe tener al menos 2 caracteres'))
            .max(25, 'Cada campo no puede superar los 25 caracteres')
        .required('La ubicación es obligatoria'),
    
    price: yup.number()
        .required('El precio es obligatorio')
        .positive('El precio debe ser un número positivo')
        .min(1, 'El precio mínimo es 1'),

    availabilityDates: yup.array()
        .of(yup.date().required('Cada fecha debe ser válida'))
        .required('Las fechas de disponibilidad son obligatorias')
        .min(1, 'Debe haber al menos una fecha disponible'),
    
    tags: yup.array()
        .of(yup.string().max(15, 'Cada etiqueta no puede superar los 15 caracteres'))
        .optional(),
    
    capacity: yup.number()
        .required('La capacidad es obligatoria')
        .positive('La capacidad debe ser un número positivo')
        .integer('La capacidad debe ser un número entero')
        .min(1, 'La capacidad mínima es 1'),

    hostId: yup.string()
        .required('El ID del anfitrión es obligatorio'),
});

export const updateExperienceSchema = uploadExperienceSchema.concat(
    yup.object().shape({
        id: yup.string().required('El ID es obligatorio'),
        title: yup.string().optional(),
        description: yup.string().optional(),
        location: yup.array().of(yup.string()).optional(),
        hostId: yup.string().required('El ID del anfitrión es obligatorio'),
        price: yup.number().optional(),
        availabilityDates: yup.array().of(yup.date().required('Cada fecha debe ser válida')).optional(),
        capacity: yup.number().optional(),
        tags: yup.array().of(yup.string()).optional(),
    })
);

export const uploadReviewSchema = yup.object().shape({
    experienceId: yup.string()
        .required('El ID de la experiencia es obligatorio'),
    
    rating: yup.number()
        .required('La calificación es obligatoria')
        .min(1, 'La calificación debe ser al menos 1')
        .max(5, 'La calificación no puede ser mayor a 5'),
    
    comment: yup.string()
        .required('El comentario es obligatorio')
        .min(10, 'El comentario debe tener al menos 10 caracteres')
        .max(500, 'El comentario no puede superar los 500 caracteres'),

    userId: yup.string()
        .required('El ID del usuario es obligatorio'),
});

export const updateReviewSchema = uploadReviewSchema.concat(
    yup.object().shape({
        reviewId: yup.string()
            .required('El ID de la reseña es obligatorio'),
        rating: yup.number().optional(),
        comment: yup.string().optional(),
        userId: yup.string().required('El ID del usuario es obligatorio'),
    })
);

export const bookingSchema = yup.object().shape({
    experienceId: yup.string().required('El ID de la experiencia es obligatorio'),
    userId: yup.string().required('El ID del usuario es obligatorio'),
    bookingDate: yup.date().required('La fecha de reserva es obligatoria'),
    participants: yup.number().required('El número de participantes es obligatorio').min(1, 'Debe haber al menos 1 participante'),
});

export const updateBookingSchema = yup.object().shape({
    experienceId: yup.string().optional(),
    userId: yup.string().required('El ID del usuario es obligatorio'),
    status: yup.string().oneOf(['PENDING', 'CONFIRMED', 'CANCELLED'], 'Estado inválido').optional(),
});

export const userVerification = yup.object().shape({
    email: yup.string()
        .email('El correo es inválido')
        .required('El correo es obligatorio'),
    
    verificationCode: yup.string()
        .matches(/^\d{6}$/, 'El código de verificación debe tener exactamente 6 dígitos')
        .required('El código de verificación es obligatorio'),
});

export const passwordChangeSchema = yup.object().shape({
    newPassword: yup.string()
        .required('La nueva contraseña es obligatoria')
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .max(12, 'La contraseña no puede superar los 12 caracteres')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#!]).{8,12}$/,
            'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un símbolo (@#!)'
        ),
    email: yup.string()
        .email('El correo es inválido')
        .required('El correo es obligatorio'),
    code: yup.string()
        .matches(/^\d{6}$/, 'El código de verificación debe tener exactamente 6 dígitos')
        .required('El código de verificación es obligatorio'),
});
