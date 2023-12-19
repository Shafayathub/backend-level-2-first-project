import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const user: Partial<TUser> = {};

  user.password = password || (config.default_password as string);

  // set role
  user.role = 'student';

  // find admission semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //  generated id
    user.id = await generateStudentId(admissionSemester as TAcademicSemester);

    // create a user (transection-1)
    const newUser = await User.create([user], { session });

    //  create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create an user!');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference_id

    // create a student (transection-2)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create an student!',
      );
    }

    await session.commitTransaction();

    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const UserServices = {
  createStudentIntoDB,
};
