import { z } from 'zod';

// Define schemas for subcomponents
const UserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .max(20, { message: "Can't be more than 20 characters" })
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: 'First name must be in capitalized format',
      },
    ),
  middleName: z.string(),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required' })
    .max(20, { message: "Can't be more than 20 characters" }),
});

const GuardianValidationSchema = z.object({
  fatherName: z.string().min(1, { message: 'Father name is required' }),
  fatherOccupation: z
    .string()
    .min(1, { message: 'Father occupation is required' }),
  fatherContuctNo: z
    .string()
    .min(1, { message: 'Father contact number is required' }),
});

const LocalGuardianValidationSchema = z.object({
  name: z.string().min(1, { message: 'Local guardian name is required' }),
  occupation: z
    .string()
    .min(1, { message: 'Local guardian occupation is required' }),
  contuctNo: z
    .string()
    .min(1, { message: 'Local guardian contact number is required' }),
});

// Define the main Student schema
const CreateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().min(6),
    student: z.object({
      name: UserNameValidationSchema.refine(
        (value) =>
          value.firstName ===
          value.firstName.charAt(0).toUpperCase() + value.firstName.slice(1),
        {
          message:
            'First name in the Student name must be in capitalized format',
        },
      ),
      gender: z.enum(['male', 'female']),
      birthday: z.string().optional(),
      email: z.string().email({
        message: 'Email is required and must be a valid email address',
      }),
      contuctNo: z.string().min(1, { message: 'Contact number is required' }),
      emergencyContuctNo: z
        .string()
        .min(1, { message: 'Emergency contact number is required' }),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
        .optional(),
      presentAddress: z
        .string()
        .min(1, { message: 'Present address is required' }),
      permanentAddress: z
        .string()
        .min(1, { message: 'Permanent address is required' }),
      guardian: GuardianValidationSchema,
      localGuardian: LocalGuardianValidationSchema,
      admissionSemester: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const StudentValidations = {
  CreateStudentValidationSchema,
};
