import { Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student/student.interface';
import config from '../config';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    max: [20, "Can't be more than 20 character."],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not in a capitalized format.',
    },
  },
  middleName: String,
  lastName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [20, "Can't be more than 20 character."],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid.',
    },
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: [true, 'Father name is required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is required'],
  },
  fatherContuctNo: {
    type: String,
    required: [true, 'Father contact number is required'],
  },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local guardian name is required'],
  },
  occupation: {
    type: String,
    required: [true, 'Local guardian occupation is required'],
  },
  contuctNo: {
    type: String,
    required: [true, 'Local guardian contact number is required'],
  },
});

const studentSchema = new Schema<Student>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      minlength: [6, 'Password must be at least 6 character.'],
    },
    name: {
      type: userNameSchema,
      required: [true, 'Student name is required'],
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: [true, 'Gender is required'],
    },
    birthday: String,
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: { validator: (value: string) => validator.isEmail(value) },
    },
    contuctNo: {
      type: String,
      required: [true, 'Contact number is required'],
    },
    emergencyContuctNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian information is required'],
    },
    profileImg: String,
    isActive: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// virtual
studentSchema.virtual('fullname').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// pre middleware hook
studentSchema.pre('save', async function () {
  // console.log(this, 'pre hook: we will save data.');

  // hashing password and save into db
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
});
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// Query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  // [{ $match: { isDeleted: { $ne: true } } }, {$match: {id:{$eq:id}}}]
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const StudentModel = model<Student>('Student', studentSchema);
