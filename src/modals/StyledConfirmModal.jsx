import Modal from 'react-modal';
import styled from "styled-components";

import StyledButton from 'components/StyledButton';

const ConfirmModal = ({className, title, content, isConfirmModalOpen, setIsConfirmModalOpen, handleConfirmClick}) => {

  const closeModal = () => {
    setIsConfirmModalOpen(false);
  }
  
  return(
    <Modal
      className={className}
      isOpen={isConfirmModalOpen}
      onRequestClose={closeModal}
      contentLabel="Activity Create Modal"
    >
      <div className='l-modal__header'>
        <h2 className='o-modal__title'>{title}</h2>
      </div>

      <div className='l-modal__body'>
        <p className='o-modal__content'>{content}</p>
        <div className='l-modal__controls'>
          <StyledButton onClick={closeModal}>取消</StyledButton>
          <StyledButton alert onClick={handleConfirmClick}>確認</StyledButton>
        </div>
      </div>

    </Modal>
  )
}

const StyledConfirmModal = styled(ConfirmModal)`
  position: fixed;
  top: 40%;
  left: 50%;
  width: 65vw;
  max-width: 320px;
  height: 25vh;
  transform: translate(-50%,-50%);

  .l-modal__body{
    display: flex;
    flex-direction: column;
    .o-modal__content{
      display: flex;
      align-items: center;
      justify-content: center;
      flex-grow: 1;
      padding-top: 1rem;
    }
  }
`

export default StyledConfirmModal