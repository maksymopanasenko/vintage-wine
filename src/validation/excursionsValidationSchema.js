import * as Yup from 'yup';

const excursionValidationSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, 'Title must be between 3 and 30 characters')
        .max(30, 'Title must be between 3 and 30 characters')
        .matches(/^[a-zA-Z0-9\s]+$/, 'Allowed characters are a-z, A-Z, 0-9')
        .required('Title is required'),
    description: Yup.string()
        .min(10, 'Description must be between 10 and 600 characters')
        .max(600, 'Description must be between 10 and 600 characters')
        .matches(/^[a-zA-Z0-9\s\S]+$/, 'Allowed characters are a-z, A-Z, 0-9')
        .required('Description is required'),
});

const extendedExcursionValidationSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, 'Title must be between 3 and 30 characters')
        .max(30, 'Title must be between 3 and 30 characters')
        .matches(/^[a-zA-Z0-9\s]+$/, 'Allowed characters are a-z, A-Z, 0-9')
        .required('Title is required'),
    description: Yup.string()
        .min(10, 'Description must be between 10 and 600 characters')
        .max(600, 'Description must be between 10 and 600 characters')
        .matches(/^[a-zA-Z0-9\s\S]+$/, 'Allowed characters are a-z, A-Z, 0-9')
        .required('Description is required'),
    imageURL: Yup.mixed().required('Please select a file'),
});

export { excursionValidationSchema, extendedExcursionValidationSchema };