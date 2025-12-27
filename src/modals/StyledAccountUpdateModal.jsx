import Modal from 'react-modal';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
      setPasswordCheckError('兩次密碼不相同');
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
        toast.success('更新帳戶成功', {
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
        toast.error('更新帳戶失敗', {
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
      toast.error('密碼輸入錯誤', {
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
        <h2 className="o-modal__title">編輯帳戶資料</h2>
        <CrossIcon className="o-modal__close-icon" onClick={closeModal} />
      </div>

      <div className="l-modal__body">
        <form className="l-modal__form-container scrollbar">
          <StyledTextInput
            title="使用者名稱"
            inputId="displayName"
            placeholder="請輸入使用者名稱"
            wordLimit={16}
            formContent={accountContent}
            onFormChange={setAccountContent}
          />
          <StyledTextInput
            title="使用者信箱"
            inputId="email"
            placeholder="請輸入使用者信箱"
            formContent={accountContent}
            onFormChange={setAccountContent}
          />
          <StyledTextInput
            password
            title="重設使用者密碼"
            inputId="newPassword"
            placeholder="請輸入新的使用者密碼(16字數內)"
            wordLimit={16}
            formContent={accountContent}
            onFormChange={setAccountContent}
          />
          <StyledTextInput
            password
            title="確認使用者密碼"
            inputId="newPasswordCheck"
            placeholder="請確認新的使用者密碼"
            wordLimit={16}
            formContent={accountContent}
            onFormChange={setAccountContent}
            onBlur={handlePasswordCheckBlur}
            warning={passwordCheckError}
          />
        </form>
        <div className="c-account-setting__summit">
          <StyledButton alert>取消更新</StyledButton>
          <StyledButton
            onClick={handleAccountUpdate}
            disabled={
              accountContent?.newPassword?.length > 0 &&
              accountContent?.newPasswordCheck !== accountContent?.newPassword
            }
          >
            更新帳戶
          </StyledButton>

          <StyledConfirmModal
            title="更新帳戶"
            isConfirmModalOpen={isConfirmModalOpen}
            setIsConfirmModalOpen={setIsConfirmModalOpen}
            handleConfirmClick={handleUpdateConfirm}
          >
            {isAccountUpdateLoading ? (
              <StyledLoading title="帳戶更新中" />
            ) : (
              <>
                <p>請輸入原密碼以確認更新：</p>
                <input type="password" ref={confirmPasswordRef} />
                <h5>注意：更新後須重新登入</h5>
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
