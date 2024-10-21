import React, { useRef, useState, useEffect } from "react";

import Button from "./Button";

import styles from "./FileUpload.module.css";
import formStyles from "./Input.module.css";

const ImageUpload = (props) => {
  const imageInput = useRef();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedImageHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInputChange(props.id, pickedFile, fileIsValid);
  };

  const imagePickerHandler = () => {
    imageInput.current.click();
  };
  return (
    <div className={formStyles["form-control"]}>
      <input
        ref={imageInput}
        onChange={pickedImageHandler}
        type="file"
        id={props.id}
        style={{ display: "none" }}
        accept="image/jpg, image/jpeg, image/png"
      />
      <div className={styles.imageUpload}>
        <div className={styles.imagePreview}>
          {previewUrl && <img src={previewUrl} alt={"preview"} />}
          {!previewUrl && <p style={{ color: "black" }}>{props.label}</p>}
        </div>
        <Button
          style={{ margin: "0" }}
          type="button"
          onClick={imagePickerHandler}
          mid
        >
          Pick An Image
        </Button>
      </div>
      {!isValid && (
        <p
          style={{
            fontFamily: "italic",
            fontSize: "0.75rem",
            color: "var(--danger)",
          }}
        >
          {props.errorText}
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
