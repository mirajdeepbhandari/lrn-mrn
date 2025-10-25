 import {useRef, useState} from 'react';

  const useImageUpload = () => {
     const [imageName, setImageName] = useState("");
     const [preview, setPreview] = useState(null);
     const [fileAttached, setFileAttached] = useState(false);
     const imageInputRef = useRef(null);
 
  const handleImageChange = ({event,  removeImage=false}) => {
    if (removeImage) {
      setFileAttached(false);
      setImageName("");
      setPreview(null);
      if (imageInputRef.current) {
      imageInputRef.current.value = ""; 
      }  
       return;
    }
    const file = event.target.files[0];
    if (file) {
      setFileAttached(true);
      setImageName(file.name); // show image file name
      setPreview(URL.createObjectURL(file)); // show image preview
    } else {
      setImageName("");
      setPreview(null);
      setFileAttached(false);
    }
  };

  return {handleImageChange, imageName, preview, fileAttached, imageInputRef};

   }

   export default useImageUpload;