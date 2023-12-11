export type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContuctNo: string;
};

export type LocalGuardian = {
  name: string;
  occupation: string;
  contuctNo: string;
};

export type Student = {
  id: string;
  password: string;
  name: UserName;
  gender: 'male' | 'female';
  birthday?: string;
  email: string;
  avatar?: string;
  contuctNo: string;
  emergencyContuctNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImg?: string;
  isActive: 'active' | 'inactive';
  isDeleted: boolean;
};
