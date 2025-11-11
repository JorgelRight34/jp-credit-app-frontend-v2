export const generateUsername = (firstName: string, lastName: string) => {
  return `${firstName[0]}${lastName.split(" ")?.[0]}`.toLowerCase();
};
