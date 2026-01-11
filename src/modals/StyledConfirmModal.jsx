import Modal from 'react-modal';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import StyledButton from 'components/StyledButton';

const ConfirmModal = ({
  className,
  title,
  children,
  isConfirmModalOpen,
  setIsConfirmModalOpen,
  handleConfirmClick,
}) => {
  const { t } = useTranslation('common');
  const closeModal = () => {
    setIsConfirmModalOpen(false);
  };

  return (
    <Modal
      className={className}
      isOpen={isConfirmModalOpen}
      onRequestClose={closeModal}
      contentLabel="Activity Create Modal"
    >
      <div className="l-modal__header">
        <h2 className="o-modal__title">{title}</h2>
      </div>

      <div className="l-modal__body">
        <div className="o-modal__content">{children}</div>
        <div className="l-modal__controls">
          <StyledButton onClick={closeModal}>{t('cancel')}</StyledButton>
          <StyledButton alert onClick={handleConfirmClick}>
            {t('confirm')}
          </StyledButton>
        </div>
      </div>
    </Modal>
  );
};

const StyledConfirmModal = styled(ConfirmModal)`
  position: fixed;
  top: 40%;
  left: 50%;
  width: 65vw;
  max-width: 320px;
  height: fit-content;
  transform: translate(-50%, -50%);

  .l-modal__body {
    display: flex;
    flex-direction: column;
    .o-modal__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-grow: 1;
      gap: 0.75rem;
      width: 75%;
      margin: 0 auto;
      padding-top: 1rem;
    }
  }
`;

export default StyledConfirmModal;
