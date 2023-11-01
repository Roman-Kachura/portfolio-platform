export const downloadFile = async (files: FileList | null) => {
    let image: null | ArrayBuffer | string = null;
    let file: null | File = null;
    const filePromises = [];
    for (let key in files) {
        const foundFile = files[+key];
        if (foundFile) {
            const promise = new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = async (ev) => {
                    try {
                        const src = ev.target?.result;
                        if (src) {
                            image = src;
                            file = foundFile
                        }
                        resolve({
                            image: ev.target?.result,
                            file: foundFile
                        })
                    } catch (e) {
                        reject(e);
                    }
                };
                reader.readAsDataURL(foundFile)
            });
            filePromises.push(promise);
        }
    }
    const result = await Promise.all(filePromises);
    return result[0] as DownloadImageReturnType;
}

interface DownloadImageReturnType {
    image: null | ArrayBuffer | string;
    file: null | File;
}