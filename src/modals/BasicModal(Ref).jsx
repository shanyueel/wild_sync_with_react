import Modal from 'react-modal';
import styled from "styled-components";

import {ReactComponent as CrossIcon} from "assets/icons/CrossIcon.svg"

const ActivityCreateModal = ({className, isActivityCreateModalOpen, setIsActivityCreateModalOpen}) => {


  const closeModal = () => {
    setIsActivityCreateModalOpen(false);
  }
  
  return(
    <Modal
      className={className}
      isOpen={isActivityCreateModalOpen}
      onRequestClose={closeModal}
      contentLabel="Activity Create Modal"
    >
      <div className='l-modal__header'>
        <h2 className='o-modal__title'>標題</h2>
        <CrossIcon className="o-modal__close-icon" onClick={closeModal}/>
      </div>

      <div className='l-modal__body'>

      </div>

    </Modal>
  )
}

const StyledActivityCreateModal = styled(ActivityCreateModal)`
  position: relative;
  width: 90vw;
  height: 100vh;
  max-width: 896px;
  max-height: calc(100vh - 6rem);
  margin: 5rem auto 0;
  border-radius: .5rem;
  background-color: ${({theme})=> theme.backgroundColor.default};
  padding: 1rem;

  @media screen and (min-width: 768px) {
    width: 80vw;
  }
`

export default StyledActivityCreateModal