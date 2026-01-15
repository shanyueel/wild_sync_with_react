import styled, { css } from 'styled-components';
import StyledUserInfo from './StyledUserInfo';
import StyledButton from './StyledButton';

import { ReactComponent as CrossIcon } from 'assets/icons/CrossIcon.svg';
import { useEffect, useState } from 'react';
import StyledConfirmModal from 'modals/StyledConfirmModal';
import { removeAttendance } from 'api/activityApi';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const UserCard = ({
  className,
  activity,
  setActivity,
  user,
  holderUsed,
  listItem,
  isHolder,
}) => {
  const { t } = useTranslation('common');
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
      toast.success(t('removeParticipantSuccess'), {
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
      toast.error(t('removeParticipantFail'), {
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
      <StyledUserInfo
        className="o-user-card__info"
        cardUsed={!listItem}
        user={user}
      />
      <p className="o-user-card__introduction">{user?.introduction}</p>
      {holderUsed && <div className="o-user-card__holder-display">HOST</div>}
      {isHolder && (
        <StyledButton
          sm
          alert
          className="o-user-card__remove-attendance"
          onClick={handleRemoveBtnClick}
        >
          <CrossIcon />
          {t('remove')}
        </StyledButton>
      )}
      <StyledConfirmModal
        title={t('removeParticipant')}
        isConfirmModalOpen={isRemoveConfirmModalOpen}
        setIsConfirmModalOpen={setIsRemoveConfirmModalOpen}
        handleConfirmClick={handleRemoveConfirmClick}
      >
        {t('confirmRemoveParticipant', { name: user?.displayName })}
      </StyledConfirmModal>
    </div>
  );
};

const StyledUserCard = styled(UserCard)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 12rem;
  height: 16.5rem;
  padding: 1rem 0.75rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.backgroundColor.default};

  .o-user-card__info {
    align-self: start;
    margin: auto;
  }

  .o-user-card__introduction {
    flex: 1;
    display: -webkit-box;
    margin-top: 0.75em;
    line-height: 1.25rem;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
    white-space: normal;
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

  @media screen and (min-width: 1024px) {
    .o-user-card__info {
      align-self: start;
    }

    .o-user-card__introduction {
      -webkit-line-clamp: 2;
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
