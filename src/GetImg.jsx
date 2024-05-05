// import { Box } from "@mui/material";

// import { useEffect, useState } from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";

// import Header from "../../components/Header";
const GetImg = () => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/687989`);
        const imageData = response.data;

        // Assuming imageData is a base64 encoded string
        const base64Image = `data:image/jpeg;base64,${imageData.image_path}`;
        setImageSrc(base64Image);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, []);

  

  return (
    <div>
      {imageSrc ? (
        <img src={imageSrc} alt="User Avatar" />
      ) : (
        <p>No image found for account number: </p>
      )}
    </div>
  );
};

export default GetImg;
