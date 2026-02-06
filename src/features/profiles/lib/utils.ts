export const getProfileFullName = (profile: { firstName: string; lastName: string }): string => {
    return `${profile.firstName} ${profile.lastName}`;
}