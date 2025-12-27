import StyledButton from 'components/StyledButton';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import notFoundImage from 'assets/images/notFoundPageImage.jpg';

const NotFoundPage = ({ className }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/');
  };

  return (
    <div className={className}>
      <img src={notFoundImage} alt="not found"></img>
      <h2>找不到此頁面</h2>
      <StyledButton className="o-not-found__button" onClick={handleButtonClick}>
        返回首頁
      </StyledButton>
    </div>
  );
};

const StyledNotFoundPage = styled(NotFoundPage)`
  position: absolute;
  top: 45vh;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
  transform: translate(-50%, -50%);

  img {
    width: 100%;
  }

  h2 {
    color: ${({ theme }) => theme.color.default};
    margin: 1rem 0 2.5rem;
    letter-spacing: 0.5rem;
    font-weight: 700;
  }

  @media screen and (min-width: 768px) {
    width: 50%;
  }

  @media screen and (min-width: 1200px) {
    width: 35%;
  }
`;

export default StyledNotFoundPage;
