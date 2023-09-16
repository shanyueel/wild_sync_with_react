import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import styled from "styled-components";
import { toast } from 'react-toastify';

import { deleteActivity, updateActivity } from 'api/activityApi';
import { deleteImage, uploadImage } from 'api/storageApi';

import StyledButton from 'components/StyledButton';
import StyledActivityCreateStepOne from 'components/formSteps/StyledActivityCreateStepOne';
import StyledActivityCreateStepTwo from 'components/formSteps/StyledActivityCreateStepTwo';
import StyledActivityCreateStepThree from 'components/formSteps/StyledActivityCreateStepThree';
import StyledActivityCreateStepFour from 'components/formSteps/StyledActivityCreateStepFour';
import StyledActivityCreateStepFive from 'components/formSteps/StyledActivityCreateStepFive';

import {ReactComponent as CrossIcon} from "assets/icons/CrossIcon.svg"
import StyledConfirmModal from './StyledConfirmModal';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const ActivityUpdateModal = ({ className, currentActivity, setActivity, activityId, isActivityUpdateModalOpen, setIsActivityUpdateModalOpen }) => {
  const navigate = useNavigate()
  const stepsRef = useRef(null)
  const user = useSelector(state=>state.user)
  const userId = user.uid
  const [updateContent, setUpdateContent] = useState(currentActivity)
  const [formProgress, setFormProgress] = useState(1)
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false)

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

  const closeModal = () => {
    setFormProgress(1)
    setIsActivityUpdateModalOpen(false);
    document.querySelector('body').classList.remove('no-scroll');
    document.querySelector('html').classList.remove('no-scroll');
  }

  const handleResetData = () => {
    setUpdateContent(currentActivity)
  }

  const handlePreviousPageClick = () => {
    setFormProgress(formProgress - 1)
  }

  const handleNextPageClick = () => {
    setFormProgress(formProgress + 1)
  }

  const handleDeleteActivity = () => {
    setIsDeleteConfirmModalOpen(true)
  }

  const handleConfirmDeleteClick = async() => {
    const { success } = await deleteActivity( userId, currentActivity )

    if(success){
      toast.success('刪除活動成功', {
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
        document.querySelector('body').classList.remove('no-scroll');
        document.querySelector('html').classList.remove('no-scroll');
        setIsDeleteConfirmModalOpen(false)
        setIsActivityUpdateModalOpen(false)
        navigate(`/user/${userId}`)
      },1500)
    }else{
      toast.error('刪除活動失敗', {
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

  const filterModifiedContent = (content) => {
    const filteredUpdateContent = { ...content }
    delete filteredUpdateContent?.holder
    delete filteredUpdateContent?.attendance
    delete filteredUpdateContent?.createAt

    for(let updateKey in filteredUpdateContent){
      if(filteredUpdateContent?.[updateKey] === currentActivity?.[updateKey]){
        delete filteredUpdateContent?.[updateKey]
      }else if(updateKey === "detail"){
        for(let detailKey in filteredUpdateContent?.detail){
          if(filteredUpdateContent?.detail?.[detailKey] === currentActivity?.detail?.[detailKey]){
            delete filteredUpdateContent?.detail?.[detailKey]
          }
        }
      }else if(updateKey === "transportation"){
        for(let transportationKey in filteredUpdateContent?.transportation){
          if(filteredUpdateContent?.transportation?.[transportationKey] === currentActivity?.transportation?.[transportationKey]){
            delete filteredUpdateContent?.transportation?.[transportationKey]
          }
        }
      }
    }

    return filteredUpdateContent
  }

  const handleActivityUpdate = async() => {
    let updatedActivity = updateContent
    let updateCoverURL = currentActivity?.coverURL || null
    let updateMapURL = currentActivity?.detail?.mapURL || null

    if(updatedActivity?.coverURLFile){
      await deleteImage("activities-covers",`${activityId}-cover`)
      updateCoverURL = await uploadImage("activities-covers",`${activityId}-cover`, updatedActivity?.coverURLFile)
      delete updatedActivity?.coverURLFile
      URL.revokeObjectURL(updatedActivity?.coverURL)
      updatedActivity={
        ...updatedActivity,
        coverURL: updateCoverURL
      }
    }
    if(updatedActivity?.detail?.mapURLFile){
      await deleteImage("activities-maps", `${activityId}-map`)
      updateMapURL = await uploadImage("activities-maps", `${activityId}-map`, updatedActivity?.detail?.mapURLFile)
      delete updatedActivity?.detail?.mapURLFile
      URL.revokeObjectURL(updatedActivity?.detail?.mapURL)
      updatedActivity={
        ...updatedActivity,
        detail:{
          ...updatedActivity?.detail,
          mapURL: updateMapURL
        }
      }
    }

    const updateData = filterModifiedContent(updatedActivity)

    const { success, updateAt } = await updateActivity(activityId, currentActivity, updateData)

    if(success){
      toast.success('更新活動成功', {
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
        document.querySelector('body').classList.remove('no-scroll')
        document.querySelector('html').classList.remove('no-scroll')
        setIsActivityUpdateModalOpen(false)
        setFormProgress(1)
        setActivity({
          ...updatedActivity,
          updateAt: updateAt
        })
      },1500)

    }else{
      toast.error('更新活動失敗', {
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
      isOpen={isActivityUpdateModalOpen}
      onRequestClose={closeModal}
      contentLabel="Activity Create Modal"
    >
      <div className='l-modal__header'>
        <h2 className='o-modal__title'>更新活動</h2>
        <StyledButton onClick={handleResetData} sm outlined>還原變更</StyledButton>
        <StyledButton onClick={handleDeleteActivity} sm alertOutlined>刪除活動</StyledButton>
        <StyledConfirmModal
          title="刪除活動"
          isConfirmModalOpen={isDeleteConfirmModalOpen}
          setIsConfirmModalOpen={setIsDeleteConfirmModalOpen}
          handleConfirmClick={handleConfirmDeleteClick}
        >確認要刪除嗎?
        </StyledConfirmModal>
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
            <StyledActivityCreateStepOne formContent={updateContent} onFormChange={setUpdateContent}/>
          }

          {formProgress === 2 && 
            <StyledActivityCreateStepTwo formContent={updateContent} onFormChange={setUpdateContent} />
          }

          {formProgress === 3 &&
            <StyledActivityCreateStepThree activityId={activityId} formContent={updateContent} onFormChange={setUpdateContent}/>
          }

          {formProgress === 4 &&
            <StyledActivityCreateStepFour formContent={updateContent} onFormChange={setUpdateContent}/>
          }

          {formProgress === 5 &&
            <StyledActivityCreateStepFive formContent={updateContent} onFormChange={setUpdateContent}/>
          }
        </form>

        <div className='l-modal__controls'>
          {formProgress === 1 ? 
            <StyledButton disabled>前一頁</StyledButton>
            :<StyledButton onClick={handlePreviousPageClick} >前一頁</StyledButton>
          }
          {formProgress < 5 ?
            <StyledButton onClick={handleNextPageClick} >下一頁</StyledButton>
            :<StyledButton onClick={handleActivityUpdate} >更新活動</StyledButton>
          }
        </div>
      </div>

    </Modal>
  )
}

const StyledActivityUpdateModal = styled(ActivityUpdateModal)`
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
  }

  @media screen and (min-width: 768px) {
    width: 50vw;
  }
`

export default StyledActivityUpdateModal