import styled, { css } from 'styled-components';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { alterActivityLiked } from 'api/activityApi';
import { transferTimestamp } from 'utils/date-fns';
import { switchDifficulty } from 'utils/translation';
import { displayLocation } from 'utils/location';
import { sliceIntroduction } from 'utils/paragraph';

import { ReactComponent as HeartIcon } from 'assets/icons/HeartIcon.svg';
import { ReactComponent as LocationIcon } from 'assets/icons/LocationIcon.svg';
import { ReactComponent as CalendarIcon } from 'assets/icons/CalendarIcon.svg';
import { ReactComponent as CheckIcon } from 'assets/icons/CheckIcon.svg';

import defaultImageURL from 'data/defaultImageURL.json';

const ActivityListItem = ({ className, activity, sm }) => {
  const { t, i18n } = useTranslation(['common']);

  const user = useSelector((state) => state.user);
  const userId = user?.uid;
  const activityId = activity?.id;
  const [isActivityLiked, setIsActivityLiked] = useState(false);

  useEffect(() => {
    setIsActivityLiked(user?.likedActivities?.includes(activityId));
  }, [activityId, user]);

  const handleActivityLiked = async () => {
    if (!user.loggedIn) {
      toast.error(t('common:loginToLiked'), {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }

    const { success } = await alterActivityLiked(userId, activityId);
    setIsActivityLiked(!isActivityLiked);

    if (!isActivityLiked) {
      if (success) {
        toast.success(t('common:likedSuccessfully'), {
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
        toast.error(t('common:likedFailed'), {
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
    } else {
      if (success) {
        toast.success(t('common:removeSuccessfully'), {
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
        toast.error(t('common:removeFailed'), {
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
    }
  };

  return (
    <div className={className}>
      <div className="l-activity-card__info">
        <div className="l-activity-card__title">
          <Link
            className="o-activity-card__avatar"
            to={`/user/${activity?.holder?.uid}`}
          >
            <img src={activity?.holder?.photoURL} alt="user avatar" />
          </Link>
          <Link
            className="o-activity-card__name"
            to={`/activity/${activityId}`}
          >
            <h3>{activity?.name}</h3>
          </Link>
          {(user?.attendedActivities?.includes(activityId) ||
            user?.heldActivities?.includes(activityId)) && (
            <div className="o-activity-card__attendance">
              <CheckIcon />
              <h4>{t('common:joined')}</h4>
            </div>
          )}
        </div>

        <div className="c-activity-card__brief">
          <h4 className="o-activity-card__location">
            <LocationIcon />
            {displayLocation(activity?.location, t, i18n)}
          </h4>
          <h4 className="o-activity-card__date">
            <CalendarIcon />
            {transferTimestamp(activity?.time?.start)} - <br />
            {transferTimestamp(activity?.time?.end)}
          </h4>
        </div>

        <ul className="c-activity-card__highlights">
          <li>
            <span>{t('common:difficulty')} : </span>
            {switchDifficulty(activity?.difficulty)}
          </li>
          <li>
            <span>{t('common:timeLength')} : </span>
            {activity?.activityTimeLength} h
          </li>
          <li>
            <span>{t('common:charge')} : </span>
            {activity?.cost?.min}-{activity?.cost?.max}
          </li>
          <li>
            <span>{t('common:attendance')} : </span>
            {activity?.attendance?.length} / {activity?.attendanceLimit}
          </li>
        </ul>

        <p className="o-activity-card__introduction">
          {sliceIntroduction(activity?.introduction, 50)} ...
          <Link to={`/activity/${activityId}`}>{t('common:learnMore')}</Link>
        </p>
      </div>

      <div className="l-activity-card__cover">
        <Link to={`/activity/${activityId}`}>
          <img
            className="o-activity__image"
            src={activity?.coverURL || defaultImageURL.activityCover}
            alt="activity cover"
          />
        </Link>
      </div>

      <div className="o-activity-card__like">
        <input
          id={`${activityId}-like`}
          type="checkbox"
          checked={isActivityLiked}
          onChange={handleActivityLiked}
        />
        <label htmlFor={`${activityId}-like`}>
          <HeartIcon />
        </label>
      </div>
    </div>
  );
};

const StyledActivityListItem = styled(ActivityListItem)`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 7.5rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.backgroundColor.default};
  overflow: hidden;

  .l-activity-card__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: calc(100% - 7.5rem);
    height: 100%;
    padding: 0.5rem 0.75rem;

    .l-activity-card__title {
      display: flex;
      align-items: center;
      width: 100%;

      .o-activity-card__avatar img {
        width: 1.75rem;
        height: 1.75rem;
        border-radius: 1rem;
      }

      .o-activity-card__name {
        flex-grow: 1;
        margin-left: 0.25rem;
        width: calc(100% - 3rem);

        h3 {
          width: 100%;
          font-weight: 700;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }

      .o-activity-card__attendance {
        position: absolute;
        right: 3.5rem;
        top: 0.75rem;
        padding: 0.25rem 0.5rem;
        z-index: 1;
        border: 2px solid white;
        border-radius: 0.75rem;
        background-color: ${({ theme }) => theme.color.default};

        svg {
          display: none;
        }

        h4 {
          display: block;
          color: white;
          white-space: nowrap;
        }
      }
    }

    .o-activity-card__date,
    .o-activity-card__location {
      display: flex;
      align-items: center;

      svg {
        display: block;
        width: 1rem;
        height: 1rem;
        fill: ${({ theme }) => theme.color.default};
        margin-right: 0.25rem;
      }
    }

    .o-activity-card__location {
      margin-top: 0.25rem;
    }

    .o-activity-card__date {
      margin-top: 0.25rem;
      font-weight: 400;
    }

    .c-activity-card__highlights {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
      margin-top: 0.375rem;

      li {
        padding: 0.25rem 0.5rem;
        border-radius: 5px;
        color: white;
        background-color: ${({ theme }) => theme.color.default};
        font-size: 0.75rem;

        span,
        &:last-child {
          display: none;
        }
      }
    }

    .o-activity-card__introduction {
      display: none;

      a {
        font-size: 0.75rem;
        font-weight: 700;
        text-decoration: underline;
        color: ${({ theme }) => theme.color.default};
      }
    }
  }

  .o-activity-card__like {
    position: absolute;
    top: 0.5rem;
    right: 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.25rem;
    border-radius: 50%;
    background-color: white;

    input[type='checkbox'] {
      display: none;
    }

    svg {
      width: 1.75rem;
      height: 1.75rem;
      padding: 0.2rem;
      fill: transparent;
      stroke: ${({ theme }) => theme.color.alert};
      stroke-width: 50;
      cursor: pointer;
    }

    &:has(input:checked) label {
      svg {
        fill: ${({ theme }) => theme.color.alert};
      }
    }
  }

  .l-activity-card__cover {
    position: relative;
    height: 100%;
    aspect-ratio: 1 / 1;

    .o-activity__image {
      width: 100%;
      height: 100%;
      border-radius: 0 1rem 1rem 0;
      object-fit: cover;
    }
  }

  @media screen and (min-width: 480px) {
    height: 9rem;

    .l-activity-card__info {
      padding: 1rem;

      .l-activity-card__title .o-activity-card__attendance {
        display: flex;
        gap: 0.25rem;

        svg {
          display: block;
          width: 0.75rem;
          height: 0.75rem;
          fill: white;
        }
      }

      .o-activity-card__date,
      .o-activity-card__location {
        align-self: start;
        margin-top: 0.5rem;
      }

      .o-activity-card__date br {
        display: none;
      }

      .c-activity-card__highlights {
        margin-top: 0.75rem;

        li {
          color: white;
          background-color: ${({ theme }) => theme.color.default};

          span {
            display: inline;
            color: white;
            background-color: ${({ theme }) => theme.color.default};
          }
        }
      }

      .c-activity-card__basic-info {
        margin-top: 0.5rem;
      }
    }
  }

  @media screen and (min-width: 672px) {
    height: 10rem;

    .l-activity-card__info {
      .l-activity-card__title .o-activity-card__attendance {
        right: 4.5rem;
      }

      .c-activity-card__brief {
        display: flex;
        margin-top: 0.5rem;
        gap: 0.5rem;

        h4 {
          margin-top: 0;
        }
      }

      .c-activity-card__highlights {
        li {
          border-radius: 0.75rem;
          padding: 0.25rem 0.75rem;

          &:last-child {
            display: block;
          }
        }
      }

      .o-activity-card__introduction {
        display: block;
        margin-top: 0.75rem;
      }
    }
  }

  ${(props) =>
    props.sm &&
    css`
      @media screen and (min-width: 1024px) {
        height: 7.5rem;

        .l-activity-card__info {
          width: calc(100% - 7.5rem);
          padding: 0.5rem 1rem;

          .l-activity-card__title {
            gap: 0.25rem;
          }

          .c-activity-card__brief {
            flex-direction: column;
            justify-content: start;
            gap: 0;
            margin-top: 0;

            .o-activity-card__location,
            .o-activity-card__date {
              margin: 0.125rem;
            }

            .o-activity-card__date br {
              display: none;
            }
          }

          .c-activity-card__highlights {
            margin-top: 0.25rem;

            li {
              padding: 0.25rem 0.375rem;
              border-radius: 4px;

              span,
              &:last-child {
                display: none;
              }
            }
          }

          .o-activity-card__introduction {
            display: none;
          }

          .l-activity-card__title .o-activity-card__attendance {
            position: absolute;
            right: 3.5rem;
            top: 0.75rem;
            border: 2px solid white;
            z-index: 1;
            background-color: ${({ theme }) => theme.color.default};

            svg {
              display: none;
            }

            h4 {
              color: white;
            }
          }
        }
      }
    `}
`;

export default StyledActivityListItem;
