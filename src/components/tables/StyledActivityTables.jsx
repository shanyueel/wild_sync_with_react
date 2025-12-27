import { useState } from 'react';
import styled from 'styled-components';

import StyledHikingTable from 'components/tables/StyledHikingTable';
import StyledTransportationTable from 'components/tables/StyledTransportationTable';
import StyledAccommodationTable from 'components/tables/StyledAccommodationTable';
import StyledOthersTable from 'components/tables/StyledOthersTable';

const ActivityTables = ({ className, activity }) => {
  const [ActiveTable, setActiveTable] = useState('detail');

  const handleTableNavbarClick = (e) => {
    if (e.target.matches('#activity-detail')) {
      setActiveTable('detail');
    }
    if (e.target.matches('#activity-residence-and-transportation')) {
      setActiveTable('residence-transportation');
    }
    if (e.target.matches('#activity-others')) {
      setActiveTable('others');
    }
  };

  return (
    <div className={className}>
      <div
        className="c-activity-tables__navbar"
        onClick={handleTableNavbarClick}
      >
        <label
          htmlFor="activity-detail"
          className="c-activity-tables__nav-item"
        >
          <input
            name="activity-tables__navbar"
            id="activity-detail"
            type="radio"
            defaultChecked
          />
          活動細節
        </label>
        <label
          htmlFor="activity-residence-and-transportation"
          className="c-activity-tables__nav-item"
        >
          <input
            name="activity-tables__navbar"
            id="activity-residence-and-transportation"
            type="radio"
          />
          交通 / 住宿
        </label>
        <label
          htmlFor="activity-others"
          className="c-activity-tables__nav-item"
        >
          <input
            name="activity-tables__navbar"
            id="activity-others"
            type="radio"
          />
          行程 & 其他
        </label>
      </div>
      <div className="l-activity-tables__container">
        {ActiveTable === 'detail' && (
          <StyledHikingTable
            className="o-activity-detail-table"
            detailContent={activity?.detail}
          />
        )}
        {ActiveTable === 'residence-transportation' && (
          <div className="o-activity-residence-and-transportation-table">
            <StyledTransportationTable
              transportationContent={activity?.transportation}
            />
            <div className="l-activity-create__accommodation">
              {activity?.accommodation && (
                <table>
                  <tbody>
                    <tr>
                      <td className="c-table-key" colSpan={2}>
                        住宿資訊
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
              {activity?.accommodation?.map((accommodationDay) => {
                return (
                  <StyledAccommodationTable
                    key={accommodationDay?.date}
                    accommodationDay={accommodationDay}
                  />
                );
              })}
            </div>
          </div>
        )}
        {ActiveTable === 'others' && (
          <StyledOthersTable detailContent={activity?.detail} />
        )}
      </div>
    </div>
  );
};

const StyledActivityTables = styled(ActivityTables)`
  margin: 2rem auto;

  .c-activity-tables__navbar {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    margin-bottom: 0.5rem;

    .c-activity-tables__nav-item {
      position: relative;
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      font-weight: 700;
      border-radius: 0.25rem 0.25rem 0 0;
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

  .l-activity-tables__container {
    padding: 1.5rem 1rem;
    background-color: ${({ theme }) => theme.color.default};
    border-radius: 0 0 0.25rem 0.25rem;

    .o-activity-residence-and-transportation-table {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
`;

export default StyledActivityTables;
