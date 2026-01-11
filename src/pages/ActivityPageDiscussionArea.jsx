import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import StyledUserInfo from 'components/StyledUserInfo';

import { ReactComponent as ReturnIcon } from 'assets/icons/ReturnIcon.svg';
import { ReactComponent as HeartIcon } from 'assets/icons/HeartIcon.svg';
import StyledMessage from 'components/StyledMessage';
import StyledButton from 'components/StyledButton';

const ActivityPageDiscussionArea = ({ className }) => {
  const { t } = useTranslation('activityPage');
  const handleReturn = () => {
    window.history.back();
  };

  return (
    <div className={className}>
      <div className="l-activity-discussion__header">
        <ReturnIcon
          className="o-activity-discussion__return-icon"
          onClick={handleReturn}
        />
        <h2 className="o-activity-discussion__title">
          {t('discussion.chatRoom')}
        </h2>
      </div>
      <div className="l-activity-discussion__body">
        <StyledUserInfo className="c-activity-discussion__user-info" />
        <div className="c-activity-discussion__favorite">
          <input type="checkbox" id="discussion__favorite" />
          <label htmlFor="discussion__favorite">
            <HeartIcon />
          </label>
        </div>
        <p className="o-activity-discussion__content">
          {t('discussion.accommodationNotice')}
        </p>
        <div className="l-activity-discussion__chatroom scrollbar">
          <p className="o-activity-discussion__date-divide">
            <span>{t('discussion.date1')}</span>
          </p>
          <StyledMessage isSelf={false} />
          <StyledMessage isSelf={true} />
          <StyledMessage isSelf={true} />
          <p className="o-activity-discussion__date-divide">
            <span>{t('discussion.date2')}</span>
          </p>
          <StyledMessage isSelf={false} />
          <StyledMessage isSelf={true} />
          <p className="o-activity-discussion__date-divide">
            <span>{t('discussion.date1')}</span>
          </p>
          <StyledMessage isSelf={false} />
          <StyledMessage isSelf={true} />
          <StyledMessage isSelf={true} />
          <p className="o-activity-discussion__date-divide">
            <span>{t('discussion.date2')}</span>
          </p>
          <StyledMessage isSelf={false} />
          <StyledMessage isSelf={true} />
        </div>
        <div className="l-activity-discussion__chat-input">
          <textarea />
          <StyledButton>{t('send')}</StyledButton>
        </div>
      </div>
    </div>
  );
};

const StyledActivityPAgeDiscussionArea = styled(ActivityPageDiscussionArea)`
  width: 100%;
  height: 100%;

  .l-activity-discussion__header {
    display: flex;

    .o-activity-discussion__return-icon {
      height: 1.5rem;
      fill: ${({ theme }) => theme.color.default};
      cursor: pointer;
    }

    .o-activity-discussion__title {
      color: ${({ theme }) => theme.color.default};
      font-weight: 700;
      margin-left: 0.5rem;
    }
  }

  .l-activity-discussion__body {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
    height: calc(100vh - 10.5rem);
    overflow-y: scroll;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.backgroundColor.default};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.2);

    .c-activity-discussion__favorite {
      position: absolute;
      top: 0.75rem;
      right: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 50%;
      background-color: white;

      input {
        display: none;
      }

      label svg {
        width: 1.25rem;
        height: 1.25rem;
        fill: none;
        stroke: ${({ theme }) => theme.color.alert};
        stroke-width: 40;
        cursor: pointer;
      }

      &:has(input:checked) {
        label svg {
          fill: ${({ theme }) => theme.color.alert};
        }
      }
    }

    .o-activity-discussion__content {
      padding-bottom: 0.75rem;
      border-bottom: 1px solid grey;
      line-height: 1.25rem;
    }

    .l-activity-discussion__chatroom {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      overflow-y: scroll;
      height: auto;
      padding: 0.25rem;
      flex-grow: 1;

      .o-activity-discussion__date-divide {
        position: relative;
        font-size: 1rem;
        text-align: center;
        margin: 0.25rem 0;

        span {
          background-color: white;
          padding: 0 1rem;
          z-index: 1;
          border-radius: 0.75rem;
          color: ${({ theme }) => theme.color.default};
          font-weight: 500;
        }
      }
    }

    .l-activity-discussion__chat-input {
      textarea {
        width: 100%;
        resize: none;
        height: 5rem;
        font-size: 1rem;
        border-radius: 0.5rem;
        padding: 0.5rem;
      }

      button {
        margin-top: 0.5rem;
        height: 1.5rem;
        font-size: 0.75rem;
      }
    }
  }
`;

export default StyledActivityPAgeDiscussionArea;
