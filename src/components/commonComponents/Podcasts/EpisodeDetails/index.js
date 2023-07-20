import React from 'react'
import Button from '../../Button'

const EpisodeDetails = ({index, title, description, audioFile, onClick}) => {
  return (
     <div
        style={{
           marginBottom: "1.5rem",
           width: "100%",
           display: "flex",
           alignItems: "center",
           justifyContent: "space-between",
        }}
     >
        <div style={{ display: "flex", flexDirection: "column" }}>
           <h1 style={{ fontWeight: 500, textAlign: "left", marginBottom: 0 }}>
              {index}. {title}
           </h1>
           <p
              className="podcast-description"
              style={{
                 maxWidth: "60vw",
                 margin: 0,
                 marginTop: "1.2rem",
                 marginLeft: "1.2rem",
                 marginRight: "1.2rem",
              }}
           >
              {description}
           </p>
        </div>
        <div style={{ alignSelf: "flex-start" }}>
           <Button
              text={"Play"}
              width={"150px"}
              onClick={() => onClick(audioFile)}
           />
        </div>
     </div>
  );
}

export default EpisodeDetails