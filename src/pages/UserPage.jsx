import { useEffect, useState } from "react"
import styled from "styled-components"
import clsx from "clsx"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import { getPopularUsersList, getUser } from "api/userApi"
import { getActivitiesByIdList } from "api/activityApi"

import StyledButton from "components/StyledButton"
import StyledActivityListItem from "components/StyledActivityListItem"
import StyledUserCard from "components/StyledUserCard"
import StyledUserEditModal from "modals/StyledUserEditModal"

const UserPage = ({className}) => {
  const navigate = useNavigate()
  const user = useSelector(state=> state.user)
  const environmentParams = useSelector(state => state.environment)
  const userId = user.uid
  const selectedUserId = useParams().userId
  const windowSize = environmentParams.windowSize
  const [isUserEditModalOpen, setIsUserEditModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState({})
  const [isLargeLayout, setIsLargeLayout] = useState(false)
  const [popularUsers, setPopularUsers] = useState([])
  const [selectedActivityNav, setSelectedActivityNav] = useState("participation")
  const [activities, setActivities] = useState([])

  useEffect(()=>{
   const setWindowSize = () => {
    setIsLargeLayout(windowSize === "large")
   } 
   setWindowSize()
  },[windowSize])

  useEffect(()=>{
    const getSelectedUser = async(id) => {
      const user = await getUser(id)
      if(user){
        setSelectedUser(user)
      }else{
        navigate("/*")
      }
    }
    const getPopularUsers = async() => {
      const popularUsersList = await getPopularUsersList()
      setPopularUsers(popularUsersList)
    }
    getSelectedUser(selectedUserId)
    getPopularUsers()
   
  },[selectedUserId, navigate])

  useEffect(()=>{
    const getActivities = async() => {
      const selectedActivities = await getActivitiesByIdList(selectedUser?.[selectedActivityNav])
      setActivities(selectedActivities)
    }
    getActivities()
  },[selectedUser,selectedActivityNav])

  const handleUserEdit = () => {
    setIsUserEditModalOpen(true)
    document.querySelector('body').classList.add('no-scroll');
    document.querySelector('html').classList.add('no-scroll');
  }

  const calculateAge = (birthTimeStamp) => {
    const currentTimeStamp = Date.now()
    const age = Math.floor((currentTimeStamp - birthTimeStamp) / (1000 * 60 * 60 * 24 * 365.25))
    return age
  }

  const handleActivitiesChange = (e) => {
    setSelectedActivityNav(e.target.id)
  }

  return(
    <div className={className}>
      <div className="l-web-container__main l-user">

        <div className="l-user__image">
          <img className="o-user__cover" src={selectedUser?.coverURL} alt="user-cover"/>
          <img className="o-user__avatar" src={selectedUser?.photoURL} alt="user-avatar"/>
        </div>
        <div className="l-user__info">
          <div className="l-user__title">
            <h1 className="o-user__name">{selectedUser?.displayName}</h1>
            <h3 className="o-user__email">{selectedUser?.email}</h3>
          </div>
          <div className="l-user__brief">
            <h3 className="o-user__region">{selectedUser?.region}</h3>
            <h3 className="o-user__age">{`${calculateAge(selectedUser?.birth)}歲`}</h3>
            <h3 className="o-user__profession">{selectedUser?.profession}</h3>
          </div>
          <p className="o-user__introduction">{selectedUser?.introduction}</p>
          {selectedUserId === userId && 
            <>
              <StyledButton className="o-user__edit" onClick={handleUserEdit} outlined>更新資料</StyledButton>
              <StyledUserEditModal 
                isUserEditModalOpen={isUserEditModalOpen} 
                setIsUserEditModalOpen={setIsUserEditModalOpen}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
              />
            </>
          }

        </div>
          
        <div className="l-user-activities">

          <div className="l-user-activities__navbar">
            <label htmlFor="attendedActivities" className="o-user-activities__nav-item" onChange={handleActivitiesChange}>
              <input type="radio" name="user-activities" id="attendedActivities" defaultChecked />參與紀錄
            </label>
            <label htmlFor="likedActivities" className="o-user-activities__nav-item" onChange={handleActivitiesChange}>
              <input type="radio" name="user-activities" id="likedActivities" />收藏活動
            </label>
            <label htmlFor="heldActivities" className="o-user-activities__nav-item" onChange={handleActivitiesChange}>
              <input type="radio" name="user-activities" id="heldActivities" />主辦經驗
            </label>
          </div>
          
          <div className="l-user-activities__container">
            {
              activities?.length > 0 ?
              activities?.map(activity=><StyledActivityListItem key={activity?.id} activity={activity}/>)
              :<h2 className="o-user-activities__empty">目前找不到相關活動</h2>
            }
          </div>

        </div>

      </div>

      <div className="l-web-container__side l-holder-recommendation">
      
        <h2 className="o-holder-recommendation__title">熱門主辦者</h2>
        <div className={clsx("l-holder-recommendation__container",{"scrollbar-x":!isLargeLayout})}>
          <div className="l-holder-recommendation__holders">
            {popularUsers && popularUsers?.map(user => <StyledUserCard key={user?.uid} user={user} listItem={isLargeLayout}/>)}
          </div>
        </div>

      </div>

    </div>
  )
}

const StyledUserPage = styled(UserPage)`
  width: 100%;
  height: 100%;

  .l-user{
    padding-top: calc(100vw * 9 / 16 + 3rem);

    .l-user__image{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      padding-bottom: 2rem;

      .o-user__cover{
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
      }

      .o-user__avatar{
        position: absolute;
        bottom: 0;
        left: 1.5rem;
        width: 7.5rem;
        height: 7.5rem;
        border-radius: 50%;
        border: 10px solid ${({theme})=>theme.color.default};
        z-index: 1;
      }
    }
    
    .l-user__info{
      position: relative;
      padding: 0 1rem;

      .l-user__brief{
        position: relative;
        margin-top: .5rem;
        display: flex;
        gap: 1rem;

        h3{
          color: ${({theme})=>theme.color.grey};
        }

        h3::after{
          content: "";
          position: absolute;
          margin-left:.35rem;
          width: 5px;
          height: 1.5px;
          background-color: ${({theme})=>theme.color.grey};
          top: 50%;
          transform: translate(0,-50%);
        }

        h3:last-child::after{
          display: none;
        }
      }
    }

    .o-user{
      &__name, &__email{
        color: ${({theme})=> theme.color.default};
      }

      &__email{
        margin-top: .25rem;
      }

      &__introduction{
        margin-top: 1rem;
      }

      &__edit{
        position: absolute;
        width: 30%;
        top: 0;
        right: 1rem;
      }
    }
    
    .l-user-activities{
      &__navbar{
        display: grid;
        grid-template-columns: repeat(3,1fr);
        gap: .25rem;
        margin-top: 2rem;
        
        .o-user-activities__nav-item{
          position: relative;
          height: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          font-weight: 700;
          border-radius: .5rem .5rem 0 0;
          color: ${({theme})=> theme.color.default};
          background-color: ${({theme})=> theme.backgroundColor.default};
          cursor: pointer;

          input{
            display: none;
          }

          label{

          }

          &:has(input:checked){
            background-color: ${({theme})=> theme.color.default};
              color: white;            

            &::after{
              position: absolute;
              content:"";
              background-color: ${({theme})=> theme.color.default};
              width: 100%;
              height: 1rem;
              top: 2.75rem;
              left: 0;
              right: 0;
            }
          } 
        }
      }

      &__container{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: .75rem;
        margin-top: .5rem;
        padding: 1rem .75rem;
        background-color: ${({theme})=>theme.color.default};
        margin-bottom: 5rem;
        border-radius: 0 0 .5rem .5rem;


        .o-user-activities__empty{
          color: white;
          margin: 2.5rem;
        }
      }
    }
  }

  .l-web-container__side{
    margin-bottom: 3rem;

    .o-holder-recommendation__title{
      color: ${({theme})=>theme.color.default};
      font-weight: 700;
    }

    .l-holder-recommendation__container{
      margin-top: 1rem;

      .l-holder-recommendation__holders{
        display: flex;
        width: fit-content;
        gap: .75rem;
      }
    }
  }

  @media screen and (min-width: 768px) {
    .l-user{
      padding-top: calc(100vw * 9 / 21 + 3rem);

      .l-user__image{
        .o-user__cover{
          aspect-ratio: 21 / 9;
        }

        .o-user__avatar{
          width: 9rem;
          height: 9rem;
        }
      }
    }
  }

  @media screen and (min-width: 1024px) {
    display: flex;
    justify-content: space-between;

    .l-user{
      padding-top: 0;

      .l-user__image{
        position: relative;

        .o-user__cover{
          aspect-ratio: 32 / 9;
        }
      }

      .l-user__info{
        margin-top: 1rem;
      }
    }

    .l-holder-recommendation__container{
      
      .l-holder-recommendation__holders{
        flex-direction: column;
      }
    }
  }
`

export default StyledUserPage