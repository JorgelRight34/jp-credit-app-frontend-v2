import { AxiosResponse } from "axios";

export const downloadFile = (file: Blob, filename?: string) => {
    const url = URL.createObjectURL(file);

    const a = document.createElement("a");
    a.style.display = 'none';
    a.target = "_blank";
    a.href = url;
    alert(filename)
    a.download = "hola";
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

export const downloadFileFromAxiosResponse = (response: AxiosResponse<Blob>) => {
    const disposition = response.headers['content-disposition']
    const filename = disposition?.match(/filename="?([^"]+)"?/)?.[1]

    downloadFile(response.data, filename)
}