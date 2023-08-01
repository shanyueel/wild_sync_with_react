import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import styled from "styled-components";

import StyledImageInput from 'components/inputs/StyledImageInput';
import StyledTextInput from 'components/inputs/StyledTextInput';
import StyledDateInput from 'components/inputs/StyledDateInput';
import StyledTextArea from 'components/inputs/StyledTextArea';
import StyledButton from 'components/StyledButton';

import {ReactComponent as CrossIcon} from "assets/icons/CrossIcon.svg"
import { updateUser} from 'api/api';
import { updateUserSlice } from 'reducers/userSlice';
import { toast } from 'react-toastify';

const UserEditModal = ({className, isUserEditModalOpen, setIsUserEditModalOpen}) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const uid = user.uid
  const [userContent, setUserContent] = useState(user)


  const closeModal = () => {
    setIsUserEditModalOpen(false);
    document.querySelector('body').classList.remove('no-scroll');
    document.querySelector('html').classList.remove('no-scroll');
  }

  const handleUpdate = async() => {
    console.log(userContent)
    const newUser = await updateUser(uid, userContent)

    if(newUser){
      dispatch(updateUserSlice(newUser))
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
      setTimeout(()=>{
        setIsUserEditModalOpen(false)
      },1500)
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
              uploadFilename={`${uid}-cover`}
              defaultImgURL="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/covers%2Fdefault-cover.jpg?alt=media&token=9e44c402-706b-4b36-9b27-0d659f52f119"
              formContent={userContent}
              onFormChange={setUserContent}
            />
            <StyledImageInput 
              className="o-user-edit__avatar" 
              avatarUsed
              inputId="photoURL" 
              uploadFolder="avatars"
              uploadFilename={`${uid}-avatar`}
              defaultImgURL="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/avatars%2Fdefault-avatar.png?alt=media&token=d993930e-be86-4f46-9dec-5cec25dd3f4c"
              formContent={userContent}
              onFormChange={setUserContent}
            />
          </div>
          <StyledTextInput 
            title="使用者名稱*" 
            placeholder="請輸入使用者名稱"
            inputId="displayName" 
            formContent={userContent}
            onFormChange={setUserContent}
          />
          <StyledDateInput
            disableFuture={true}
            title="使用者生日" 
            inputId="birth" 
            formContent={userContent} 
            onFormChange={setUserContent}
          />
          <StyledTextInput 
            title="使用者職業" 
            placeholder="請輸入使用者職業"
            inputId="profession" 
            formContent={userContent}
            onFormChange={setUserContent}
          />
          <StyledTextInput 
            title="使用者地區" 
            placeholder="請輸入居住地區"
            inputId="region" 
            formContent={userContent}
            onFormChange={setUserContent}
          />
          <StyledTextArea
            title="使用者介紹" 
            placeholder="請輸入自我介紹" 
            inputId="introduction" 
            formContent={userContent} 
            onFormChange={setUserContent}
          />
        </form>
        <div className='c-user-edit__summit'>
          <StyledButton  alert>取消更新</StyledButton>
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