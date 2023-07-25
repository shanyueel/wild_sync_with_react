import Modal from 'react-modal';
import styled from "styled-components";

import {ReactComponent as CrossIcon} from "assets/icons/CrossIcon.svg"
import StyledImageInput from 'components/inputs/StyledImageInput';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import StyledTextInput from 'components/inputs/StyledTextInput';
import StyledAvatarInput from 'components/inputs/StyledAvatarInput';
import StyledDateInput from 'components/inputs/StyledDateInput';
import StyledTextArea from 'components/inputs/StyledTextArea';
import StyledButton from 'components/StyledButton';

const UserEditModal = ({className, isUserEditModalOpen, setIsUserEditModalOpen}) => {
  const user = useSelector(state => state.user)
  const [userContent, setUserContent] = useState(user)
  console.log(userContent)

  const closeModal = () => {
    setIsUserEditModalOpen(false);
    document.querySelector('body').classList.remove('no-scroll');
    document.querySelector('html').classList.remove('no-scroll');
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
            <StyledImageInput className="o-user-edit__cover" title="使用者頭貼 / 封面照片"/>
            <StyledAvatarInput className="o-user-edit__avatar"/>
          </div>
          <StyledTextInput 
            title="使用者名稱*" 
            placeholder="請輸入使用者名稱"
            inputId="displayName" 
            formContent={userContent}
            onFormChange={setUserContent}
          />
          <StyledTextInput 
            title="使用者信箱*" 
            placeholder="請輸入使用者信箱"
            inputId="email" 
            formContent={userContent}
            onFormChange={setUserContent}
          />
          <StyledDateInput
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
          <StyledButton >更新資料</StyledButton>
        </div>
      </div>

    </Modal>
  )
}

const StyledUserEditModal = styled(UserEditModal)`
  position: relative;
  width: 90vw;
  height: 100vh;
  max-width: 896px;
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

      .o-user-edit__cover{
        
      }

      .o-user-edit__avatar{
        position: absolute;
        bottom: -1rem;
        left: 1rem;
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