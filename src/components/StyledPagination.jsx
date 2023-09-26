import styled, { css } from "styled-components";

import {ReactComponent as ReturnIcon} from "assets/icons/ReturnIcon.svg"
import {ReactComponent as NextIcon} from "assets/icons/NextIcon.svg"

const Pagination = ({className, lightTheme}) => {
  return(
    <div className={className}>
      <ReturnIcon/>
        <ul>
          <li><input type="radio" name="activities-pagination" id="page-1" defaultChecked/><label htmlFor="page-1">1</label></li>
          <li><input type="radio" name="activities-pagination" id="page-2" /><label htmlFor="page-2">2</label></li>
          <li><input type="radio" name="activities-pagination" id="page-3" /><label htmlFor="page-3">3</label></li>
          <li><input type="radio" name="activities-pagination" id="page-4" /><label htmlFor="page-4">4</label></li>
          <li><input type="radio" name="activities-pagination" id="page-5" /><label htmlFor="page-5">5</label></li>
        </ul>
      <NextIcon/>
    </div>
  )
}

const StyledPagination = styled(Pagination)`
  display: flex;
  align-items: center;
  gap: .5rem;
  margin: 1rem 0;

  svg{
    width: 1rem;
    height: 1rem;
  }

  ul{
    display: flex;
    gap: .5rem;

    li{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;

      input{
        display: none;
      }

      label{
        font-weight: 500;
        cursor: pointer;
      }

      &:has(input:checked){
        background-color: ${({theme})=>theme.color.default};

        label{
          color: white;
        }
      }
    }
  }

  ${props=> props.lightTheme && css`
    svg{
      fill: white;
    }

    ul li{

      label{
        color: white;
      }

      &:has(input:checked){
        background-color: ${({theme})=>theme.backgroundColor.default};

        label{
          color: ${({theme})=>theme.color.default};
        }
      }
      
    }

  `}
`

export default StyledPagination