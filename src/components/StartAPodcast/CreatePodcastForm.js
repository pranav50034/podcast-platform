import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InputComponent from '../commonComponents/Input';
import Button from '../commonComponents/Button';
import { toast } from 'react-toastify';
import FileInput from '../commonComponents/Input/FileInput';
import { auth, db, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

const CreatePodcastForm = () => {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [displayImage, setDisplayImage] = useState();
    const [bannerImage, setBannerImage] = useState();
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async() => {
        if(title && desc && displayImage && bannerImage){
            setLoading(true)
            try{
               const bannerImgRef = ref(
                  storage,
                  `podcasts/${auth.currentUser.uid}/${Date.now()}`
               );
               await uploadBytes(bannerImgRef, bannerImage);
               const bannerImgURL = await getDownloadURL(bannerImgRef);

               const displayImgRef = ref(
                  storage,
                  `podcasts/${auth.currentUser.uid}/${Date.now()}`
               );
               await uploadBytes(displayImgRef, displayImage);
               const displayImgURL = await getDownloadURL(displayImgRef);

               const podcastData = {
                     title: title,
                     description: desc,
                     bannerImage: bannerImgURL,
                     displayImage: displayImgURL,
                     createdBy: auth.currentUser.uid,
               }

               const docRef = await addDoc(collection(db, "podcasts"), podcastData)

               setTitle("")
               setDesc("")
               setBannerImage(null)
               setDisplayImage(null)

               toast.success("Podcast Created!");
               setLoading(false)
            } catch(e){
               toast.error(e.message)
               setLoading(false)
            }
            
         }
         else{
            toast.error("Enter All The Values!")
            setLoading(false)
         }
    }

    const displayImgHandle = (file) => {
      setDisplayImage(file)
    }

    const bannerImgHandle = (file) => {
      setBannerImage(file)
    };

  return (
     <div className="input-div">
        <InputComponent
           state={title}
           setState={setTitle}
           placeholder="Title"
           type="text"
           required={true}
        />
        <InputComponent
           state={desc}
           setState={setDesc}
           placeholder="Description"
           type="text"
           required={true}
        />
        <FileInput
           text="Import Display Image"
           accept={"image/*"}
           fileHandle={displayImgHandle}
           id={"display-image-input"}
        />
        <FileInput
           text="Import Banner Image"
           accept={"image/*"}
           fileHandle={bannerImgHandle}
           id={"banner-image-input"}
        />
        <Button
           text={loading ? "Loading..." : "Enlighten The World!"}
           disabled={loading}
           onClick={handleSubmit}
        />
     </div>
  );
}

export default CreatePodcastForm