import styled from "styled-components";

import {ReactComponent as UploadIcon} from "assets/icons/UploadIcon.svg"

import userDefaultImage from "assets/images/userDefaultImage.png"

const AvatarInput = ({className, title, warning}) => {
  return(
    <div className={className}>
      <div className="c-input-title">
        <label className="o-input-title__name">{title}</label>
        <label className="o-input-title__warning">{warning}</label>
      </div>
      <div className="c-input-body">
        <img className="o-avatar-input__display" src={userDefaultImage} alt='activity-cover'/>
        <div className='c-avatar-input__control'>
          <div className='o-avatar-input__control-upload'><UploadIcon/></div>
        </div>
      </div>
    </div>
  )
}

const StyledAvatarInput = styled(AvatarInput)`
  .c-input-body{
    position: relative;
    width: 7.5rem;
    height: 7.5rem;
    border: .5rem solid ${({theme})=> theme.color.default};
    border-radius: 50%;

    &::before{
      content:"";
      position: absolute;
      top:0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: rgba(255,255,255, 0.5);
      z-index: 3;
    }

    .o-avatar-input__display{
      position: relative;
      width: 100%;
      height: 100%;
      
      border-radius: 50%;
      aspect-ratio: 16 /9;
      object-fit: cover;
    }
    
    .c-avatar-input__control{
      position: absolute;
      top: 50%;
      left: 50%;
      display: flex;
      gap: 2.5rem;
      transform: translate(-50%,-50%);
      z-index: 5;

    
      .o-avatar-input__control-upload,
      .o-avatar-input__control-delete{
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
      }
    }  
  }

`

export default StyledAvatarInput