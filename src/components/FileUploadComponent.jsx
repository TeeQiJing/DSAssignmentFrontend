import React, { useState } from 'react';
import axios from 'axios';

function FileUploadComponent() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('accountNumber', '102120021');
            formData.append('image', file);

            await axios.post('http://localhost:8080/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Image uploaded successfully!');
        } catch (error) {
            console.log(file);
            console.error('Error uploading image:', error);
            alert('Error uploading image. Please try again later.');
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleSubmit}>Upload</button>
        </div>
    );
}

export default FileUploadComponent;
