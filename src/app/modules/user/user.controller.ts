import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;

    // creating a validation schema using zod
    // const zodParsedData = StudentValidationSchema.parse(studentData);

    //  will call service function to send this data
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );
    // send response
    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserControllers = {
  createStudent,
};
