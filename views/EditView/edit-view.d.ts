type UserInfoProps = {
  user: UserData,
  setUser: (user: UserData | null) => void
  onSave: (sectionName: string) => void,
  savedSections: {
    [key: string]: boolean;
  }

}
