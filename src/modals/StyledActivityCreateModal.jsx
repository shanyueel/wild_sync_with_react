import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import styled from "styled-components";

import {ReactComponent as CrossIcon} from "assets/icons/CrossIcon.svg"
import {ReactComponent as UploadIcon} from "assets/icons/UploadIcon.svg"

import StyledTextInput from 'components/StyledTextInput';
import StyledButton from 'components/StyledButton';
import StyledActivityTable from 'components/StyledHikingTable';
import StyledRadioInput from 'components/StyledRadioInput';

const typeOptions = [
  { 
    name: "type",
    label: "登山",
    id: "hiking"
  },
  { 
    name: "type",
    label: "露營",
    id: "camping"
  },
  { 
    name: "type",
    label: "單車",
    id: "cycling"
  },
  { 
    name: "type",
    label: "潛水",
    id: "diving"
  },
  { 
    name: "type",
    label: "其他",
    id: "others"
  }
]


const ActivityCreateModal = ({className, isActivityCreateModalOpen, setIsActivityCreateModalOpen}) => {
  const stepsRef = useRef(null)
  const [ActivityContent, setActivityContent] = useState({})
  const [formProgress, setFormProgress] = useState(1);

  const closeModal = () => {
    setIsActivityCreateModalOpen(false);
  }

  const onPreviousPageClick = () => {
    setFormProgress(formProgress - 1)
  }

  const onNextPageClick = () => {
    setFormProgress(formProgress + 1)
    console.log(ActivityContent)
  }
  
  useEffect(()=>{
    const adjustStepDisplay = (currentFormProgress) => {
      const steps = stepsRef?.current

      let doneSteps = [0,1,2,3,4].slice(0,currentFormProgress-1)
      let activeStep = currentFormProgress - 1
      let undoneSteps = [0,1,2,3,4].slice(currentFormProgress,5)

      doneSteps.forEach((doneStep)=>{
        steps?.children[doneStep]?.firstElementChild?.classList.add("done")
        steps?.children[doneStep]?.firstElementChild?.classList.remove("active")
      })

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

        <form className='l-activity-create__form scrollbar'>
          {formProgress === 1 &&
            <>
              <div className='c-activity-create__cover'>
                <img className="o-activity-create__cover-image" src={require('assets/images/userDefaultCover.jpg')} alt='activity-cover'/>
                <div className='l-activity-create__cover-control'>
                  <div className='o-activity-create__cover-upload'><UploadIcon/></div>
                  <div className='o-activity-create__cover-delete'><CrossIcon/></div>
                </div>
              </div>
              <StyledRadioInput title="活動類型" className="c-activity-create__type-options" onFormChange={setActivityContent} FormContent={ActivityContent} radioOptions={typeOptions}/>
              <StyledTextInput title="活動名稱" placeholder="請輸入活動名稱"/>
              <StyledTextInput title="活動地點" placeholder="請輸入活動地點"/>
              <div className='c-activity-create__introduction'>
                <h3 className='o-activity-create__input-title'>活動簡介</h3>
                <textarea placeholder='請輸入活動簡介'/>
              </div>
            </>
          }

          {formProgress === 2 && 
            <>
              <div className='c-activity-create__time'>
                <h3 className='o-activity-create__input-title'>活動時間</h3>
                <input id="a-time-start" name="a-time-start" type="datetime-local" required /> - <input id="a-time-end" name="a-time-end" type="datetime-local" required />
              </div>
              <div className='c-activity-create__deadline'>
                <h3 className='o-activity-create__input-title'>申請截止時間</h3>
                <input id="a-time-start" name="a-time-start" type="datetime-local" required />
              </div>
              <div className='c-activity-create__altitude'>
                <h3 className='o-activity-create__input-title'>活動海拔高度</h3>
                <input type='number' placeholder='最低海拔'/> - <input type='number' placeholder='最高海拔'/>
              </div>
              <div className='c-activity-create__cost'>
                <h3 className='o-activity-create__input-title'>預估費用</h3>
                <input type='number'/>
              </div>
              <div className='c-activity-create__attendance-limit'>
                <h3 className='o-activity-create__input-title'>人數限制</h3>
                <input type='number'/>
              </div> 
            </>
          }

          {formProgress === 3 &&
            <StyledActivityTable inputUsed/>
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
  max-width: 1024px;
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
              content: "V";
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

    .l-activity-create__form{
      display: flex;
      flex-direction: column;
      gap: .75rem;
      width: 100%;
      height: calc(100% - 9rem);
      margin-top: 1rem;
      overflow-y: scroll;
      

      .o-activity-create__input-title{
        color: ${({theme})=> theme.color.default};
        font-weight: 700;
        margin-bottom: .5rem;
      }

      .c-activity-create__cover{
        position: relative;

        &::before{
          content:"";
          position: absolute;
          top:0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(255,255,255, 0.5);
          z-index: 3;
        }

        .o-activity-create__cover-image{
          position: relative;
          width: 100%;
          aspect-ratio: 16 /9;
          object-fit: cover;
        }
        
        .l-activity-create__cover-control{
          position: absolute;
          top: 50%;
          left: 50%;
          display: flex;
          gap: 2.5rem;
          transform: translate(-50%,-50%);
          z-index: 5;

        
          .o-activity-create__cover-upload,
          .o-activity-create__cover-delete{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 50%;
            background-color: white;
            cursor: pointer;

            svg{
              width: 1.25rem;
              height: 1.25rem;
              fill: ${({theme})=> theme.color.default}
            }
          }
        }
      }

      .c-activity-create__introduction{
        textarea{
          height: 5rem;
        }
      }

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
`

export default StyledActivityCreateModal