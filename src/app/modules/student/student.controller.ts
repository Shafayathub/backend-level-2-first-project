import { Request, Response } from 'express';
import { StudentServices } from './student.service';

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
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Somthing went wrong',
      data: err,
    });
  }
};

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudentFromDB,
};
