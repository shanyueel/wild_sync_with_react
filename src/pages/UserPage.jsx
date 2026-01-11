import clsx from 'clsx';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getPopularUsersList, getUser } from 'api/userApi';
import { getActivitiesByIdList } from 'api/activityApi';
import { calculateAge } from 'utils/date-fns';

import StyledButton from 'components/StyledButton';
import StyledActivityListItem from 'components/StyledActivityListItem';
import StyledUserCard from 'components/StyledUserCard';
import StyledUserEditModal from 'modals/StyledUserEditModal';
import StyledLoading from 'components/StyledLoading';

const UserPage = ({ className }) => {
  const { t } = useTranslation('userPage');
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const environmentParams = useSelector((state) => state.environment);
  const userId = user.uid;
  const selectedUserId = useParams().userId;
  const windowSize = environmentParams.windowSize;
  const [isUserEditModalOpen, setIsUserEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [isLargeLayout, setIsLargeLayout] = useState(false);
  const [popularUsers, setPopularUsers] = useState([]);
  const [isPopularUsersLoading, setIsPopularUsersLoading] = useState(true);
  const [selectedActivityNav, setSelectedActivityNav] =
    useState('attendedActivities');
  const [activities, setActivities] = useState([]);
  const [isActivitiesLoading, setIsActivitiesLoading] = useState(true);

  useEffect(() => {
    const setWindowSize = () => {
      setIsLargeLayout(windowSize === 'large');
    };
    setWindowSize();
  }, [windowSize]);

  useEffect(() => {
    const getSelectedUser = async (id) => {
      const user = await getUser(id);
      if (user) {
        setSelectedUser(user);
      } else {
        navigate('/*');
      }
    };
    const getPopularUsers = async () => {
      setIsPopularUsersLoading(true);
      const popularUsersList = await getPopularUsersList();
      setPopularUsers(popularUsersList);
      setIsPopularUsersLoading(false);
    };
    getSelectedUser(selectedUserId);
    getPopularUsers();
  }, [selectedUserId, navigate]);

  useEffect(() => {
    const getActivities = async () => {
      setIsActivitiesLoading(true);
      const selectedActivities = await getActivitiesByIdList(
        selectedUser?.[selectedActivityNav]
      );
      setActivities(selectedActivities);
      setIsActivitiesLoading(false);
    };
    getActivities();
  }, [selectedUser, selectedActivityNav]);

  const handleUserEdit = () => {
    setIsUserEditModalOpen(true);
    document.querySelector('body').classList.add('no-scroll');
    document.querySelector('html').classList.add('no-scroll');
  };

  const handleActivitiesChange = (e) => {
    setSelectedActivityNav(e.target.id);
  };

  return (
    <div className={className}>
      <div className="l-web-container__main l-user">
        <div className="l-user__image">
          <img
            className="o-user__cover"
            src={selectedUser?.coverURL}
            alt="user-cover"
          />
          <img
            className="o-user__avatar"
            src={selectedUser?.photoURL}
            alt="user-avatar"
          />
        </div>
        <div className="l-user__info">
          <div className="l-user__title">
            <h1 className="o-user__name">{selectedUser?.displayName}</h1>
            <h3 className="o-user__email">{selectedUser?.email}</h3>
          </div>
          <div className="l-user__brief">
            <h3 className="o-user__region">{selectedUser?.region}</h3>
            {selectedUser?.birth && (
              <h3 className="o-user__age">
                {t('age', { val: calculateAge(selectedUser?.birth) })}
              </h3>
            )}
            <h3 className="o-user__profession">{selectedUser?.profession}</h3>
          </div>
          <p className="o-user__introduction">{selectedUser?.introduction}</p>
          {selectedUserId === userId && (
            <>
              <StyledButton
                className="o-user__edit"
                onClick={handleUserEdit}
                outlined
              >
                {t('updateProfile')}
              </StyledButton>
              <StyledUserEditModal
                isUserEditModalOpen={isUserEditModalOpen}
                setIsUserEditModalOpen={setIsUserEditModalOpen}
                setSelectedUser={setSelectedUser}
              />
            </>
          )}
        </div>

        <div className="l-user-activities">
          <div className="l-user-activities__navbar">
            <label
              htmlFor="attendedActivities"
              className="o-user-activities__nav-item"
              onChange={handleActivitiesChange}
            >
              <input
                type="radio"
                name="user-activities"
                id="attendedActivities"
                defaultChecked
              />
              {t('attendedActivities')}
            </label>
            <label
              htmlFor="likedActivities"
              className="o-user-activities__nav-item"
              onChange={handleActivitiesChange}
            >
              <input type="radio" name="user-activities" id="likedActivities" />
              {t('likedActivities')}
            </label>
            <label
              htmlFor="heldActivities"
              className="o-user-activities__nav-item"
              onChange={handleActivitiesChange}
            >
              <input type="radio" name="user-activities" id="heldActivities" />
              {t('heldActivities')}
            </label>
          </div>

          <div className="l-user-activities__container">
            {isActivitiesLoading ? (
              <StyledLoading title={t('loadingActivities')} white />
            ) : activities?.length > 0 ? (
              activities?.map((activity) => (
                <StyledActivityListItem
                  key={activity?.id}
                  activity={activity}
                />
              ))
            ) : (
              <h2 className="o-user-activities__empty">
                {t('noActivitiesFound')}
              </h2>
            )}
          </div>
        </div>
      </div>

      <div className="l-web-container__side l-holder-recommendation">
        <h2 className="o-holder-recommendation__title">{t('popularHosts')}</h2>
        <div
          className={clsx('l-holder-recommendation__container', {
            'scrollbar-x': !isLargeLayout,
          })}
        >
          <div className="l-holder-recommendation__holders">
            {isPopularUsersLoading ? (
              <StyledLoading title={t('loadingUsers')} />
            ) : (
              popularUsers &&
              popularUsers?.map((user) => (
                <StyledUserCard
                  key={user?.uid}
                  user={user}
                  listItem={isLargeLayout}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StyledUserPage = styled(UserPage)`
  width: 100%;
  height: 100%;

  .l-user {
    padding-top: calc(100vw * 9 / 16 + 3rem);

    .l-user__image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      padding-bottom: 2rem;

      .o-user__cover {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
      }

      .o-user__avatar {
        position: absolute;
        bottom: 0;
        left: 1.5rem;
        width: 7.5rem;
        height: 7.5rem;
        border-radius: 50%;
        border: 10px solid ${({ theme }) => theme.color.default};
        z-index: 1;
      }
    }

    .l-user__info {
      position: relative;
      padding: 0 1rem;

      .l-user__brief {
        position: relative;
        margin-top: 0.5rem;
        display: flex;
        gap: 1rem;

        h3 {
          color: ${({ theme }) => theme.color.grey};
        }

        h3::after {
          content: '';
          position: absolute;
          margin-left: 0.35rem;
          width: 5px;
          height: 1.5px;
          background-color: ${({ theme }) => theme.color.grey};
          top: 50%;
          transform: translate(0, -50%);
        }

        h3:last-child::after {
          display: none;
        }
      }
    }

    .o-user {
      &__name,
      &__email {
        color: ${({ theme }) => theme.color.default};
      }

      &__email {
        margin-top: 0.25rem;
      }

      &__introduction {
        margin-top: 1rem;
      }

      &__edit {
        position: absolute;
        width: 30%;
        top: 0;
        right: 1rem;
      }
    }

    .l-user-activities {
      &__navbar {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.25rem;
        margin-top: 2rem;

        .o-user-activities__nav-item {
          position: relative;
          height: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          font-weight: 700;
          border-radius: 0.5rem 0.5rem 0 0;
          color: ${({ theme }) => theme.color.default};
          background-color: ${({ theme }) => theme.backgroundColor.default};
          cursor: pointer;

          input {
            display: none;
          }

          label {
          }

          &:has(input:checked) {
            background-color: ${({ theme }) => theme.color.default};
            color: white;

            &::after {
              position: absolute;
              content: '';
              background-color: ${({ theme }) => theme.color.default};
              width: 100%;
              height: 1rem;
              top: 2.75rem;
              left: 0;
              right: 0;
            }
          }
        }
      }

      &__container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;
        margin-top: 0.5rem;
        padding: 1rem 0.75rem;
        background-color: ${({ theme }) => theme.color.default};
        margin-bottom: 5rem;
        border-radius: 0 0 0.5rem 0.5rem;

        .o-user-activities__empty {
          color: white;
          margin: 2.5rem;
        }
      }
    }
  }

  .l-web-container__side {
    margin-bottom: 3rem;

    .o-holder-recommendation__title {
      color: ${({ theme }) => theme.color.default};
      font-weight: 700;
    }

    .l-holder-recommendation__container {
      margin-top: 1rem;

      .l-holder-recommendation__holders {
        display: flex;
        width: fit-content;
        gap: 0.75rem;
      }
    }
  }

  @media screen and (min-width: 768px) {
    .l-user {
      padding-top: calc(100vw * 9 / 21 + 3rem);

      .l-user__image {
        .o-user__cover {
          aspect-ratio: 21 / 9;
        }

        .o-user__avatar {
          width: 9rem;
          height: 9rem;
        }
      }
    }
  }

  @media screen and (min-width: 1024px) {
    display: flex;
    justify-content: space-between;

    .l-user {
      padding-top: 0;

      .l-user__image {
        position: relative;

        .o-user__cover {
          aspect-ratio: 32 / 9;
        }
      }

      .l-user__info {
        margin-top: 1rem;
      }
    }

    .l-holder-recommendation__container {
      .l-holder-recommendation__holders {
        flex-direction: column;
        align-items: center;
      }
    }
  }
`;

export default StyledUserPage;
