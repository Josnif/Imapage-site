import React, { useState } from 'react';
import axios from 'axios';

const ImageComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState('');

  const handleImageUpload = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('image', selectedImage);

    formData.append('placeholderData[name]', 'John Doe'); 

    try {
      const response = await axios.post('/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'arraybuffer',
      });

      const base64 = Buffer.from(response.data, 'binary').toString('base64');
      setProcessedImage(`data:image/jpeg;base64,${base64}`);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='dark:text-white text-black'>
      <input type="file" required onChange={handleImageUpload} className='block mb-5' />

      <button className='px-4 py-2 bg-amber-700 text-white rounded-md' onClick={handleSubmit}>Upload and Process Image</button>

      {processedImage && (
        <div>
          <h2>Processed Image Preview</h2>
          <img src={processedImage} alt="Processed" />
        </div>
      )}
    </div>
  );
};

export default ImageComponent;
