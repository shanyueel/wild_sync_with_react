import styled, { css } from "styled-components";

import {ReactComponent as CrossIcon} from "assets/icons/CrossIcon.svg"
import {ReactComponent as UploadIcon} from "assets/icons/UploadIcon.svg"
import { useRef } from "react";
import { deleteImage, uploadImage } from "api/api";

const ImageInput = ({ className, title, inputId, uploadFolder, uploadFilename, defaultImgURL, formContent, onFormChange, warning, coverUsed, avatarUsed, activityCoverUsed }) => {
  const uploadButtonRef = useRef(null)
  const displayImageRef = useRef(null)

  const handleUpload = async (e) => {
    const uploadBtn = uploadButtonRef.current
    const displayImg = displayImageRef.current
    const [ file ] = uploadBtn.files
    await displayImageFromFile(displayImg, file)
    const imageURL = await uploadImage(uploadFolder, uploadFilename, file)
    
    const newForm = {
      ...formContent,
      [e.target.id]: imageURL
    }
    onFormChange(newForm)
  }

  const displayImageFromFile= async( img, file ) => {
    try{
      img.src =  URL.createObjectURL(file)
      await img.onload
      URL.revokeObjectURL(img.src)
      console.log("[暫存照片成功]",img)
      return img
    }catch(error){
      console.error("[暫存照片失敗]:",error)
    }
  }

  const handleReset = async(e) => {
    const displayImg = displayImageRef.current
    displayImg.src = defaultImgURL
    const newForm = {
      ...formContent,
      [e.target.id]: defaultImgURL
    }
    await deleteImage(uploadFolder, uploadFilename)
    onFormChange(newForm)
  }

  return(
    <div className={className}>
      <div className="c-input-title">
        <label className="o-input-title__name">{title}</label>
        <label className="o-input-title__warning">{warning}</label>
      </div>
      <div className="c-input-body">
        <img 
          className="o-image-input__display" 
          ref={displayImageRef} 
          src={formContent[inputId]|| require('assets/images/userDefaultCover.jpg')} 
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

`

export default StyledImageInput