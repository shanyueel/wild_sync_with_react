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
import { getRandomId, postActivity } from 'api/activityApi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { uploadImage } from 'api/storageApi';

const ActivityCreateModal = ({className, isActivityCreateModalOpen, setIsActivityCreateModalOpen}) => {
  const navigate = useNavigate()
  const stepsRef = useRef(null)
  const [activityContent, setActivityContent] = useState({})
  const [formProgress, setFormProgress] = useState(1);
  const user = useSelector(state => state.user)
  const holderInfo = {
    uid: user.uid,
    birth: user.birth,
    displayName: user.displayName,
    photoURL: user.photoURL,
    profession: user.profession,
    region: user.region,
    introduction: user.introduction,
    heldActivities: user.heldActivities || []
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

  const closeModal = async() => {
    setFormProgress(1)
    setIsActivityCreateModalOpen(false)
    document.querySelector('body').classList.remove('no-scroll')
    document.querySelector('html').classList.remove('no-scroll')
  }

  const handleClearData = async() => {
    setActivityContent({})
  }

  const handlePreviousPageClick = () => {
    setFormProgress(formProgress - 1)
  }

  const handleNextPageClick = () => {
    setFormProgress(formProgress + 1)
    console.log( holderInfo, activityContent)
  }

  const handleActivityCreate = async() => {
    const activityId = await getRandomId()
    let updateCoverURL = null
    let updateRouteURL = null

    if(activityContent?.coverURLFile) updateCoverURL = await uploadImage("activity-covers",`${activityId}-cover`, activityContent?.coverURLFile)
    if(activityContent?.detail?.routeURLFile) updateRouteURL = await uploadImage("activity-routes", `${activityId}-route`, activityContent?.detail?.routeURLFile)
    
    delete activityContent?.coverURLFile
    delete activityContent?.detail?.routeURLFile
    URL.revokeObjectURL(activityContent?.coverURL)
    URL.revokeObjectURL(activityContent?.detail?.routeURL)

    const updateActivityContent = {
      ...activityContent,
      coverURL: updateCoverURL,
      detail:{
        ...activityContent?.detail,
        routeURL: updateRouteURL
      }
    }

    const { success } = await postActivity(activityId, holderInfo, updateActivityContent)

    if(success){
      setFormProgress(1)
      setActivityContent({})
      toast.success('建立活動成功', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      setTimeout(()=>{
        setIsActivityCreateModalOpen(false)
        navigate(`activity/${activityId}`)
      },1500)
    }else{
      toast.error('建立活動失敗', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }
  
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

        <form className='l-modal__form-container'>
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
              formContent={activityContent} 
              onFormChange={setActivityContent}
            />
          }

        </form>

        <div className='c-activity-create__pagination'>
          {formProgress === 1 ? 
            <StyledButton onClick={handleClearData} alert>清空資料</StyledButton>
            :<StyledButton onClick={handlePreviousPageClick} >前一頁</StyledButton>
          }
          {formProgress < 5 ?
            <StyledButton onClick={handleNextPageClick} >下一頁</StyledButton>
            :<StyledButton onClick={handleActivityCreate} >建立活動</StyledButton>
          }
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
  max-height: calc(100vh - 8rem);
  margin: 5rem auto 0;
  border-radius: .5rem;
  background-color: ${({theme})=> theme.backgroundColor.default};
  padding: 1rem;

  .l-modal__body{
    .l-activity-create__steps {
      display: flex;
      justify-content: space-between;
      padding: .75rem 0;
      border-bottom: 1px solid #ADADAD;

      .c-activity-create__step {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-grow: 1;
        counter-increment: step-counter;

        &::after {
          content: "";
          position: absolute;
          top: 1rem;
          left: calc(50% + 1.5rem);
          right: calc(-50% + 1.5rem);
          height: 2px;
          background-color: #3F6F41;
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
        border: 2px solid #3F6F41;
        background-color: white;

        &::before {
          content: counter(step-counter);
          color: #3F6F41;
          font-weight: 700;
        }

        &.done {
          background-color: #3F6F41;

          ::before {
            content: "✔";
            color: white;
          }
        }

        &.active {
          background-color: #3F6F41;

          ::before {
            color: white;
          }
        }
      }

      .o-activity-create__step-title {
        font-size: .75rem;
        margin-top: .25rem;
        color: #3F6F41;
      }
    }
  }

    .l-modal__form-container{
      width: 100%;
      height: calc(100% - 9rem);
      margin: .75rem 0;

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
    width: 50vw;
  }
`

export default StyledActivityCreateModal