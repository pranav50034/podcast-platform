import React, { useState } from 'react'
import Header from "../components/commonComponents/Header"
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import InputComponent from '../components/commonComponents/Input';
import FileInput from '../components/commonComponents/Input/FileInput';
import Button from '../components/commonComponents/Button';
import { toast } from 'react-toastify';
import { auth, db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

const CreateAnEpisode = () => {
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [audioFile, setAudioFile] = useState();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const audioFileHandle = (file) => {
        setAudioFile(file)
    }

    const handleSubmit = async() => {
        setLoading(true)
        if((title, desc, audioFile, id)){
            try{
                const audioRef = ref(
                    storage,
                    `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`
                );
                await uploadBytes(audioRef, audioFile);

                const audioUrl = await getDownloadURL(audioRef);
                const episodeData = {
                    title: title,
                    description: desc,
                    audiofile: audioUrl
                };
                await addDoc(
                    collection(db, "podcasts", id, "episodes"),
                    episodeData
                );

                toast.success("Episode Created Successfully!")
                setLoading(false)
                setTitle("")
                setDesc("")
                setAudioFile("")
                navigate(`/podcast/${id}`);

            }catch(e){
                toast.error(e.message)
                setLoading(false)
            }
        }else{
            toast.error("Please Enter Every Detail")
            setLoading(false)
        }
    }

  return (
     <div>
        <Header />
        <div className="input-wrapper">
           <h1>Create An Episode</h1>
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
              text="Upload Audio"
              accept={"audio/*"}
              fileHandle={audioFileHandle}
              id={"audio-file-input"}
           />
           <Button
              text={loading ? "Loading..." : "Create Episode"}
              disabled={loading}
              onClick={handleSubmit}
           />
        </div>
     </div>
  );
}

export default CreateAnEpisode