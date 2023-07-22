import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import styled from "styled-components";

import {ReactComponent as CrossIcon} from "assets/icons/CrossIcon.svg"

import StyledButton from 'components/StyledButton';
import StyledActivityCreateStepOne from 'components/formSteps/StyledActivityCreateStepOne';
import StyledActivityCreateStepTwo from 'components/formSteps/StyledActivityCreateStepTwo';
import StyledActivityCreateStepThree from 'components/formSteps/StyledActivityCreateStepThree';
import StyledActivityCreateStepFour from 'components/formSteps/StyledActivityCreateStepFour';
import StyledActivityCreateStepFive from 'components/formSteps/StyledActivityCreateStepFive';

const ActivityCreateModal = ({className, isActivityCreateModalOpen, setIsActivityCreateModalOpen}) => {
  const stepsRef = useRef(null)
  const [activityContent, setActivityContent] = useState({})
  const [formProgress, setFormProgress] = useState(1);

  const closeModal = () => {
    setIsActivityCreateModalOpen(false);
    setFormProgress(1)
  }

  const onPreviousPageClick = () => {
    setFormProgress(formProgress - 1)
  }

  const onNextPageClick = () => {
    setFormProgress(formProgress + 1)
    console.log(activityContent)
  }
  
  useEffect(()=>{
    const adjustStepDisplay = (currentFormProgress) => {
      const steps = stepsRef?.current

      let doneSteps = [0,1,2,3,4].slice(0,currentFormProgress-1)
      let activeStep = currentFormProgress - 1
      let undoneSteps = [0,1,2,3,4].slice(currentFormProgress,5)

      doneSteps.forEach((doneStep)=>{
        steps?.children[doneStep]?.firstElementChild?.classList.remove("active")
        steps?.children[doneStep]?.firstElementChild?.classList.add("done")
      })

      steps?.children[activeStep]?.firstElementChild?.classList.remove("done")
      steps?.children[activeStep]?.firstElementChild?.classList.add("active")

      undoneSteps.forEach((undoneStep)=>{
        steps?.children[undoneStep]?.firstElementChild?.classList.remove("done","active")
      })
    }
    adjustStepDisplay(formProgress)
  },[formProgress])


  
  

  return(
    <Modal
      className={className}
      isOpen={isActivityCreateModalOpen}
      onRequestClose={closeModal}
      contentLabel="Activity Create Modal"
    >
      <div className='l-modal__header'>
        <h2 className='o-modal__title'>建立活動</h2>
        <CrossIcon className="o-modal__close-icon" onClick={closeModal}/>
      </div>

      <div className='l-modal__body'>

        <div className='l-activity-create__steps' ref={stepsRef}>
          <div className='c-activity-create__step'>
            <div className='o-activity-create__step-circle active'></div>
            <h3 className='o-activity-create__step-title' >基本資訊</h3>
          </div>
          <div className='c-activity-create__step'>
            <div className='o-activity-create__step-circle'></div>
            <h3 className='o-activity-create__step-title'>重點簡介</h3>
          </div>
          <div className='c-activity-create__step'>
            <div className='o-activity-create__step-circle'></div>
            <h3 className='o-activity-create__step-title'>活動細節</h3>
          </div>
          <div className='c-activity-create__step'>
            <div className='o-activity-create__step-circle'></div>
            <h3 className='o-activity-create__step-title'>交通住宿</h3>
          </div>
          <div className='c-activity-create__step'>
            <div className='o-activity-create__step-circle'></div>
            <h3 className='o-activity-create__step-title'>其他補充</h3>
          </div>
        </div>

        <form className='l-activity-create__form-container'>
          {formProgress === 1 &&
            <StyledActivityCreateStepOne
              formContent={activityContent}
              onFormChange={setActivityContent}
            />
          }

          {formProgress === 2 && 
            <StyledActivityCreateStepTwo
              formContent={activityContent}
              onFormChange={setActivityContent}
            />
          }

          {formProgress === 3 &&
            <StyledActivityCreateStepThree
              formContent={activityContent} 
              onFormChange={setActivityContent}
            />
          }

          {formProgress === 4 &&
            <StyledActivityCreateStepFour
              formContent={activityContent} 
              onFormChange={setActivityContent}
            />
          }

          {formProgress === 5 &&
            <StyledActivityCreateStepFive

            />
          }

        </form>

        <div className='c-activity-create__pagination'>
          <StyledButton onClick={onPreviousPageClick} disabled={formProgress === 1}>前一頁</StyledButton>
          <StyledButton onClick={onNextPageClick} >{formProgress<5?"下一頁":"建立活動"}</StyledButton>
        </div>
      </div>

    </Modal>
  )
}

const StyledActivityCreateModal = styled(ActivityCreateModal)`
  position: relative;
  width: 90vw;
  height: 100vh;
  max-width: 896px;
  max-height: calc(100vh - 6rem);
  margin: 5rem auto 0;
  border-radius: .5rem;
  background-color: ${({theme})=> theme.backgroundColor.default};
  padding: 1rem;

  .l-modal__header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 .25rem .75rem;
    border-bottom: 1px solid ${({theme})=> theme.color.grey};

    .o-modal__title{
      color: ${({theme})=> theme.color.default};
      font-weight: 700;
    }

    .o-modal__close-icon{
      height: 1rem;
      width: 1rem;
      cursor: pointer;
    }
  }

  .l-modal__body{
    width: 100%;
    height: calc(100% - 2rem);

    .l-activity-create__steps{
      display: flex;
      justify-content: space-between;
      padding: .75rem 0;
      border-bottom: 1px solid ${({theme})=> theme.backgroundColor.secondary};

      .c-activity-create__step{
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-grow: 1;
        counter-increment: step-counter;

        &::after{
          content: "";
          position: absolute;
          top: 1rem;
          left: calc(50% + 1.5rem);
          right: calc(-50% + 1.5rem);
          height: 2px;
          background-color: ${({theme})=> theme.color.default};
        }
        
        &:last-child::after{
          display: none;
        }

        .o-activity-create__step-circle{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 1.75rem;
          height: 1.75rem;
          border-radius: 50%;
          border: 2px solid ${({theme})=>theme.color.default};
          background-color: white;

          &::before{
            content: counter(step-counter);
            color: ${({theme})=>theme.color.default};
            font-weight: 700;
          }

          &.done{
            background-color: ${({theme})=>theme.color.default};

            ::before{
              content: "✔";
              color: white;
            }
          }

          &.active{
            background-color: ${({theme})=>theme.color.default};

            ::before{
              color: white;
            }
          }
        }

        .o-activity-create__step-title{
          font-size: .75rem;
          margin-top: .25rem;
          color: ${({theme})=>theme.color.default};
        }


      }
    }

    .l-activity-create__form-container{
      width: 100%;
      height: calc(100% - 9rem);
      margin-top: .75rem;


      .c-activity-create__time{
        h3{
          color: ${({theme})=> theme.color.default};
          font-weight: 700;
        }
      }

      .c-activity-create__altitude{
       input{
        width: 40%;

       }
      }
    }

    .c-activity-create__pagination{
      display: flex;
      gap: 1rem;
      padding-top: .5rem;
      margin-top: 1rem;
      border-top: 1px solid ${({theme})=> theme.backgroundColor.secondary};
    }
  }

  @media screen and (min-width: 768px) {
    width: 80vw;
  }
`

export default StyledActivityCreateModal