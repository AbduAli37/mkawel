import React, { useState, useEffect } from "react";

const ImagesInput = ({ getImages, values, id, name }) => {
  const [imgFiles, setImgFiles] = useState([]);
  const [imgURLs, setImgURLs] = useState(values && values.length ? values : []);

  useEffect(() => {
    console.log(imgFiles);
    if (imgFiles.length > 0) {
      const img = imgFiles.map((file) => URL.createObjectURL(file));
      setImgURLs(img);
    } else {
      // If no images, reset imgURLs
      setImgURLs([]);
    }

    if (getImages && getImages.length) getImages(imgFiles);
  }, [imgFiles]);

  return (
    <div className="field_input">
      <div className="input_fields">
        {imgURLs && imgURLs.length
          ? imgURLs.map((item, index) => (
              <div className="imageViewer" key={index}>
                <img src={item} alt="images" />
                <span
                  className="btn btn-danger"
                  onClick={() => {
                    setImgFiles(
                      imgFiles.filter((_, n_index) => index !== n_index)
                    );
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/duovxefh6/image/upload/v1701864460/delete_1_txgok9.png"
                    alt=""
                  />
                </span>
              </div>
            ))
          : null}
      </div>
      <label htmlFor={id}>
        <img
          src="https://res.cloudinary.com/duovxefh6/image/upload/v1701863613/upload_vv02m0.png"
          alt=""
        />
      </label>
      <input
        type="file"
        name={name}
        id={id}
        multiple={true}
        style={{ display: "none" }}
        onChange={(e) => {
          setImgFiles(
            imgFiles?.length
              ? [...imgFiles, ...Array.from(e.target.files)]
              : Array.from(e.target.files)
          );
        }}
      />
    </div>
  );
};

export default ImagesInput;
