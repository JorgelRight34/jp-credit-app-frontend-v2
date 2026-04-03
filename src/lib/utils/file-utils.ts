
export const downloadFile = (file: Blob, filename?: string) => {
    console.log(file)
    const url = URL.createObjectURL(file);

    const a = document.createElement("a");
    a.style.display = 'none';
    a.target = "_blank";
    a.href = url;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

export const fileFromUrl = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();

    return new File([blob], 'file', { type: blob.type })
}