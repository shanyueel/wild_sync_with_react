import styled from 'styled-components';

import StyledMessageCard from 'components/StyledDiscussionCard';
import StyledMessageReply from 'components/StyledDiscussionCreate';

import { ReactComponent as ReturnIcon } from 'assets/icons/ReturnIcon.svg';

const ActivityPageDiscussionListArea = ({ className }) => {
  return (
    <div className={className}>
      <div className="l-activity-discussion__header">
        <label htmlFor="activity-discussion">
          <ReturnIcon className="o-activity-discussion__return-icon" />
        </label>
        <h2 className="o-activity-discussion__title">活動討論串</h2>
      </div>

      <div className="l-activity-discussion-list__body scrollbar">
        <StyledMessageCard message="如有任何狀況請提前告知" />
        <StyledMessageCard message="器材準備事宜" />
        <StyledMessageCard message="活動備案討論" />
        <StyledMessageCard message="如有任何狀況請提前告知" />
        <StyledMessageCard message="器材準備事宜" />
        <StyledMessageCard message="活動備案討論" />
      </div>

      <div className="l-activity-discussion__footer">
        <hr />
        <StyledMessageReply className="o-activity-discussion__reply-input" />
      </div>

      <div className="l-activity-discussion__chatroom"></div>
    </div>
  );
};

const StyledActivityPageDiscussionListArea = styled(
  ActivityPageDiscussionListArea
)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

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

  .l-activity-discussion-list__body {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 0.5rem;
    margin-top: 1rem;
    overflow-y: scroll;
    padding: 0.25rem 0;
    border-radius: 0.5rem;
  }

  .l-activity-discussion__footer {
    hr {
      margin-bottom: 0.75rem;
    }

    .c-activity-discussion__reply-input {
      position: absolute;
      bottom: 0;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        width: 100%;
        height: 1px;
        background-color: red;
      }
    }
  }

  @media screen and (min-width: 1024px) {
    .l-activity-discussion__header {
      .o-activity-discussion__return-icon {
        display: none;
      }

      .o-activity-discussion__title {
        margin-left: 0;
      }
    }
  }
`;

export default StyledActivityPageDiscussionListArea;
