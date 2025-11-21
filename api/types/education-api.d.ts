export interface University {
  universityId: number
  universityName: string
  [key: string]: any
}

export interface Education {
  educationId: number,
  educationPlace: string,
  degree: string,
  faculty: string,
  specialization: string,
  startYear: number,
  endYear: number,
  isCurrent: boolean
}

export interface CreateEducation {
  customName: string,
  degree: string,
  endYear: number,
  faculty: string,
  isCurrent: boolean,
  specialization: string,
  startYear: number,
  universityId: null | number
}

export interface UpdateEducationProps {
  educationId: number;
  education: CreateEducation
}
