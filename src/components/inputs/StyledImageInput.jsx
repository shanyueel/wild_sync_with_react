import styled, { css } from "styled-components";
import { useEffect, useRef, useState } from "react";

import {ReactComponent as CrossIcon} from "assets/icons/CrossIcon.svg"
import {ReactComponent as UploadIcon} from "assets/icons/UploadIcon.svg"

const ImageInput = ({ className, title, inputId, defaultImgURL, formContent, onFormChange, warning, coverUsed, avatarUsed, activityMapUsed }) => {
  const uploadButtonRef = useRef(null)
  const displayImageRef = useRef(null)
  const [imgSrc, setImgSrc] = useState(formContent?.[inputId] || defaultImgURL)
  const [warningContent, setWarningContent] = useState(warning)

  useEffect(()=>{
    setWarningContent(warning)
  },[warning])

  useEffect(()=>{
    setImgSrc(formContent?.[inputId] || defaultImgURL)
  },[formContent, inputId, defaultImgURL])

  const handleUpload = async () => {
    const uploadBtn = uploadButtonRef.current
    const [ file ] = uploadBtn.files
    const imgTempURL = URL.createObjectURL(file)
    setImgSrc(imgTempURL)

    const newForm = {
      ...formContent,
      [inputId]: imgTempURL,
      [`${inputId}File`]: file,
    }
    onFormChange(newForm)
  }

  const handleReset = async(e) => {
    if(formContent?.[`${inputId}File`]){
      URL.revokeObjectURL(formContent?.[inputId])
      delete formContent?.[inputId]
      delete formContent?.[`${inputId}File`]

      const newForm = {
        ...formContent,
        [inputId]: defaultImgURL
      }

      onFormChange(newForm)
      setImgSrc(defaultImgURL)
    } else{
      const newForm = {
        ...formContent,
        [inputId]: defaultImgURL
      }

      onFormChange(newForm)
      setImgSrc(defaultImgURL)
    }
    


  }

  return(
    <div className={className}>
      {
        ( title || warningContent ) &&
        <div className="c-input-title">
          <label className="o-input-title__name">{title}</label>
          <label className="o-input-title__warning">{warningContent}</label>
        </div>
      }

      <div className="c-input-body">
        <img 
          className="o-image-input__display" 
          ref={displayImageRef} 
          src={imgSrc} 
          alt='upload-display'
        />
        <div className='c-image-input__control'>
          <label className='o-image-input__control-upload' htmlFor={inputId}>
            <input id={inputId} type="file" ref={uploadButtonRef} onChange={handleUpload}/>
            <UploadIcon/>
          </label>
          <div className='o-image-input__control-delete'>
            <CrossIcon onClick={handleReset}/>
          </div>
        </div>
      </div>

    </div>
  )
}

const StyledImageInput = styled(ImageInput)`
  .c-input-body{
    position: relative;

    &::before{
      content:"";
      position: absolute;
      top:0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255,255,255, 0.5);
      z-index: 3;
    }

    .o-image-input__display{
      position: relative;
      object-fit: cover;
      width: 100%;
      aspect-ratio: 16/9;
    }
    
    .c-image-input__control{
      position: absolute;
      top: 50%;
      left: 50%;
      display: flex;
      gap: 1.75rem;
      transform: translate(-50%,-50%);
      z-index: 5;

    
      .o-image-input__control-upload,
      .o-image-input__control-delete{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        background-color: white;
        cursor: pointer;

        svg{
          width: 1.25rem;
          height: 1.25rem;
          fill: ${({theme})=> theme.color.default}
        }

        input{
          display: none;
        }
      }
    }  
  }

  ${props => props.coverUsed && css`
    .o-image-input__display{
      width: 100%;
      aspect-ratio: 21 / 9;
    }
  `}

  ${props => props.avatarUsed && css`
    position: absolute;

    .c-input-body{
      &::before{
        border-radius: 50%;
      }
      .o-image-input__display{
        width: 6rem;
        aspect-ratio: 1 / 1;
        border-radius: 50%;
        border: 7.5px solid ${({theme})=>theme.color.default};
      }

      .c-image-input__control{
        gap: .75rem;
        .o-image-input__control-upload,
        .o-image-input__control-delete{
          width: 1.75rem;
          height: 1.75rem;
          svg{
            width: 1rem;
            height: 1rem;
          }
        }
      }
    }
  `}

  ${props => props.activityMapUsed && css`
    .c-input-body{
      .o-image-input__display{
        width: 100%;
      }
    }
  `}

`

export default StyledImageInput