/*
* Developer: Gaurav Lokhande
* Date: 14 FEB 2026
* UseCase: This uploader is developed for overriding salesforce limitiations on upload files and allow us to upload big file till 2 GB
* Location: Bengaluru
* Email: gaurravlokhande@gmail.com
*/
import { LightningElement } from 'lwc';
import uploadChunkToApex from '@salesforce/apex/uploadChunkToApex.uploadChunkFileToApex';

export default class ChunkFileUploader extends LightningElement {
    
    handleFileUpload(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const base64 = reader.result.split(',')[1];
            this.uploadInChunks(file.name, base64);
        };

        reader.readAsDataURL(file);
    }

    uploadInChunks(fileName, base64Data) {

        const CHUNK_SIZE = 750 * 1024; // 750KB
        let start = 0;
        let end = CHUNK_SIZE;

        const uploadChunk = () => {

            const chunk = base64Data.substring(start, end);

            uploadChunkToApex({
                fileName: fileName,
                base64Chunk: chunk,
                isFirstChunk: start === 0,
                isLastChunk: end >= base64Data.length
            })
                .then(() => {

                    start = end;
                    end = start + CHUNK_SIZE;

                    if (start < base64Data.length) {
                        uploadChunk();
                    } else {
                        console.log('Upload complete 🎉');
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        };

        uploadChunk();
    }

}