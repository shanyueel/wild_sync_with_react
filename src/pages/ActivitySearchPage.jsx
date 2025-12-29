import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { getActivitiesByFilters } from 'api/activityApi';

import StyledButton from 'components/StyledButton';
import StyledActivityListItem from 'components/StyledActivityListItem';
import StyledActivityHistory from 'components/StyledActivityHistory';
import StyledCheckboxInput from 'components/inputs/StyledCheckboxInput';
import StyledDatePeriodInput from 'components/inputs/StyledDatePeriodInput';
import StyledSelector from 'components/inputs/StyledSelector';
import StyledLoading from 'components/StyledLoading';

import { ReactComponent as UpIcon } from 'assets/icons/UpIcon.svg';
import { ReactComponent as DownIcon } from 'assets/icons/DownIcon.svg';

import activitiesLocationOptions from 'data/taiwanDistricts.json';
import activitiesDifficultyOptions from 'data/activityDifficultyOptions.json';
import activitiesOrderOptions from 'data/activitiesOrderOptions.json';

const ActivitySearchPage = ({ className }) => {
  const { t } = useTranslation(['searchPage', 'common']);

  const translatedDifficultyOptions = useMemo(() => {
    return activitiesDifficultyOptions.map((option) => ({
      ...option,
      name: t(`common:difficultyOptions.${option.id}`),
    }));
  }, [t]);

  const translatedLocationOptions = useMemo(() => {
    return activitiesLocationOptions.map((option) => ({
      ...option,
      name: t(`common:locations.${option.id}`),
    }));
  }, [t]);

  const translatedOrderOptions = useMemo(() => {
    return activitiesOrderOptions.map((option) => ({
      ...option,
      name: t(`common:orderOptions.${option.id}`),
    }));
  }, [t]);

  const searchbarRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [isFiltersDisplay, setIsFiltersDisplay] = useState(false);
  const [searchOrder, setSearchOrder] = useState({ order: 'releaseDate' });
  const [searchFilter, setSearchFilter] = useState({
    keyword: queryParams.get('keyword'),
    location: JSON.parse(queryParams?.get('location')),
    difficulty: JSON.parse(queryParams?.get('difficulty')),
    time: JSON.parse(queryParams?.get('time')),
  });
  const [searchResultsActivities, setSearchResultsActivities] = useState([]);
  const [orderedActivities, setOrderedActivities] = useState([]);
  const [isActivitiesLoading, setIsActivitiesLoading] = useState(true);

  useEffect(() => {
    const getFilteredActivities = async () => {
      setIsActivitiesLoading(true);
      const newActivities = await getActivitiesByFilters(searchFilter);
      setSearchResultsActivities(newActivities);
      setOrderedActivities(searchResultsActivities);
      setIsActivitiesLoading(false);
    };

    setSearchFilter({
      keyword: queryParams.get('keyword'),
      location: JSON.parse(queryParams?.get('location')),
      difficulty: JSON.parse(queryParams?.get('difficulty')),
      time: JSON.parse(queryParams?.get('time')),
    });
    getFilteredActivities();
  }, [location.search]);

  useEffect(() => {
    let orderedActivities = [...searchResultsActivities];
    if (searchOrder.order === 'releaseDate') {
      orderedActivities.sort((a, b) => b.createAt - a.createAt);
    }
    if (searchOrder.order === 'activityDate') {
      orderedActivities = orderedActivities.filter(
        (activity) => activity.time.start > Date.parse(new Date())
      );
      orderedActivities.sort((a, b) => a.time.start - b.time.start);
    }
    if (searchOrder.order === 'deadlineDate') {
      orderedActivities = orderedActivities.filter(
        (activity) => activity.deadline > Date.parse(new Date())
      );
      orderedActivities.sort((a, b) => a.deadline - b.deadline);
    }
    setOrderedActivities(orderedActivities);
  }, [searchOrder, searchResultsActivities]);

  const handleSearchbarChange = () => {
    const newForm = {
      ...searchFilter,
      keyword: searchbarRef.current.value,
    };
    setSearchFilter(newForm);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const { keyword, location, difficulty, time } = searchFilter;

    const queryParams = [
      keyword && `keyword=${keyword}`,
      location &&
        location?.length > 0 &&
        `location=${JSON.stringify(location)}`,
      difficulty &&
        difficulty?.length > 0 &&
        `difficulty=${JSON.stringify(difficulty)}`,
      time && `time=${JSON.stringify(time)}`,
    ]
      ?.filter(Boolean)
      ?.join('&');

    navigate(`/activity/search?${queryParams}`);
  };

  return (
    <div className={className}>
      <div className="l-web-container__main">
        <form className="l-search-settings">
          <div className="l-search-settings__searchbar">
            <input
              id="keyword"
              ref={searchbarRef}
              type="text"
              placeholder={t('common:searchPlaceholder')}
              value={searchFilter?.keyword || ''}
              onChange={handleSearchbarChange}
            />
            <StyledButton onClick={handleSearch}>
              {t('common:search')}
            </StyledButton>
          </div>
          <table
            className="l-search-settings__options"
            style={{ display: isFiltersDisplay ? 'block' : 'none' }}
          >
            <tbody>
              <tr>
                <td className="c-table-key">{t('common:difficulty')}</td>
                <td className="c-table-content">
                  <StyledCheckboxInput
                    inputId="difficulty"
                    checkboxOptions={translatedDifficultyOptions}
                    formContent={searchFilter}
                    onFormChange={setSearchFilter}
                  />
                </td>
              </tr>
              <tr>
                <td className="c-table-key">{t('common:date')}</td>
                <td className="c-table-content ">
                  <StyledDatePeriodInput
                    inputId="time"
                    formContent={searchFilter}
                    onFormChange={setSearchFilter}
                  />
                </td>
              </tr>
              <tr>
                <td className="c-table-key">{t('common:location')}</td>
                <td className="c-table-content">
                  <StyledCheckboxInput
                    inputId="location"
                    checkboxOptions={translatedLocationOptions}
                    formContent={searchFilter}
                    onFormChange={setSearchFilter}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <label
            className="c-search-settings__switch"
            htmlFor="searchFiltersSwitch"
          >
            <input
              id="searchFiltersSwitch"
              type="checkbox"
              onClick={() => {
                setIsFiltersDisplay(!isFiltersDisplay);
              }}
            />
            {isFiltersDisplay ? (
              <>
                <UpIcon />
                {t('searchPage:hideSearchOptions')}
              </>
            ) : (
              <>
                <DownIcon />
                {t('searchPage:expandSearchOptions')}
              </>
            )}
          </label>
        </form>

        <div className="l-search-results">
          <div className="l-search-results__header">
            <h2 className="o-search-results__title">
              {t('searchPage:searchResults')}
            </h2>
            <StyledSelector
              className="o-search-results__order"
              selectorId="order"
              optionList={translatedOrderOptions}
              formContent={searchOrder}
              onFormChange={setSearchOrder}
            />
          </div>

          <div className="l-search-results__container">
            {isActivitiesLoading && <StyledLoading title={t('common:loadingActivities')} />}
            {!isActivitiesLoading &&
              orderedActivities?.length > 0 &&
              orderedActivities?.map((activity) => (
                <StyledActivityListItem
                  key={activity?.id}
                  activity={activity}
                />
              ))}
            {!isActivitiesLoading && orderedActivities?.length === 0 && (
              <h2 className="o-search-results__empty">
                {t('searchPage:NoRelevantActivities')}
              </h2>
            )}
          </div>
        </div>
      </div>

      <div className="l-web-container__side">
        <StyledActivityHistory sideUsed />
      </div>
    </div>
  );
};

const StyledActivitySearchPage = styled(ActivitySearchPage)`
  .l-web-container__main {
    .l-search-settings {
      margin-top: 1rem;
      padding: 1rem;
      border-radius: 0.5rem;
      background-color: ${({ theme }) => theme.backgroundColor.default};
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.2);

      .c-search-settings__switch {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 1rem;
        color: ${({ theme }) => theme.color.default};
        cursor: pointer;

        input {
          display: none;
        }

        svg {
          width: 1.25rem;
          height: 1.25rem;
          margin-right: 0.25rem;
          fill: ${({ theme }) => theme.color.default};
        }
      }

      &__searchbar {
        display: flex;

        input {
          width: 80%;
          padding: 0 1rem;
          border-radius: 0.75rem 0 0 0.75rem;
          border: none;
        }

        button {
          width: 20%;
          border-radius: 0 0.75rem 0.75rem 0;
        }
      }

      &__options {
        margin-top: 1rem;

        td {
          border-color: ${({ theme }) => theme.backgroundColor.default};
        }

        .c-table-key {
          width: 5rem;
          color: white;
          background-color: ${({ theme }) => theme.color.default};
        }

        .c-table-content {
          ul {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            width: 100%;
            height: 100%;

            li {
              padding: 0.25rem 0.5rem;

              input {
                display: none;
              }

              label {
                font-size: 1rem;
              }

              &:has(input:checked) {
                background-color: ${({ theme }) => theme.color.default};
                border-radius: 1rem;

                label {
                  color: white;
                }
              }
            }
          }
        }
      }
    }

    .l-search-results .l-search-results__container {
      width: 100%;
      margin-top: 1rem;

      .o-search-results__empty {
        font-weight: 700;
        color: ${({ theme }) => theme.color.default};
        margin: 5rem 0;
      }
    }

    .l-search-results__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 2rem;

      .o-search-results__title {
        font-weight: 700;
        color: ${({ theme }) => theme.color.default};
      }

      .o-search-results__order {
        width: fit-content;
        select {
          border-radius: 0;
          border: none;
          border-bottom: 1px solid ${({ theme }) => theme.color.default};
          height: 1.75rem;
        }
      }
    }

    .l-search-results__container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 5rem;
    }
  }

  @media screen and (min-width: 1024px) {
    display: flex;
    justify-content: space-between;
  }
`;

export default StyledActivitySearchPage;
