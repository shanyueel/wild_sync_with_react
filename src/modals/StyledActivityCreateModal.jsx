import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from "styled-components";
import { doc } from 'firebase/firestore';

import { getRandomId, postActivity } from 'api/activityApi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { uploadImage } from 'api/storageApi';
import { firestoreDB } from 'api/firebaseConfig';

import StyledButton from 'components/StyledButton';
import StyledActivityCreateStepOne from 'components/formSteps/StyledActivityCreateStepOne';
import StyledActivityCreateStepTwo from 'components/formSteps/StyledActivityCreateStepTwo';
import StyledActivityCreateStepThree from 'components/formSteps/StyledActivityCreateStepThree';
import StyledActivityCreateStepFour from 'components/formSteps/StyledActivityCreateStepFour';
import StyledActivityCreateStepFive from 'components/formSteps/StyledActivityCreateStepFive';
import StyledActivityCreateStepDisplay from 'components/formSteps/StyledActivityCreateStepDisplay';
import StyledLoading from 'components/StyledLoading';

import {ReactComponent as CrossIcon} from "assets/icons/CrossIcon.svg"

const ActivityCreateModal = ({className, isActivityCreateModalOpen, setIsActivityCreateModalOpen}) => {
  const navigate = useNavigate()
  const missingError = "*此欄位不可為空白"
  const user = useSelector(state => state.user)
  const userId = user.uid
  const [activityContent, setActivityContent] = useState({})
  const [formProgress, setFormProgress] = useState(1)
  const [formErrors, setFormErrors] = useState({})
  const [isActivityCreateLoading, setIsActivityCreateLoading] = useState(false)

  const closeModal = async() => {
    setFormProgress(1)
    setIsActivityCreateModalOpen(false)
  }

  const handleClearData = async() => {
    setActivityContent({})
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

  const handleActivityCreate = async() => {
    const isStepFiveComplete = activityContent?.detail?.schedule

    const newFormErrors = {}
    if(!activityContent?.detail?.schedule) newFormErrors.schedule = missingError
    setFormErrors(newFormErrors)

    if(isStepFiveComplete) {
      setIsActivityCreateLoading(true)
      const activityId = await getRandomId()
      let updateCoverURL = null
      let updateMapURL = null

      if(activityContent?.coverURLFile) updateCoverURL = await uploadImage("activities-covers",`${activityId}-cover`, activityContent?.coverURLFile)
      if(activityContent?.detail?.mapURLFile) updateMapURL = await uploadImage("activities-maps", `${activityId}-map`, activityContent?.detail?.mapURLFile)
      
      delete activityContent?.coverURLFile
      delete activityContent?.detail?.mapURLFile
      URL.revokeObjectURL(activityContent?.coverURL)
      URL.revokeObjectURL(activityContent?.detail?.mapURL)

      const createActivityContent = {
        ...activityContent,
        coverURL: updateCoverURL,
        detail:{
          ...activityContent?.detail,
          mapURL: updateMapURL,
        }
      }

      const { success } = await postActivity(activityId, doc(firestoreDB, "users", `${userId}`), createActivityContent)
      setIsActivityCreateLoading(false)
      
      if(success){
        setIsActivityCreateModalOpen(false)
        setFormProgress(1)
        setFormErrors({})
        setActivityContent({})
        navigate(`activity/${activityId}`)
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
      }else{
        setFormProgress(1)
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
        <StyledButton onClick={handleClearData} alertOutlined sm>清空填入資料</StyledButton>
        <CrossIcon className="o-modal__close-icon" onClick={closeModal}/>
      </div>

      <div className='l-modal__body'>

        <StyledActivityCreateStepDisplay formProgress={formProgress}/>

        <form className='l-modal__form-container'>
          {
            (formProgress === 1 && !isActivityCreateLoading) &&
            <StyledActivityCreateStepOne 
              formContent={activityContent} 
              onFormChange={setActivityContent}
              formErrors={formErrors}
              setFormErrors={setFormErrors}
            />
          }
          {
            (formProgress === 2 && !isActivityCreateLoading) &&
            <StyledActivityCreateStepTwo 
              formContent={activityContent} 
              onFormChange={setActivityContent} 
              formErrors={formErrors}
              setFormErrors={setFormErrors}
            />
          }
          {
            (formProgress === 3 && !isActivityCreateLoading) &&
            <StyledActivityCreateStepThree 
              formContent={activityContent} 
              onFormChange={setActivityContent}
              formErrors={formErrors}
              setFormErrors={setFormErrors}
            />
          }
          {
            (formProgress === 4 && !isActivityCreateLoading) &&
            <StyledActivityCreateStepFour 
              formContent={activityContent} 
              onFormChange={setActivityContent} 
              formErrors={formErrors}
              setFormErrors={setFormErrors} 
            />
          }
          {
            (formProgress === 5 && !isActivityCreateLoading) &&
            <StyledActivityCreateStepFive 
              formContent={activityContent} 
              onFormChange={setActivityContent} 
              formErrors={formErrors}
              setFormErrors={setFormErrors}
            />
          }
          { isActivityCreateLoading && <StyledLoading className="o-activity-create__loading" title="活動建立中"/> }
        </form>

        <div className='c-activity-create__pagination'>
          {formProgress !== 1 && !isActivityCreateLoading && <StyledButton onClick={handlePreviousPageClick} >前一頁</StyledButton>}
          {
            formProgress < 5  && !isActivityCreateLoading
            ? <StyledButton onClick={handleNextPageClick} >下一頁</StyledButton>
            : <StyledButton onClick={handleActivityCreate} >建立活動</StyledButton>
          }
        </div>
      </div>

    </Modal>
  )
}

const StyledActivityCreateModal = styled(ActivityCreateModal)`
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

      .o-activity-create__loading{
        margin: auto 0;
        justify-self: center;
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