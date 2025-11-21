type RegistrationData = {
  firstName: string;
  lastName: string;
  registrationGoal: "internship" | "work" | "internship_work";
  userStatus: "student" | "graduate" | "applicant";
  university: string;
  universityId: number;
  course: string;
  phone: string;
  verificationCode: string;
  isPhoneVerified: boolean;
}

type RegisrationFormProps = {
  formData: RegistrationData,
  setFormData: Dispatch<SetStateAction<RegistrationData>>
  errors?: RegistrationError,
  setErrors?: Dispatch<SetStateAction<RegistrationError>>
}

type RegistrationError = {
  firstName: boolean;
  lastName: boolean;
  university: boolean;
  course: boolean;
  phone: boolean;
}
