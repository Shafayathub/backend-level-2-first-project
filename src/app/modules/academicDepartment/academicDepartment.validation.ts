import { z } from 'zod';

const CreateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'which department',
      invalid_type_error: 'Academic Department name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Faculty is required',
      required_error: 'Faculty is required',
    }),
  }),
});
const UpdateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic Department name is required',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'Academic Faculty is required',
        required_error: 'Faculty is required',
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidations = {
  CreateAcademicDepartmentValidationSchema,
  UpdateAcademicDepartmentValidationSchema,
};
