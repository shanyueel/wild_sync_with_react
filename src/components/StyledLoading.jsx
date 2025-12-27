import styled, { css } from 'styled-components';
import loadingImg from 'assets/animations/Loading.gif';

const Loading = ({ className, title, white }) => {
  return (
    <div className={className}>
      <img className="o-loading__animation" src={loadingImg} alt="loading..." />
      <h3>{title}...</h3>
    </div>
  );
};

const StyledLoading = styled(Loading)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem;

  img {
    width: 2.5rem;
    height: 2.5rem;
    object-fit: cover;
  }

  h3 {
    color: ${({ theme }) => theme.color.default};
    font-weight: 700;
  }

  ${(props) =>
    props.white &&
    css`
      h3 {
        color: white;
      }
    `}
`;

export default StyledLoading;
