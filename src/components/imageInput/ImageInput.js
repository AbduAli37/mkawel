import React from "react";
import "./style.css";
import { useState } from "react";
import { useEffect } from "react";
const ImageInput = ({ getImage, value, id, name }) => {
  const [imgFile, setImgFile] = useState();
  const [imgURL, setImgURL] = useState(value);
  useEffect(() => {
    if (imgFile) {
      const imageURL = URL.createObjectURL(imgFile);
      setImgURL(imageURL);
    } else {
      getImage(null);
    }
    if (getImage) getImage(imgFile);
  }, [imgFile]);

  return (
    <div className="field_input">
      {imgURL ? (
        <div className="imageViewer">
          <img src={imgURL} alt="images" />
          <span
            className="btn btn-danger"
            onClick={() => {
              setImgFile(null);
              setImgURL(null);
            }}
          >
            <img
              src="https://res.cloudinary.com/duovxefh6/image/upload/v1701864460/delete_1_txgok9.png"
              alt=""
            />
          </span>
        </div>
      ) : (
        <label htmlFor={id}>
          <img
            src="https://res.cloudinary.com/duovxefh6/image/upload/v1701863613/upload_vv02m0.png"
            alt=""
          />
        </label>
      )}
      <input
        type="file"
        name={name}
        id={id}
        style={{ display: "none" }}
        onChange={(e) => {
          setImgFile(e.target.files[0]);
        }}
      />
    </div>
  );
};

export default ImageInput;
