import styled from "styled-components";
import StyledUserInfo from "./StyledUserInfo";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const UserCard = ({className}) => {
  const environmentParams = useSelector(state=>state.environment)
  const windowSize = environmentParams.windowSize
  const [isLargeLayout, setIsLargeLayout] = useState(false)

  useEffect(()=>{
    const setWindowSize = () => {
      setIsLargeLayout(windowSize === "large")
    }
    setWindowSize()
  })

  return(
    <div className={className}>
      <StyledUserInfo cardUsed={!isLargeLayout}/>
      <p className="o-user-card__introduction">我是一位熱愛登山的夢想家。希望能在這個平台上結交志同道合的夥...</p>
    </div>
  )
}

const StyledUserCard = styled(UserCard)`
  width: 10rem;
  height: 14rem;
  padding: 1rem .75rem;
  border-radius: .5rem;
  background-color: ${({theme})=>theme.backgroundColor.default};
  box-shadow: 0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1);


  .o-user-card__introduction{
    margin-top: .5em;
  }

  @media screen and (min-width: 1024px) {
    width: 100%;
    height: 7.5rem;
    padding: 1rem .75rem;
  }

`

export default StyledUserCard