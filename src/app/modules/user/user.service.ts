import config from '../../config';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, student: TStudent) => {
  const user: Partial<TUser> = {};

  user.password = password || (config.default_password as string);

  // set role
  user.role = 'student';

  //  set manually generated id
  user.id = '203010001';

  // create a user
  const newUser = await User.create(user);

  //  create a student
  if (Object.keys(newUser).length) {
    student.id = newUser.id;
    student.user = newUser._id; //reference_id

    const newStudent = await StudentModel.create(student);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
