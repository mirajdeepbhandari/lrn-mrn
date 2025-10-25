import styles from "./CreatePosts.module.css";
import { useRef, useState } from "react";
import instance from "../utils/axios";
import { URLS } from "../constants/index";
import AlertBox from '../components/AlertBox';
import {getItem} from "../utils/session"

const CreatePosts = () => {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState("");
  const [isImageUpload, setIsImageUpload] = useState(false);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [error, setError] = useState("");
  const [successMssg, setSuccessMssg] = useState("");

  const getfile = () => {
    fileInputRef.current.click();
  };

  const resetForm = () => {
    setError("");
    setSuccessMssg("");
    setFormData({ title: "", content: "" });
    setIsImageUpload(false);
    setImage("");
    setPreview(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const result = await instance.post(URLS.POST_CREATE_BLOG, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "access_token": getItem("access_token"),
        },
      });
      console.log(result);
      setSuccessMssg(result?.data?.msg);
      setTimeout(() => {
              resetForm();
            }, 2000);
    } catch (error) {
      console.log(error);
       setSuccessMssg("");
       const error_msg = error?.response?.data?.msg || "Something went wrong";
      setError(error_msg);
    }
  };

  const handleImageUpload = ({ event, removeImage = false }) => {
    if (removeImage) {
      setIsImageUpload(false);
      setImage("");
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    const file = event.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setIsImageUpload(true);
      setImage(file.name); // show image file name
      setPreview(URL.createObjectURL(file));
    } else {
      setIsImageUpload(false);
      setImage("");
      setPreview(null);
    }
  };

  return (
    <div className={styles.createBodyWrapper}>
      <div className={styles.starsContainer}>
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className={styles.star}></div>
        ))}
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h1>
              <i className="bi bi-pencil-square"></i>
              Create Blog Post
            </h1>
            <p>Share your thoughts with the world</p>
          </div>

          {error && <AlertBox errorMsg={error} type="danger" />}
          {successMssg && <AlertBox errorMsg={successMssg} type="success" />}

          <form id="blogForm">
            {/* Title Field */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="title">
                <i className="bi bi-type"></i>
                Post Title
              </label>
              <input
                type="text"
                className={styles.formControl}
                id="title"
                placeholder="Enter an engaging title..."
                required
                onChange={(e)=>setFormData((prev)=> ({...prev, title: e.target.value}))}
              />
            </div>

            {/* Content Field */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="content">
                <i className="bi bi-file-text"></i>
                Content
              </label>
              <textarea
                className={styles.formControl}
                id="content"
                placeholder="Write your blog post content here..."
                required
                onChange={(e)=>setFormData((prev)=> ({...prev, content: e.target.value}))}
              ></textarea>
            </div>

            {/* Image Upload */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                <i className="bi bi-image"></i>
                Featured Image
              </label>
              <button
                type="button"
                style={{ width: "100%", border: "none" }}
                onClick={() => getfile()}
              >
                <div className={styles.imageUploadArea} id="uploadArea">
                  <div className={styles.uploadIcon}>
                    <i className="bi bi-cloud-arrow-up"></i>
                  </div>
                  <div className={styles.uploadText}>
                    Drag and drop your image here
                  </div>
                  <div className={styles.uploadSubtext}>
                    or click to browse (PNG, JPG, GIF)
                  </div>
                </div>
              </button>

              <input
                type="file"
                id="imageInput"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={(e) => handleImageUpload({ event: e })}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isImageUpload && (
                  <img
                    id="imagePreview"
                    alt="Preview"
                    src={preview}
                    style={{
                      width: "250px",
                      marginTop: "10px",
                      borderRadius: "8px",
                    }}
                  />
                )}
              </div>
              {isImageUpload && (
                <p
                  style={{
                    color: "#6c6464",
                    marginTop: "10px",
                    textAlign: "center",
                  }}
                >
                  {image}
                </p>
              )}

              {isImageUpload && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button
                    type="button"
                    className={styles.removeImageBtn}
                    id="removeImageBtn"
                    onClick={() => handleImageUpload({ removeImage: true })}
                  >
                    <i className="bi bi-trash"></i> Remove Image
                  </button>
                </div>
              )}
            </div>

            {/* Buttons */}
            <button type="submit" className={styles.btnSubmit} onClick={(e)=>handleFormSubmit(e)}>
              <i className="bi bi-send"></i>
              Publish Post
            </button>
            <br />
            <button
              type="reset"
              className={`${styles.btnSubmit}`}
              onClick={() => resetForm()}
            >
              <i className="bi bi-trash" style={{ color: "red" }}></i>
              Clear
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePosts;
