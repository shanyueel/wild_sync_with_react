import styled from 'styled-components';

import StyledTextInput from 'components/inputs/StyledTextInput';
import StyledButton from 'components/StyledButton';
import StyledTextLink from 'components/StyledTextLink';

import { ReactComponent as WildSyncLogo } from 'assets/icons/WildSyncLogo.svg';
import RegisterImage from 'assets/images/loginImage.png';
import { useEffect, useState } from 'react';
import { register } from 'api/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { buildUser } from 'api/userApi';

const RegisterPage = ({ className }) => {
  const navigate = useNavigate();
  const emptyError = '*此欄位不可為空白';
  const [registerContent, setRegisterContent] = useState({});
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const updatedErrors = { ...formErrors };
    if (registerContent?.email) updatedErrors.coverURL = '';
    if (registerContent?.displayName) updatedErrors.displayName = '';
    if (registerContent?.password) updatedErrors.password = '';
    if (registerContent?.passwordCheck) updatedErrors.passwordCheck = '';
    if (registerContent.passwordCheck === registerContent.password)
      updatedErrors.passwordCheck = '';
    setFormErrors(updatedErrors);
  }, [registerContent]);

  const handleRegister = async (e) => {
    e.preventDefault();

    const isRegisterComplete =
      registerContent?.email &&
      registerContent?.displayName &&
      registerContent?.password &&
      registerContent?.passwordCheck;

    const newFormErrors = {};
    if (!registerContent?.email) newFormErrors.email = emptyError;
    if (!registerContent?.displayName) newFormErrors.displayName = emptyError;
    if (!registerContent?.password) newFormErrors.password = emptyError;
    if (!registerContent?.passwordCheck)
      newFormErrors.passwordCheck = emptyError;
    setFormErrors(newFormErrors);

    if (isRegisterComplete) {
      if (registerContent.passwordCheck !== registerContent.password) {
        setFormErrors({ ...formErrors, passwordCheck: '兩次密碼不相同' });
        return;
      }

      const { uid } = await register({
        email: registerContent.email,
        displayName: registerContent.displayName,
        password: registerContent.password,
      });

      const { success } = await buildUser(uid, {
        email: registerContent.email,
        displayName: registerContent.displayName,
        password: registerContent.password,
      });

      if (success) {
        toast.success('註冊成功', {
          position: 'top-right',
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });

        setTimeout(() => {
          navigate(`/`);
        }, 1500);
      } else {
        toast.error('註冊失敗，請重新嘗試', {
          position: 'top-right',
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    }
  };

  return (
    <div className={className}>
      <div className="l-register-area__main">
        <div className="l-register-area__title">
          <WildSyncLogo className="o-register-area__logo" />
          <h1 className="o-register-area__brand">Wild Sync</h1>
        </div>
        <form className="l-register-area__input">
          <StyledTextInput
            title="設定信箱"
            inputId="email"
            placeholder="請輸入信箱"
            formContent={registerContent}
            onFormChange={setRegisterContent}
            warning={formErrors.email}
          />
          <StyledTextInput
            title="設定暱稱"
            inputId="displayName"
            placeholder="請輸入暱稱"
            wordLimit={16}
            formContent={registerContent}
            onFormChange={setRegisterContent}
            warning={formErrors.displayName}
          />
          <StyledTextInput
            password
            title="設定密碼"
            inputId="password"
            placeholder="請輸入密碼"
            wordLimit={16}
            formContent={registerContent}
            onFormChange={setRegisterContent}
            warning={formErrors.password}
          />
          <StyledTextInput
            title="確認密碼"
            inputId="passwordCheck"
            placeholder="請再次輸入密碼"
            wordLimit={16}
            formContent={registerContent}
            onFormChange={setRegisterContent}
            warning={formErrors.passwordCheck}
            password
          />
          <StyledButton
            className="o-register-area__button"
            onClick={handleRegister}
          >
            註冊
          </StyledButton>
          <StyledTextLink
            sm
            className="o-register-area__register-link"
            text="已經是Wild Sync會員?"
            destination="/login"
          />
        </form>
      </div>
      <div className="l-register-area__image"></div>
    </div>
  );
};

const StyledRegisterPage = styled(RegisterPage)`
  position: relative;
  bottom: 1rem;
  width: 90%;
  border-radius: 0.5rem;

  .l-register-area__main {
    padding: 0 1rem;
    margin-top: 4rem;

    .l-register-area__title {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 2.5rem;

      .o-register-area__logo {
        width: 8rem;
        fill: ${({ theme }) => theme.color.default};
      }
      .o-register-area__brand {
        margin-top: 1rem;
        font-size: 2rem;
        color: ${({ theme }) => theme.color.default};
      }
    }

    .l-register-area__input {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.75rem;

      .o-register-area__button {
        margin-top: 1.5rem;
      }

      .o-register-area__register-link {
        margin-top: 1.5rem;
        line-height: 2rem;
        color: ${({ theme }) => theme.color.default};
        text-decoration: underline;
      }
    }
  }

  .l-register-area__image {
    display: none;
  }

  @media screen and (min-width: 768px) {
    display: flex;
    width: 80%;
    max-width: 1120px;
    margin: 4rem auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
    background-color: ${({ theme }) => theme.backgroundColor.default};

    .l-register-area__main {
      width: 45%;
      padding: 0 2.5rem;

      .l-register-area__title {
        margin: 3.5rem 0 2.5rem;
      }

      .l-register-area__input {
        margin-bottom: 3.5rem;
      }
    }

    .l-register-area__image {
      display: block;
      width: 55%;
      border-radius: 0 0.5rem 0.5rem 0;
      background-image: url(${RegisterImage});
      background-size: cover;
      background-position: center;
    }
  }

  @media screen and (min-width: 1400px) {
    width: 70%;
  }
`;

export default StyledRegisterPage;
