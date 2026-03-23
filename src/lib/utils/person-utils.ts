export const toDNI = (d: string) => {
    return `${d.slice(0, 3)}-${d.slice(3, 9)}-${d.slice(9, 10)}`;
}
