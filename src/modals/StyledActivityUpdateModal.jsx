import React, { useEffect, useState } from 'react';
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
import StyledActivityCreateStepDisplay from 'components/formSteps/StyledActivityCreateStepDisplay';
import StyledLoading from 'components/StyledLoading';

const ActivityUpdateModal = ({ className, currentActivity, setActivity, activityId, isActivityUpdateModalOpen, setIsActivityUpdateModalOpen }) => {
  const navigate = useNavigate()
  const missingError = "*此欄位不可為空白"
  const user = useSelector(state=>state.user)
  const userId = user.uid
  const [activityContent, setActivityContent] = useState(currentActivity)
  const [formProgress, setFormProgress] = useState(1)
  const [formErrors, setFormErrors] = useState({})
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false)
  const [isActivityUpdateLoading, setIsActivityUpdateLoading] = useState(false)
  const [isActivityDeleteLoading, setIsActivityDeleteLoading] = useState(false)

  useEffect(()=>{
    setActivityContent(currentActivity)
  },[currentActivity])

  const closeModal = () => {
    setFormProgress(1)
    setIsActivityUpdateModalOpen(false);
  }

  const handleResetData = () => {
    setActivityContent(currentActivity)
    setFormErrors({})
    setFormProgress(1)
  }

  const handlePreviousPageClick = () => {
    setFormProgress(formProgress - 1)
  }

  const handleNextPageClick = async() => {
    if(formProgress === 1){
      const isStepOneComplete =
        activityContent?.coverURL &&
        activityContent?.name &&
        activityContent?.type &&
        activityContent?.location &&
        activityContent?.time

      const newFormErrors = {}
      if(!activityContent?.coverURL) newFormErrors.coverURL = missingError
      if(!activityContent?.name) newFormErrors.name = missingError
      if(!activityContent?.type) newFormErrors.type = missingError
      if(!activityContent?.location) newFormErrors.location = missingError
      if(!activityContent?.time?.start || !activityContent?.time?.end) newFormErrors.time = missingError
      setFormErrors(newFormErrors)

      if(isStepOneComplete) setFormProgress(formProgress + 1)
    }

    if(formProgress === 2){
      const isStepTwoComplete =
        activityContent?.difficulty &&
        activityContent?.activityTimeLength &&
        activityContent?.cost &&
        activityContent?.attendanceLimit &&
        activityContent?.deadline &&
        activityContent?.introduction

      const newFormErrors = {}
      if(!activityContent?.difficulty) newFormErrors.difficulty = missingError
      if(!activityContent?.activityTimeLength) newFormErrors.activityTimeLength = missingError
      if(!activityContent?.cost) newFormErrors.cost = missingError
      if(!activityContent?.attendanceLimit) newFormErrors.attendanceLimit = missingError
      if(!activityContent?.deadline) newFormErrors.deadline = missingError
      if(!activityContent?.introduction) newFormErrors.introduction = missingError
      setFormErrors(newFormErrors)

      if(isStepTwoComplete) setFormProgress(formProgress + 1)
    }

    if(formProgress === 3){
      const isStepThreeComplete = activityContent.detail.trackType === "one-way"
      
        ? activityContent?.detail?.departurePoint &&
          activityContent?.detail?.trackType &&
          activityContent?.detail?.exitPoint &&
          activityContent?.detail?.trackLength &&
          activityContent?.detail?.altitude &&
          activityContent?.detail?.trackCondition &&
          activityContent?.detail?.belongingPark &&
          activityContent?.detail?.applicationNeeded &&
          activityContent?.detail?.trackIntroduction &&
          activityContent?.detail?.mapURL

        : activityContent?.detail?.departurePoint &&
          activityContent?.detail?.trackType &&
          activityContent?.detail?.trackLength &&
          activityContent?.detail?.altitude &&
          activityContent?.detail?.trackCondition &&
          activityContent?.detail?.belongingPark &&
          activityContent?.detail?.applicationNeeded &&
          activityContent?.detail?.trackIntroduction &&
          activityContent?.detail?.mapURL

      const newFormErrors = {}
      if(!activityContent?.detail?.departurePoint) newFormErrors.departurePoint = missingError
      if(!activityContent?.detail?.trackType) newFormErrors.trackType = missingError
      if(!activityContent?.detail?.exitPoint) newFormErrors.exitPoint = missingError
      if(!activityContent?.detail?.trackLength) newFormErrors.trackLength = missingError
      if(!activityContent?.detail?.altitude) newFormErrors.altitude = missingError
      if(!activityContent?.detail?.trackCondition) newFormErrors.trackCondition = missingError
      if(!activityContent?.detail?.belongingPark) newFormErrors.belongingPark = missingError
      if(!activityContent?.detail?.applicationNeeded) newFormErrors.applicationNeeded = missingError
      if(!activityContent?.detail?.trackIntroduction) newFormErrors.trackIntroduction = missingError
      if(!activityContent?.detail?.mapURL) newFormErrors.mapURL = missingError
      setFormErrors(newFormErrors)

      if(isStepThreeComplete) setFormProgress(formProgress + 1)
    }

    if(formProgress === 4){
      let isStepFourComplete =  
        activityContent?.transportation?.outbound &&
        activityContent?.transportation?.inbound 

      const accommodation = activityContent.accommodation

      for(let i = 0; i < accommodation.length; i++){
        const currentAccommodation = accommodation[i]

        const isCurrentAccommodationComplete = 
        currentAccommodation.date &&
        currentAccommodation.name &&
        currentAccommodation.address &&
        currentAccommodation.roomDetail &&
        currentAccommodation.notes

        isStepFourComplete = isStepFourComplete && isCurrentAccommodationComplete 
      }

      const newFormErrors = {}
      if(!activityContent?.transportation?.outbound) newFormErrors.outbound = missingError
      if(!activityContent?.transportation?.inbound) newFormErrors.inbound = missingError

      if (!newFormErrors.accommodation) newFormErrors.accommodation = []
      for(let i = 0; i < accommodation.length; i++){
        const currentAccommodation = accommodation[i]

        newFormErrors.accommodation[i] = {};
        if(!currentAccommodation?.date) newFormErrors.accommodation[i].date= missingError
        if(!currentAccommodation?.name) newFormErrors.accommodation[i].name = missingError
        if(!currentAccommodation?.address) newFormErrors.accommodation[i].address = missingError
        if(!currentAccommodation?.roomDetail) newFormErrors.accommodation[i].roomDetail = missingError
        if(!currentAccommodation?.notes) newFormErrors.accommodation[i].notes = missingError
      }

      setFormErrors(newFormErrors)
      if(isStepFourComplete) setFormProgress(formProgress + 1)
    }
  }

  const handleDeleteActivity = () => {
    setIsDeleteConfirmModalOpen(true)
  }

  const handleConfirmDeleteClick = async() => {
    setIsActivityDeleteLoading(true)
    const { success } = await deleteActivity( userId, currentActivity )
    setIsActivityDeleteLoading(false)

    if(success){
      setIsDeleteConfirmModalOpen(false)
      setIsActivityUpdateModalOpen(false)
      navigate(`/user/${userId}`)
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
    }else{
      setIsActivityUpdateModalOpen(false)
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
    const isStepFiveComplete = activityContent?.detail?.schedule

    const newFormErrors = {}
    if(!activityContent?.detail?.schedule) newFormErrors.schedule = missingError
    setFormErrors(newFormErrors)

    if(isStepFiveComplete){
      setIsActivityUpdateLoading(true)
      let updatedActivity = activityContent
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
      updatedActivity.updateAt = updateAt
      setIsActivityUpdateLoading(false)

      if(success){
        setIsActivityUpdateModalOpen(false)
        setFormProgress(1)
        setActivity(updatedActivity)
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
      }else{
        setIsActivityUpdateModalOpen(false)
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
        >
        {
          isActivityDeleteLoading
          ? <StyledLoading title="活動刪除中"/>
          : "確認要刪除嗎?"
        }
        </StyledConfirmModal>
        <CrossIcon className="o-modal__close-icon" onClick={closeModal}/>
      </div>

      <div className='l-modal__body'>

        <StyledActivityCreateStepDisplay formProgress={formProgress}/>

        <form className='l-modal__form-container'>
          {
            (formProgress === 1 && !isActivityUpdateLoading) &&
            <StyledActivityCreateStepOne 
              formContent={activityContent} 
              onFormChange={setActivityContent}
              formErrors={formErrors}
              setFormErrors={setFormErrors}
            />
          }
          {
            (formProgress === 2 && !isActivityUpdateLoading) && 
            <StyledActivityCreateStepTwo 
              formContent={activityContent} 
              onFormChange={setActivityContent} 
              formErrors={formErrors}
              setFormErrors={setFormErrors}
            />
          }
          {
            (formProgress === 3 && !isActivityUpdateLoading) &&
            <StyledActivityCreateStepThree 
              formContent={activityContent} 
              onFormChange={setActivityContent}
              formErrors={formErrors}
              setFormErrors={setFormErrors}
            />
          }
          {
            (formProgress === 4 && !isActivityUpdateLoading) &&
            <StyledActivityCreateStepFour 
              formContent={activityContent} 
              onFormChange={setActivityContent}
              formErrors={formErrors}
              setFormErrors={setFormErrors}      
            />
          }
          {
            (formProgress === 5 && !isActivityUpdateLoading) &&
            <StyledActivityCreateStepFive 
              formContent={activityContent} 
              onFormChange={setActivityContent}
              formErrors={formErrors}
              setFormErrors={setFormErrors}
            />
          }
          { isActivityUpdateLoading && <StyledLoading className="o-activity-update__loading" title="活動更新中"/> }
        </form>
        
        <div className='l-modal__controls'>
          {formProgress !== 1 && !isActivityUpdateLoading && 
            <StyledButton onClick={handlePreviousPageClick} >前一頁</StyledButton>
          }
          {formProgress < 5 && !isActivityUpdateLoading 
            ? <StyledButton onClick={handleNextPageClick} >下一頁</StyledButton>
            : <StyledButton onClick={handleActivityUpdate} >更新活動</StyledButton>
          }
        </div>
      </div>

    </Modal>
  )
}

const StyledActivityUpdateModal = styled(ActivityUpdateModal)`
  .l-modal__body{
    .l-modal__form-container{
      display: flex;
      flex-direction: column;
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

      .o-activity-update__loading{
        margin: auto 0;
        justify-self: center;
      }
    }
  }

  @media screen and (min-width: 768px) {
    width: 50vw;
  }
`

export default StyledActivityUpdateModal