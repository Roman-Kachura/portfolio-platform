import {ChangeEvent} from 'react';

export const fileReader = async (e: ChangeEvent<HTMLInputElement>) => {
    let image: null | string | ArrayBuffer = null;
    let file: null | File = null;
    if (e.target.files) {
        console.log()
        const newFile = e.target.files[0];
        const reader = new FileReader();
        await reader.readAsDataURL(newFile);
        reader.addEventListener('load', (ev) => {
            if (ev.target) {
                image = ev.target.result;
                file = newFile;
            }
        })

        reader.addEventListener('load', async (ev) => {
            if (ev.target) {
                image = await ev.target.result;
                file = newFile;
            }
        })

        if(reader.DONE){
            console.log('done')
            console.log(file,image)
            return {file, image};
        }
    } else {
        return {file, image};
    }
    return {file,image}
}