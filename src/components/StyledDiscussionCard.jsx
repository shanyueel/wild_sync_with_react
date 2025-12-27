import styled from 'styled-components';

import StyledUserInfo from './StyledUserInfo';

import { ReactComponent as LikeIcon } from 'assets/icons/LikeIcon.svg';
import { ReactComponent as ReplyIcon } from 'assets/icons/ReplyIcon.svg';
import { Link } from 'react-router-dom';

const DiscussionCard = ({ className, message }) => {
  return (
    <div className={className}>
      <StyledUserInfo className="o-message-card__user-info" message />
      <Link to="chatroom/1">
        <p className="o-message-card__content">{message}</p>
      </Link>
      <div className="c-message-card__footer">
        <h3 className="o-message-card__like-count">
          <LikeIcon />
          12
        </h3>
        <h3 className="o-message-card__reply-count">
          <ReplyIcon />
          12
        </h3>
      </div>
    </div>
  );
};

const StyledDiscussionCard = styled(DiscussionCard)`
  padding: 0.75rem 1rem;
  width: 100%;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.2);
  background-color: ${({ theme }) => theme.backgroundColor.default};

  .o-message-card__content {
    margin-top: 0.75rem;
    line-height: 1.25rem;
  }

  .c-message-card__footer {
    margin-top: 0.75rem;
    display: flex;
    gap: 2rem;

    .o-message-card__like-count,
    .o-message-card__reply-count {
      display: flex;
      align-items: center;
      color: ${({ theme }) => theme.color.default};
      font-size: 0.75rem;
    }

    svg {
      height: 0.75rem;
      margin-right: 0.5rem;
      fill: ${({ theme }) => theme.color.default};
    }
  }
`;

export default StyledDiscussionCard;
