export type StudentInfo = {
  languageSkills?: {
    language: string;
    level: string;
  }[];
  technicalSkills?: {
    name: string;
    description: string;
    proficiency: number;
  }[];
  educations?: Education[];
  experiences?: Experience[]
  [key: string]: any
}

export type UserData = {
  studentId: number;
  studentName: string;
  phoneNumber: string;
  purpose: string;
  status: string;
  dateOfBirth: string;
  gender: string;
  [key: string]: any
}

export type UpdateUserDataProps = {
  dateOfBirth: string,
  gender: string,
  purpose: string,
  status: string,
  studentName: string
}
