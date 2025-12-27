import styled, { css } from 'styled-components';
import StyledUserInfo from './StyledUserInfo';
import { sliceIntroduction } from 'utils/paragraph';
import StyledButton from './StyledButton';

import { ReactComponent as CrossIcon } from 'assets/icons/CrossIcon.svg';
import { useEffect, useState } from 'react';
import StyledConfirmModal from 'modals/StyledConfirmModal';
import { removeAttendance } from 'api/activityApi';
import { toast } from 'react-toastify';

const UserCard = ({
  className,
  activity,
  setActivity,
  user,
  holderUsed,
  listItem,
  isHolder,
}) => {
  const userId = user?.uid;
  const [isRemoveConfirmModalOpen, setIsRemoveConfirmModalOpen] =
    useState(false);

  useEffect(() => {
    if (isRemoveConfirmModalOpen) {
      document.querySelector('body').classList.add('no-scroll');
      document.querySelector('html').classList.add('no-scroll');
    } else {
      document.querySelector('body').classList.remove('no-scroll');
      document.querySelector('html').classList.remove('no-scroll');
    }
  }, [isRemoveConfirmModalOpen]);

  const handleRemoveBtnClick = () => {
    setIsRemoveConfirmModalOpen(true);
  };

  const handleRemoveConfirmClick = async () => {
    const { success, newAttendance } = await removeAttendance(activity, userId);
    setIsRemoveConfirmModalOpen(false);

    if (success) {
      const newActivity = {
        ...activity,
        attendance: newAttendance,
      };
      setActivity(newActivity);
      toast.success('移除參與者成功', {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else {
      toast.error('移除參與者失敗', {
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
    <div className={className}>
      <StyledUserInfo cardUsed={!listItem} user={user} />
      <p className="o-user-card__introduction">
        {sliceIntroduction(user?.introduction, listItem ? 50 : 30)}
      </p>
      {holderUsed && <div className="o-user-card__holder-display">HOST</div>}
      {isHolder && (
        <StyledButton
          sm
          alert
          className="o-user-card__remove-attendance"
          onClick={handleRemoveBtnClick}
        >
          <CrossIcon />
          移除
        </StyledButton>
      )}
      <StyledConfirmModal
        title="移除參與者"
        isConfirmModalOpen={isRemoveConfirmModalOpen}
        setIsConfirmModalOpen={setIsRemoveConfirmModalOpen}
        handleConfirmClick={handleRemoveConfirmClick}
      >
        確定要移除{user?.displayName}嗎?
      </StyledConfirmModal>
    </div>
  );
};

const StyledUserCard = styled(UserCard)`
  position: relative;
  width: 10rem;
  height: 14rem;
  padding: 1rem 0.75rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.backgroundColor.default};

  .o-user-card__introduction {
    margin-top: 0.5em;
    line-height: 1.25rem;
  }

  .o-user-card__remove-attendance {
    position: absolute;
    top: 1rem;
    right: 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;

    svg {
      height: 1rem;
      fill: white;
    }
  }

  ${(props) =>
    props.listItem &&
    css`
      width: 100%;
      height: fit-content;
      padding: 1rem 1.25rem;

      .o-user-card__holder-display {
        position: absolute;
        top: 1rem;
        right: 1.25rem;
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        border: 2px solid ${({ theme }) => theme.color.default};
        font-size: 0.75rem;
        font-weight: 700;
        color: ${({ theme }) => theme.color.default};
      }
    `}
`;

export default StyledUserCard;
