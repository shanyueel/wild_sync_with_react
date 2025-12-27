import styled from 'styled-components';
import { useEffect, useState } from 'react';

import { getUsersByIdList } from 'api/userApi';

import StyledUserCard from 'components/StyledUserCard';

import { ReactComponent as GroupIcon } from 'assets/icons/GroupIcon.svg';
import { ReactComponent as ReturnIcon } from 'assets/icons/ReturnIcon.svg';

const ActivityAttendance = ({
  className,
  activity,
  setActivity,
  isHolder,
  holder,
  attendance,
  isLargeLayout,
}) => {
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    const getAttendanceList = async () => {
      const userList = await getUsersByIdList(attendance);
      setAttendanceList(userList);
    };
    getAttendanceList();
  }, [attendance]);

  return (
    <div className={className}>
      {!isLargeLayout && (
        <div className="c-activity-attendance__icon">
          <input type="checkbox" id="activity-attendance" />
          <label htmlFor="activity-attendance">
            <GroupIcon />
          </label>
        </div>
      )}

      <div className="l-activity-attendance">
        <div className="l-activity-attendance__header">
          {!isLargeLayout && (
            <label htmlFor="activity-attendance">
              <ReturnIcon className="o-activity-discussion__return-icon" />
            </label>
          )}
          <h2 className="o-activity-attendance__title">活動參加者</h2>
        </div>
        <div className="l-activity-attendance__body scrollbar">
          <StyledUserCard listItem holderUsed user={holder} />
          {attendanceList &&
            attendanceList?.map((user) => (
              <StyledUserCard
                key={user?.uid}
                listItem
                activity={activity}
                setActivity={setActivity}
                user={user}
                isHolder={isHolder}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

const StyledActivityAttendance = styled(ActivityAttendance)`
  width: 100%;
  height: 100%;

  .c-activity-attendance__icon {
    position: fixed;
    bottom: 2.5rem;
    right: 2rem;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.color.default};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
    z-index: 1;

    input {
      display: none;
    }

    svg {
      fill: white;
      width: 2rem;
      height: 2rem;
      cursor: pointer;
    }

    &:has(input:checked) {
      display: none;

      & ~ .l-activity-attendance {
        display: flex;
        flex-direction: column;
      }
    }
  }

  .l-activity-attendance {
    display: none;
    position: fixed;
    top: 4rem;
    left: 0;
    bottom: 0;
    right: 0;
    margin-bottom: 3rem;
    background-color: rgb(255, 255, 255, 0.9);
    width: 100%;
    height: calc(100vh - 4rem);
    padding: 1rem 1rem 3rem;
    z-index: 1;

    .l-activity-attendance__header {
      display: flex;

      .o-activity-discussion__return-icon {
        height: 1.5rem;
        fill: ${({ theme }) => theme.color.default};
        cursor: pointer;
      }

      .o-activity-attendance__title {
        color: ${({ theme }) => theme.color.default};
        font-weight: 700;
        margin-left: 0.5rem;
      }
    }

    .l-activity-attendance__body {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      gap: 0.5rem;
      height: fit-content;
      margin: 1rem 1rem 0;
      overflow-y: scroll;
      padding: 0.25rem 0;
      border-radius: 0.5rem;
    }
  }

  @media screen and (min-width: 1024px) {
    .l-activity-attendance {
      padding: 0;
      display: block;
      position: static;
      height: calc(100vh - 10rem);

      .l-activity-attendance__body {
        margin: 1rem 0 0;
      }
    }
  }
`;

export default StyledActivityAttendance;
