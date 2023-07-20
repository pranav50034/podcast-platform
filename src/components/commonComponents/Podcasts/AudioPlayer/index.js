import React, { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import "./styles.css";

const AudioPlayer = ({ audioSrc, image }) => {
   const [duration, setDuration] = useState("");
   const [volume, setVolume] = useState(1);
   const [isPlaying, setIsPlaying] = useState(true);
   const [isMute, setIsMute] = useState(false);
   const audioRef = useRef();

   const handleDuration = (e) => {
      setDuration(e.target.value);
   };
   const handleVolume = (e) => {
      setVolume(e.target.value);
   };
   const togglePlay = () => {
      setIsPlaying(!isPlaying);
   };
   const toggleMute = () => {
    setIsMute(!isMute)
   }

   useEffect(() => {
    if(isPlaying){
      audioRef.current.play()
    }
    else{
      audioRef.current.pause()
    }
   }, [isPlaying])

   return (
      <div className="custom-audio-player">
         <img src={image} className="display-image-player" />
         <audio ref={audioRef} src={audioSrc} />
         <div className="duration-flex">
            <div className="duration-div">
              <p className="icons" onClick={togglePlay}>{isPlaying ? <FaPause /> : <FaPlay />}</p>
              <p>0:00</p>
              <input
                 type="range"
                 className="duration-range"
                 onChange={handleDuration}
              />
              <p>-21:00</p>
            </div>
            <div className="volume-div">
              <p className="icons" onClick={toggleMute}>{isMute ? <FaVolumeUp /> : <FaVolumeMute />}</p>
              <input
                 type="range"
                 className="volume-range"
                 onChange={handleVolume}
              />
            </div>
         </div>
      </div>
   );
};

export default AudioPlayer;
