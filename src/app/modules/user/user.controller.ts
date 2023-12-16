import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createStudent = async (req: Request, res: Response) => {
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
    res.status(500).json({
      success: false,
      message: 'Failed to create Student.',
      data: err,
    });
  }
};

export const UserControllers = {
  createStudent,
};
