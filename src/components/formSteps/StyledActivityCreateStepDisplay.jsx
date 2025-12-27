import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const ActivityCreateStepDisplay = ({ className, formProgress }) => {
  const stepsRef = useRef(null);

  useEffect(() => {
    const adjustStepDisplay = (currentFormProgress) => {
      const steps = stepsRef?.current;

      let doneSteps = [0, 1, 2, 3, 4].slice(0, currentFormProgress - 1);
      let activeStep = currentFormProgress - 1;
      let undoneSteps = [0, 1, 2, 3, 4].slice(currentFormProgress, 5);

      doneSteps.forEach((doneStep) => {
        steps?.children[doneStep]?.firstElementChild?.classList.remove(
          'active'
        );
        steps?.children[doneStep]?.firstElementChild?.classList.add('done');
      });

      steps?.children[activeStep]?.firstElementChild?.classList.remove('done');
      steps?.children[activeStep]?.firstElementChild?.classList.add('active');

      undoneSteps.forEach((undoneStep) => {
        steps?.children[undoneStep]?.firstElementChild?.classList.remove(
          'done',
          'active'
        );
      });
    };
    adjustStepDisplay(formProgress);
  }, [formProgress]);

  return (
    <div className={className} ref={stepsRef}>
      <div className="c-activity-create__step">
        <div className="o-activity-create__step-circle active"></div>
        <h3 className="o-activity-create__step-title">基本資訊</h3>
      </div>
      <div className="c-activity-create__step">
        <div className="o-activity-create__step-circle"></div>
        <h3 className="o-activity-create__step-title">重點簡介</h3>
      </div>
      <div className="c-activity-create__step">
        <div className="o-activity-create__step-circle"></div>
        <h3 className="o-activity-create__step-title">活動細節</h3>
      </div>
      <div className="c-activity-create__step">
        <div className="o-activity-create__step-circle"></div>
        <h3 className="o-activity-create__step-title">交通住宿</h3>
      </div>
      <div className="c-activity-create__step">
        <div className="o-activity-create__step-circle"></div>
        <h3 className="o-activity-create__step-title">其他補充</h3>
      </div>
    </div>
  );
};

const StyledActivityCreateStepDisplay = styled(ActivityCreateStepDisplay)`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #adadad;

  .c-activity-create__step {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    counter-increment: step-counter;

    &::after {
      content: '';
      position: absolute;
      top: 1rem;
      left: calc(50% + 1.5rem);
      right: calc(-50% + 1.5rem);
      height: 2px;
      background-color: #3f6f41;
    }

    &:last-child::after {
      display: none;
    }

    .o-activity-create__step-circle {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1.75rem;
      height: 1.75rem;
      border-radius: 50%;
      border: 2px solid #3f6f41;
      background-color: white;

      &::before {
        content: counter(step-counter);
        color: #3f6f41;
        font-weight: 700;
      }

      &.done {
        background-color: #3f6f41;

        ::before {
          content: '✔';
          color: white;
        }
      }

      &.active {
        background-color: #3f6f41;

        ::before {
          color: white;
        }
      }
    }

    .o-activity-create__step-title {
      font-size: 0.75rem;
      margin-top: 0.25rem;
      color: #3f6f41;
    }
  }
`;

export default StyledActivityCreateStepDisplay;
