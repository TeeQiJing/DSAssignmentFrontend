import React, { useState, useEffect } from "react";
import axios from "axios";

const GetUserAvatar = ({ accountNumber }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/${accountNumber}`);
        const imageData = response.data;

        // Assuming imageData is a base64 encoded string
        const base64Image = `data:image/jpeg;base64,${imageData.image_path}`;
        setImageSrc(base64Image);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [accountNumber]);

  return <img src={imageSrc} alt="Avatar" />;
};

export default GetUserAvatar;