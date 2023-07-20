import React, { useState } from 'react'
import "./styles.css"

const FileInput = ({accept, id, fileHandle, text}) => {

    const [fileSelected, setFileSelected] = useState(false)

    const onChange = (e) => {
        setFileSelected(e.target.files[0].name);
        fileHandle(e.target.files[0])
    }

  return (
    <>
        <label className={`custom-input ${!fileSelected && "label-input"}`} htmlFor={id}>{!fileSelected ? `${text}` : `${fileSelected}`}</label>
        <input onChange={onChange} type="file" accept={accept} id={id} style={{display: 'none'}}/>
    </>
    
  )
}

export default FileInput