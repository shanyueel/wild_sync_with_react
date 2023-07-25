import Modal from 'react-modal';
import styled from "styled-components";

import {ReactComponent as CrossIcon} from "assets/icons/CrossIcon.svg"
import { useState } from 'react';
import { useSelector } from 'react-redux';
import StyledTextInput from 'components/inputs/StyledTextInput';
import StyledButton from 'components/StyledButton';

const AccountSettingModal = ({className, isAccountSettingModalOpen, setIsAccountSettingModalOpen}) => {
  const user = useSelector(state => state.user)
  const [accountContent, setAccountContent] = useState(user)

  const closeModal = () => {
    setIsAccountSettingModalOpen(false);
    document.querySelector('body').classList.remove('no-scroll');
    document.querySelector('html').classList.remove('no-scroll');
  }
  
  return(
    <Modal
      className={className}
      isOpen={isAccountSettingModalOpen}
      onRequestClose={closeModal}
      contentLabel="Activity Create Modal"
    >
      <div className='l-modal__header'>
        <h2 className='o-modal__title'>編輯使用者資料</h2>
        <CrossIcon className="o-modal__close-icon" onClick={closeModal}/>
      </div>

      <div className='l-modal__body'>
        <form className='l-modal__form-container scrollbar'>
          <StyledTextInput 
            title="使用者名稱*" 
            placeholder="請輸入使用者名稱"
            inputId="displayName" 
            formContent={accountContent}
            onFormChange={setAccountContent}
          />
          <StyledTextInput 
            title="使用者信箱*" 
            placeholder="請輸入使用者信箱"
            inputId="email" 
            formContent={accountContent}
            onFormChange={setAccountContent}
          />
          <StyledTextInput
            password
            title="重設使用者密碼" 
            placeholder="請輸入使用者信箱"
            inputId="password" 
            formContent={accountContent}
            onFormChange={setAccountContent}
          />
          <StyledTextInput 
            password
            title="確認使用者密碼" 
            placeholder="請輸入使用者信箱"
            inputId="passwordCheck" 
            formContent={accountContent}
            onFormChange={setAccountContent}
          />
        </form>
        <div className='c-user-edit__summit'>
          <StyledButton  alert>取消更新</StyledButton>
          <StyledButton >更新帳戶</StyledButton>
        </div>
      </div>

    </Modal>
  )
}

const StyledAccountSettingModal = styled(AccountSettingModal)`
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

    .o-user-edit__cover{
      margin-bottom: 1rem;
    }

    .o-user-edit__avatar{
      position: absolute;
      top: 10rem;
      left: 1rem;
      z-index: 3;
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

export default StyledAccountSettingModal