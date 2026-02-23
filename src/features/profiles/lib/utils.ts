export const getProfileFullName = (profile: { firstName: string; lastName: string }): string => {
    return `${profile.firstName} ${profile.lastName}`;
}

export const getProfileInvertedName = (profile: { firstName: string; lastName: string }): string => {
    return `${profile.lastName}, ${profile.firstName}`
}