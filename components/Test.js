"use client"

import { useState } from "react"


function Test() {
  const [img,setImg] = useState("")

  const handleImage = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
  
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImg(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
  
    fileInput.click();
  };
  
  return (
    <div>
          <button onClick={handleImage}>test</button>
      <img src={img} alt="" />
    </div>
  )
}

export default Test