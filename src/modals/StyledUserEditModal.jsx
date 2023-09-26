import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import styled from "styled-components";

import StyledImageInput from 'components/inputs/StyledImageInput';
import StyledTextInput from 'components/inputs/StyledTextInput';
import StyledDateInput from 'components/inputs/StyledDateInput';
import StyledTextArea from 'components/inputs/StyledTextArea';
import StyledButton from 'components/StyledButton';

import {ReactComponent as CrossIcon} from "assets/icons/CrossIcon.svg"
import { updateUser} from 'api/userApi';
import { updateUserSlice } from 'reducers/userSlice';
import { toast } from 'react-toastify';
import { uploadImage } from 'api/storageApi';
const defaultImageURL = require('data/defaultImageURL.json')

const UserEditModal = ({className, isUserEditModalOpen, setIsUserEditModalOpen, setSelectedUser}) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const userId = user.uid
  const emptyError = "*此欄位不可為空白"
  const [userContent, setUserContent] = useState(user)
  const [formErrors, setFormErrors] = useState({})
  
  useEffect(()=>{
    const updatedErrors = {...formErrors}
    if(userContent?.displayName) updatedErrors.displayName = ""
    if(userContent?.birth) updatedErrors.birth = ""
    if(userContent?.profession) updatedErrors.profession = ""
    if(userContent?.region) updatedErrors.region = ""
    if(userContent?.introduction) updatedErrors.introduction = ""
    setFormErrors(updatedErrors)
  },[userContent])


  const closeModal = () => {
    setIsUserEditModalOpen(false);
    document.querySelector('body').classList.remove('no-scroll');
    document.querySelector('html').classList.remove('no-scroll');
  }

  const handleUpdate = async() => {
    const isFormComplete = 
      userContent?.displayName &&
      userContent?.birth &&
      userContent?.profession &&
      userContent?.region &&
      userContent?.introduction

    const newFormErrors = {}
    if(!userContent?.displayName) newFormErrors.displayName = emptyError
    if(!userContent?.birth) newFormErrors.birth = emptyError
    if(!userContent?.profession) newFormErrors.profession = emptyError
    if(!userContent?.region) newFormErrors.region = emptyError
    if(!userContent?.introduction) newFormErrors.introduction = emptyError 
    setFormErrors(newFormErrors)
    
    if(isFormComplete){
      if(userContent?.photoURLFile){
        const updatePhotoURL = await uploadImage("avatars",`${userId}-avatar`, userContent?.photoURLFile)
        delete userContent?.photoURLFile
        URL.revokeObjectURL(userContent?.photoURL)
        userContent.photoURL = updatePhotoURL
      } 
      if(userContent?.coverURLFile){
        const updateCoverURL = await uploadImage("user-covers",`${userId}-cover`,userContent?.coverURLFile)
        delete userContent?.coverURLFile
        URL.revokeObjectURL(userContent?.coverURL)
        userContent.coverURL = updateCoverURL
      } 

      const updateUserData = {...userContent}
      for(let contentKey in updateUserData){
        if(updateUserData?.[contentKey] === user?.[contentKey]) delete updateUserData?.[contentKey]
      }

      const { success } = await updateUser(userId, updateUserData)

      if(success){
        dispatch(updateUserSlice(userContent))
        setIsUserEditModalOpen(false)
        setSelectedUser(userContent)
        toast.success('更新資料成功', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }else{
        toast.error('更新資料失敗', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
    }
  }

  const handleCancel = () => {
    setUserContent(user)
    setIsUserEditModalOpen(false)
  }
  
  return(
    <Modal
      className={className}
      isOpen={isUserEditModalOpen}
      onRequestClose={closeModal}
      contentLabel="Activity Create Modal"
    >
      <div className='l-modal__header'>
        <h2 className='o-modal__title'>編輯使用者資料</h2>
        <CrossIcon className="o-modal__close-icon" onClick={closeModal}/>
      </div>

      <div className='l-modal__body'>
        <form className='l-modal__form-container scrollbar'>
          <div className='c-user-edit__image'>
            <StyledImageInput 
              className="o-user-edit__cover" 
              coverUsed
              title="使用者頭貼 / 封面照片"
              inputId="coverURL" 
              uploadFolder="user-covers"
              uploadFilename={`${userId}-cover`}
              defaultImgURL={defaultImageURL.userCover}
              formContent={userContent}
              onFormChange={setUserContent}
            />
            <StyledImageInput 
              className="o-user-edit__avatar" 
              avatarUsed
              inputId="photoURL" 
              uploadFolder="avatars"
              uploadFilename={`${userId}-avatar`}
              defaultImgURL={defaultImageURL.userAvatar}
              formContent={userContent}
              onFormChange={setUserContent}
            />
          </div>
          <StyledTextInput 
            title="使用者名稱" 
            inputId="displayName"
            placeholder="請輸入使用者名稱"
            wordLimit={16}
            formContent={userContent}
            onFormChange={setUserContent}
            warning={formErrors.displayName}
          />
          <StyledDateInput
            disableFuture={true}
            title="使用者生日" 
            inputId="birth" 
            formContent={userContent} 
            onFormChange={setUserContent}
            warning={formErrors.birth}
          />
          <StyledTextInput 
            title="使用者職業" 
            inputId="profession" 
            placeholder="請輸入使用者職業"
            wordLimit={16}
            formContent={userContent}
            onFormChange={setUserContent}
            warning={formErrors.profession}
          />
          <StyledTextInput 
            title="使用者地區" 
            inputId="region" 
            wordLimit={16}
            placeholder="請輸入居住地區"
            formContent={userContent}
            onFormChange={setUserContent}
            warning={formErrors.region}
          />
          <StyledTextArea
            title="使用者介紹" 
            inputId="introduction" 
            wordLimit={150}
            placeholder="請輸入自我介紹" 
            formContent={userContent} 
            onFormChange={setUserContent}
            warning={formErrors.introduction}
          />
        </form>
        <div className='c-user-edit__summit'>
          <StyledButton onClick={handleCancel} alert>取消更新</StyledButton>
          <StyledButton onClick={handleUpdate}>更新資料</StyledButton>
        </div>
      </div>

    </Modal>
  )
}

const StyledUserEditModal = styled(UserEditModal)`
  position: relative;
  width: 90vw;
  height: 100vh;
  max-width: 640px;
  max-height: calc(100vh - 8rem);
  margin: 5rem auto 0;
  border-radius: .5rem;
  background-color: ${({theme})=> theme.backgroundColor.default};
  padding: 1rem;

  .l-modal__form-container{
    width: 100%;
    height: calc(100% - 4.5rem);
    margin: .75rem 0;      
    display: flex;
    flex-direction: column;
    gap: .75rem;
    overflow-y: scroll;

    .c-user-edit__image{
      position: relative;
      margin-bottom: 1rem;

      .o-user-edit__avatar{
        position: absolute;
        left: .5rem;
        bottom: -1rem;
        z-index: 3;
      }
    }


  }

  .c-user-edit__summit{
    display: flex;
    gap: 1rem;
    padding-top: .5rem;
    margin-top: 1rem;
    border-top: 1px solid ${({theme})=> theme.backgroundColor.secondary};
  }

  @media screen and (min-width: 768px) {
    width: 50vw;
  }
`

export default StyledUserEditModal