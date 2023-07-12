import styled from "styled-components";

import StyledButton from "components/StyledButton";
import StyledHorizontalActivityCard from "components/StyledHorizontalActivityCard";
import StyledActivityHistory from "components/StyledActivityHistory";

const ActivitySearchPage = ({ className }) => {
  return(
    <div className={className}>
      <div className="l-web-container__main">
        <div className="l-search-settings">
          <div className="l-search-settings__searchbar">
            <input type="text" placeholder="登山路線、露營地、潛水處"/>
            <StyledButton>搜尋</StyledButton>
          </div>
          <table className="l-search-settings__options">
            <tbody>
              <tr>
                <td className="c-table-key">區域</td>
                <td className="c-table-content">
                  <ul>
                    <li><input name="search-area" id="area-none" type="radio" defaultChecked/><label htmlFor="area-none">不限</label></li>
                    <li><input name="search-area" id="area-north" type="radio"/><label htmlFor="area-north">北部</label></li>
                    <li><input name="search-area" id="area-middle" type="radio"/><label htmlFor="area-middle">中部</label></li>
                    <li><input name="search-area" id="area-south" type="radio"/><label htmlFor="area-south">南部</label></li>
                    <li><input name="search-area" id="area-east" type="radio"/><label htmlFor="area-east">東部</label></li>
                    <li><input name="search-area" id="area-others" type="radio"/><label htmlFor="area-others">離島</label></li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="c-table-key">難度</td>
                <td className="c-table-content"> 
                  <ul>
                    <li><input name="search-difficulty" id="difficulty-none" type="radio" defaultChecked/><label htmlFor="difficulty-none">不限</label></li>
                    <li><input name="search-difficulty" id="difficulty-beginner" type="radio"/><label htmlFor="difficulty-beginner">入門</label></li>
                    <li><input name="search-difficulty" id="difficulty-intermediate" type="radio"/><label htmlFor="difficulty-intermediate">中等</label></li>
                    <li><input name="search-difficulty" id="difficulty-advanced" type="radio"/><label htmlFor="difficulty-advanced">進階</label></li>
                    <li><input name="search-difficulty" id="difficulty-expert" type="radio"/><label htmlFor="difficulty-expert">專業</label></li>
                    <li><input name="search-difficulty" id="difficulty-master" type="radio"/><label htmlFor="difficulty-master">大師</label></li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="c-table-key">時間</td>
                <td className="c-table-content ">
                  <ul>
                    <li><input name="search-time" id="time-none" type="radio" defaultChecked/><label htmlFor="time-none">不限</label></li>
                    <li><input name="search-time" id="time-short" type="radio"/><label htmlFor="time-short">3小時內</label></li>
                    <li><input name="search-time" id="time-half-day" type="radio"/><label htmlFor="time-half-day">半天</label></li>
                    <li><input name="search-time" id="time-whole-day" type="radio"/><label htmlFor="time-whole-day">全天</label></li>
                    <li><input name="search-time" id="time-overnight" type="radio"/><label htmlFor="time-overnight">兩天以上</label></li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="c-table-key">費用</td>
                <td className="c-table-content ">
                  <input type="number" min="0" max="10000" defaultValue="0" /> 元 - <input type="number" min="0" max="10000" defaultValue="10000" /> 元
                </td>
              </tr>
              
            </tbody>
          </table>
        </div>

        <div className="l-search-results">
          <h2 className="o-search-results__title">搜尋結果</h2>
          <div className="l-search-results__container">
            <StyledHorizontalActivityCard/>
            <StyledHorizontalActivityCard/>
            <StyledHorizontalActivityCard/>
            <StyledHorizontalActivityCard/>
            <StyledHorizontalActivityCard/>
            <StyledHorizontalActivityCard/>
            <StyledHorizontalActivityCard/>
            <StyledHorizontalActivityCard/>
            <StyledHorizontalActivityCard/>
            <StyledHorizontalActivityCard/>
          </div>
        </div>
      </div>

      <div className="l-web-container__side">
        <StyledActivityHistory />
      </div>
    </div>
  )
}

const StyledActivitySearchPage = styled(ActivitySearchPage)`
  width: 100%;
  height: 100%;

  .l-web-container__main{
    
    .l-search-settings{
      margin-top: 1rem;
      padding: 1.25rem;
      border-radius: .5rem;
      background-color: ${({theme})=> theme.backgroundColor.default};
      box-shadow: 0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .2);
      
      &__searchbar{
        display: flex;

        input{
          width: 80%;
          padding: 0 1rem;
          border-radius: .75rem 0 0 .75rem;
          border: none;
        }

        button{
          width: 20%;
          border-radius: 0 .75rem .75rem 0;
        }
      }

      &__options{
        margin-top: 1rem;

        td{
          border-color: ${({theme})=> theme.backgroundColor.default};
        }

        .c-table-key{
          width: 5rem;
          color: white;
          background-color: ${({theme})=> theme.color.default};
        }

        .c-table-content{
          ul{
            display: flex;
            flex-wrap: wrap;
            gap: .5rem;
            width: 100%;
            height: 100%;
            

            li{
              padding:.25rem .5rem;

              input{
                display: none;
              }
              
              label{
                font-size: 1rem;
              }

              &:has(input:checked){
                background-color: ${({theme}) => theme.color.default};
                border-radius: 1rem;

                label{
                  color: white;
                }
              }
            }
          }
        }
      }
    }

    .l-search-results .l-search-results__container{
      width:100%;
      margin-top: 1rem;
      
    }

    .l-search-results__container{
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 5rem;
    }

    .o-search-results__title{
      font-weight: 700;
      color: ${({theme})=>theme.color.default};
      margin-top: 2rem;
    }
  }

  .l-web-container__side{
    .o-activity-history__title{
    }
  }

  @media screen and (min-width: 1024px) {
    display: flex;
    justify-content: space-between;
  }
`

export default StyledActivitySearchPage