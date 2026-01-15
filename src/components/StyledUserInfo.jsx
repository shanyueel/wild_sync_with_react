import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';

const UserInfo = ({ className, user, cardUsed, message }) => {
  const { t } = useTranslation('common');
  const calculateAge = (birthTimeStamp) => {
    const currentTimeStamp = Date.now();
    const age = Math.floor(
      (currentTimeStamp - birthTimeStamp) / (1000 * 60 * 60 * 24 * 365.25)
    );
    return age;
  };

  return (
    <div className={className}>
      <Link to={`/user/${user?.uid}`}>
        <img className="o-user-avatar" src={user?.photoURL} alt="avatar" />
      </Link>
      <div className="c-user-info">
        <Link to={`/user/${user?.uid}`}>
          <h2 className="o-user-info__name">
            <span>{user?.displayName}</span>
            <span className="o-user-info__profession">{user?.profession}</span>
          </h2>
        </Link>
        <h4 className="o-user-info__time">{t('threeHoursAgo')}</h4>
        <div className="c-user-info__brief">
          <h4 className="o-user-info__region">{user?.region}</h4>
          <h4 className="o-user-info__age">
            {calculateAge(user?.birth)}
            {t('ageSuffix')}
          </h4>
        </div>
      </div>
    </div>
  );
};

const StyledUserInfo = styled(UserInfo)`
  display: flex;
  align-items: center;

  .o-user-avatar {
    width: 3rem;
    height: 3rem;
    background-color: ${({ theme }) => theme.color.default};
    border-radius: 50%;
    border: 5px solid ${({ theme }) => theme.color.default};

    &:not([src]) {
      font-size: 0;
      position: relative;
    }

    &:not([src])::after {
      font-size: 18px;
      border: 1px solid black;
      box-sizing: border-box;
      content: attr(alt);
      z-index: -1;
      height: 3rem;
      width: 3rem;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .c-user-info {
    margin-left: 0.75rem;
    height: 2.25rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h2,
    h4 {
      width: 100%;
      text-align: flex-start;
    }

    .o-user-info__name {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: ${({ theme }) => theme.color.default};
    }

    .o-user-info__profession {
      font-size: 0.875rem;
      color: ${({ theme }) => theme.color.grey};
      font-weight: 500;
    }

    .c-user-info__brief {
      display: flex;
      gap: 0.5rem;

      h4 {
        position: relative;
        color: ${({ theme }) => theme.color.grey};
        font-weight: 400;
        white-space: nowrap;

        &:after {
          content: '-';
          position: absolute;
          left: calc(100% + 0.25rem);
          transform: translate(-50%, 0);
        }

        &:last-child::after {
          display: none;
        }
      }
    }

    .o-user-info__time {
      display: none;
    }
  }

  ${(props) =>
    props.message &&
    css`
      .c-user-info {
        .c-user-info__brief {
          display: none;
        }

        .o-user-info__time {
          display: block;
          color: ${({ theme }) => theme.color.grey};
          font-weight: 500;
        }
      }
    `}

  ${(props) =>
    props.cardUsed &&
    css`
      flex-direction: column;
      text-align: center;
      align-items: center;

      .o-user-avatar {
        width: 3.5rem;
        height: 3.5rem;
        border: 5px solid ${({ theme }) => theme.color.default};
        overflow: hidden;
      }

      .c-user-info {
        margin-left: 0;
        height: auto;

        .o-user-info__name {
          flex-direction: column;
        }

        .c-user-info__brief {
          display: flex;
          flex-direction: column-reverse;
          gap: 0.25rem;
          margin-top: 0.5rem;

          h4:nth-child(2)::after {
            display: none;
          }

          .o-user-info__region {
            display: none;
          }
        }
      }
    `}
`;

export default StyledUserInfo;
