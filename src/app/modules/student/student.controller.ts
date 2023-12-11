import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import { StudentValidationSchema } from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // creating a validation schema using zod
    const zodParsedData = StudentValidationSchema.parse(studentData);

    //   will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(zodParsedData);
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

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Got Students data successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: 'Data fetching failed.',
      data: err,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  const { studentId } = req.params;
  try {
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Got that stupid',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: 'Did not Get that stupid',
      data: err,
    });
  }
};

const deleteStudentFromDB = async (req: Request, res: Response) => {
  const { studentId } = req.params;
  try {
    const result = await StudentServices.deleteStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'deleted successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Somthing went wrong',
      data: err,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudentFromDB,
};
