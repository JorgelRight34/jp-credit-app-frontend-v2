export const downloadFile = (file: Blob, filename?: string) => {
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