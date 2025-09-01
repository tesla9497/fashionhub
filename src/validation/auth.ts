import * as yup from 'yup';

// Signup validation schema
export const signupSchema = yup.object({
  name: yup
    .string()
    .required('Full name is required')
    .transform((value) => value?.trim())
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
    .test('not-empty-after-trim', 'Name cannot be only whitespace', (value) => {
      return value ? value.trim().length > 0 : false;
    }),
  
  email: yup
    .string()
    .required('Email is required')
    .transform((value) => value?.trim())
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters')
    .test('not-empty-after-trim', 'Email cannot be only whitespace', (value) => {
      return value ? value.trim().length > 0 : false;
    }),
  
  mobile: yup
    .string()
    .required('Mobile number is required')
    .transform((value) => value?.trim())
    .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
    .matches(/^[6-9]/, 'Mobile number must start with 6, 7, 8, or 9')
    .test('not-empty-after-trim', 'Mobile number cannot be only whitespace', (value) => {
      return value ? value.trim().length > 0 : false;
    }),
  
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(50, 'Password must be less than 50 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  
  dateOfBirth: yup
    .date()
    .nullable()
    .required('Date of birth is required')
    .max(new Date(), 'Date of birth cannot be in the future')
    .test('age', 'You must be at least 13 years old', (value) => {
      if (!value) return false;
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 13;
      }
      return age >= 13;
    }),
});

// Login validation schema
export const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .transform((value) => value?.trim())
    .email('Please enter a valid email address')
    .test('not-empty-after-trim', 'Email cannot be only whitespace', (value) => {
      return value ? value.trim().length > 0 : false;
    }),
  
  password: yup
    .string()
    .required('Password is required'),
});

// Profile validation schema
export const profileSchema = yup.object({
  name: yup
    .string()
    .required('Full name is required')
    .transform((value) => value?.trim())
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
    .test('not-empty-after-trim', 'Name cannot be only whitespace', (value) => {
      return value ? value.trim().length > 0 : false;
    }),
  
  mobile: yup
    .string()
    .required('Mobile number is required')
    .transform((value) => value?.trim())
    .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
    .matches(/^[6-9]/, 'Mobile number must start with 6, 7, 8, or 9')
    .test('not-empty-after-trim', 'Mobile number cannot be only whitespace', (value) => {
      return value ? value.trim().length > 0 : false;
    }),
});

// Export types for TypeScript
export type SignupFormData = yup.InferType<typeof signupSchema>;
export type LoginFormData = yup.InferType<typeof loginSchema>;
export type ProfileFormData = yup.InferType<typeof profileSchema>;
