import Modal from 'react-modal';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { accountUpdate, reAuth } from 'api/auth';

import StyledTextInput from 'components/inputs/StyledTextInput';
import StyledButton from 'components/StyledButton';
import StyledConfirmModal from './StyledConfirmModal';

import { ReactComponent as CrossIcon } from 'assets/icons/CrossIcon.svg';
import StyledLoading from 'components/StyledLoading';

const AccountUpdateModal = ({
  className,
  isAccountUpdateModalOpen,
  setIsAccountUpdateModalOpen,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation(['userPage', 'common']);
  const user = useSelector((state) => state.user);
  const userId = user.uid;
  const currentAccount = {
    displayName: user.displayName,
    email: user.email,
    newPassword: '',
    newPasswordCheck: '',
  };
  const confirmPasswordRef = useRef(null);
  const [accountContent, setAccountContent] = useState(currentAccount);
  const [passwordCheckError, setPasswordCheckError] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isAccountUpdateLoading, setIsAccountUpdateLoading] = useState(false);

  const closeModal = () => {
    setIsAccountUpdateModalOpen(false);
  };

  const handlePasswordCheckBlur = () => {
    if (accountContent?.newPasswordCheck !== accountContent?.newPassword) {
      setPasswordCheckError(t('passwordMismatch'));
    } else {
      setPasswordCheckError('');
    }
  };

  const handleAccountUpdate = () => {
    setIsConfirmModalOpen(true);
  };

  const handleUpdateConfirm = async () => {
    const currentPassword = confirmPasswordRef.current.value;
    const reAuthResult = await reAuth(currentPassword);

    if (reAuthResult.success) {
      setIsAccountUpdateLoading(true);
      const accountUpdateResult = await accountUpdate(
        userId,
        accountContent,
        currentAccount
      );
      setIsAccountUpdateLoading(false);

      if (accountUpdateResult.success) {
        toast.success(t('updateAccountSuccess'), {
          position: 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });

        setIsConfirmModalOpen(false);
        setIsAccountUpdateModalOpen(false);
        navigate('/login');
      } else {
        toast.error(t('updateAccountFail'), {
          position: 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } else {
      toast.error(t('wrongPassword'), {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  return (
    <Modal
      className={className}
      isOpen={isAccountUpdateModalOpen}
      onRequestClose={closeModal}
      contentLabel="Activity Create Modal"
    >
      <div className="l-modal__header">
        <h2 className="o-modal__title">{t('editAccount')}</h2>
        <CrossIcon className="o-modal__close-icon" onClick={closeModal} />
      </div>

      <div className="l-modal__body">
        <form className="l-modal__form-container scrollbar">
          <StyledTextInput
            title={t('name')}
            inputId="displayName"
            placeholder={t('namePlaceholder')}
            wordLimit={16}
            formContent={accountContent}
            onFormChange={setAccountContent}
          />
          <StyledTextInput
            title={t('email')}
            inputId="email"
            placeholder={t('emailPlaceholder')}
            formContent={accountContent}
            onFormChange={setAccountContent}
          />
          <StyledTextInput
            password
            title={t('resetPassword')}
            inputId="newPassword"
            placeholder={t('newPasswordPlaceholder')}
            wordLimit={16}
            formContent={accountContent}
            onFormChange={setAccountContent}
          />
          <StyledTextInput
            password
            title={t('confirmPassword')}
            inputId="newPasswordCheck"
            placeholder={t('confirmPasswordPlaceholder')}
            wordLimit={16}
            formContent={accountContent}
            onFormChange={setAccountContent}
            onBlur={handlePasswordCheckBlur}
            warning={passwordCheckError}
          />
        </form>
        <div className="c-account-setting__summit">
          <StyledButton alert>{t('cancelUpdate')}</StyledButton>
          <StyledButton
            onClick={handleAccountUpdate}
            disabled={
              accountContent?.newPassword?.length > 0 &&
              accountContent?.newPasswordCheck !== accountContent?.newPassword
            }
          >
            {t('updateAccount')}
          </StyledButton>

          <StyledConfirmModal
            title={t('updateAccount')}
            isConfirmModalOpen={isConfirmModalOpen}
            setIsConfirmModalOpen={setIsConfirmModalOpen}
            handleConfirmClick={handleUpdateConfirm}
          >
            {isAccountUpdateLoading ? (
              <StyledLoading title={t('updatingAccount')} />
            ) : (
              <>
                <p>{t('confirmUpdatePassword')}</p>
                <input type="password" ref={confirmPasswordRef} />
                <h5>{t('updateWarning')}</h5>
              </>
            )}
          </StyledConfirmModal>
        </div>
      </div>
    </Modal>
  );
};

const StyledAccountUpdateModal = styled(AccountUpdateModal)`
  .l-modal__form-container {
    width: 100%;
    height: calc(100% - 4.5rem);
    margin: 0.75rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    overflow-y: scroll;

    .o-user-edit__cover {
      margin-bottom: 1rem;
    }

    .o-user-edit__avatar {
      position: absolute;
      top: 10rem;
      left: 1rem;
      z-index: 3;
    }
  }

  .c-account-setting__summit {
    display: flex;
    gap: 1rem;
    padding-top: 0.5rem;
    margin-top: 1rem;
    border-top: 1px solid ${({ theme }) => theme.backgroundColor.secondary};
  }

  @media screen and (min-width: 768px) {
    width: 50vw;
  }
`;

export default StyledAccountUpdateModal;
