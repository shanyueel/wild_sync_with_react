import styled from "styled-components"

const ResidenceAndTransportationTable = ({className,isMediumLayout}) => {

  return(
    <>
      {isMediumLayout ? 
        <table className={className}>
          <tbody>
            <tr>
                <td className="o-activity-table__key" colSpan={4}>交通方式</td>
            </tr>
            <tr>
              <td className="o-activity-table__key" colSpan={1}>開車</td>
              <td className="o-activity-table__content" colSpan={3}>
                1.國道三號名間交流道→台16→水里→台21→信義→和社→塔塔加遊客中心→台18線108.7K上東埔停車場。<br />
                2.國道三號中埔交流道→台18→阿里山→台18線108.7K上東埔停車場。
              </td>
            </tr>
            <tr>
              <td className="o-activity-table__key" colSpan={1}>大眾運輸</td>
              <td className="o-activity-table__content" colSpan={3}>
                1.嘉義出發：嘉義市搭乘嘉義縣公車至阿里山後，再雇車至塔塔加遊憩區，或於阿里山森林遊樂區內搭乘員林客運「6739日月潭─阿里山線」，於塔塔加遊憩區「上東埔」站下車，步行即達登山口。<br />
                2.南投出發：搭乘員林客運「6739日月潭─阿里山線」，於「塔塔加遊客中心」下車，改由塔塔加遊客中心旁步道進入。或於「上東埔」站下車，步行即達登山口。
              </td>
            </tr>
            <tr>
              <td className="o-activity-table__divide" colSpan={4}></td>
            </tr>
            <tr>
              <td className="o-activity-table__key" colSpan={4}>住宿資訊</td>
            </tr>
            <tr>
              <td className="o-activity-table__key">住宿日期</td>
              <td className="o-activity-table__content">2023.07.01 星期六</td>
              <td className="o-activity-table__key">住宿名稱</td>
              <td className="o-activity-table__content">萌陽莊園</td>
            </tr>
            <tr>
              <td className="o-activity-table__key">住宿地點</td>
              <td className="o-activity-table__content">南投縣水里鄉安田路9號</td>
              <td className="o-activity-table__key">房價資訊</td>
              <td className="o-activity-table__content">
                -大通鋪: 1200元 / 人<br />
                -雙人房: 1400元 / 人
              </td>
            </tr>
            <tr>
                <td className="o-activity-table__key">提供車位</td>
                <td className="o-activity-table__content">有</td>
                <td className="o-activity-table__key">提供早餐</td>
                <td className="o-activity-table__content">無</td>
            </tr>
            <tr>
              <td className="o-activity-table__divide" colSpan={2}></td>
            </tr>
            <tr>
                <td className="o-activity-table__key">住宿日期</td>
                <td className="o-activity-table__content">2023.07.01 星期六</td>
                <td className="o-activity-table__key">住宿名稱</td>
                <td className="o-activity-table__content">萌陽莊園</td>
            </tr>
            <tr>
              <td className="o-activity-table__key">住宿地點</td>
              <td className="o-activity-table__content">南投縣水里鄉安田路9號</td>
              <td className="o-activity-table__key">房價資訊</td>
              <td className="o-activity-table__content">
                -大通鋪: 1200元 / 人<br />
                -雙人房: 1400元 / 人
              </td>
            </tr>
            <tr>
                <td className="o-activity-table__key">提供車位</td>
                <td className="o-activity-table__content">有</td>
                <td className="o-activity-table__key">提供早餐</td>
                <td className="o-activity-table__content">無</td>
            </tr>     
          </tbody>
        </table>
        :
        <table className={className}>
          <tbody>
            <tr>
                <td className="o-activity-table__key" colSpan={2}>交通方式</td>
            </tr>
            <tr>
              <td className="o-activity-table__key">開車</td>
              <td className="o-activity-table__content">
                1.國道三號名間交流道→台16→水里→台21→信義→和社→塔塔加遊客中心→台18線108.7K上東埔停車場。<br />
                2.國道三號中埔交流道→台18→阿里山→台18線108.7K上東埔停車場。
              </td>
            </tr>
            <tr>
              <td className="o-activity-table__key">大眾運輸</td>
              <td className="o-activity-table__content">
                1.嘉義出發：嘉義市搭乘嘉義縣公車至阿里山後，再雇車至塔塔加遊憩區，或於阿里山森林遊樂區內搭乘員林客運「6739日月潭─阿里山線」，於塔塔加遊憩區「上東埔」站下車，步行即達登山口。<br />
                2.南投出發：搭乘員林客運「6739日月潭─阿里山線」，於「塔塔加遊客中心」下車，改由塔塔加遊客中心旁步道進入。或於「上東埔」站下車，步行即達登山口。
              </td>
            </tr>
            <tr>
              <td className="o-activity-table__divide" colSpan={2}></td>
            </tr>
            <tr>
                <td className="o-activity-table__key" colSpan={2}>住宿資訊</td>
            </tr>
            <tr>
                <td className="o-activity-table__key">住宿日期</td>
                <td className="o-activity-table__content">2023.07.01 星期六</td>
            </tr>
            <tr>
                <td className="o-activity-table__key">住宿名稱</td>
                <td className="o-activity-table__content">萌陽莊園</td>
            </tr>
            <tr>
              <td className="o-activity-table__key">住宿地點</td>
              <td className="o-activity-table__content">南投縣水里鄉安田路9號</td>
            </tr>
            <tr>
                <td className="o-activity-table__key">房價資訊</td>
                <td className="o-activity-table__content">
                  -大通鋪: 1200元 / 人<br />
                  -雙人房: 1400元 / 人
                </td>
            </tr>
            <tr>
                <td className="o-activity-table__key">提供車位</td>
                <td className="o-activity-table__content">有</td>
            </tr>
            <tr>
                <td className="o-activity-table__key">提供早餐</td>
                <td className="o-activity-table__content">無</td>
            </tr>
            <tr>
              <td className="o-activity-table__divide" colSpan={2}></td>
            </tr>
            <tr>
                <td className="o-activity-table__key">住宿日期</td>
                <td className="o-activity-table__content">2023.07.02 星期日</td>
            </tr>
            <tr>
                <td className="o-activity-table__key">住宿名稱</td>
                <td className="o-activity-table__content">萌陽莊園</td>
            </tr>
            <tr>
              <td className="o-activity-table__key">住宿地點</td>
              <td className="o-activity-table__content">南投縣水里鄉安田路9號</td>
            </tr>
            <tr>
                <td className="o-activity-table__key">房價資訊</td>
                <td className="o-activity-table__content">
                  -大通鋪: 1200元 / 人<br />
                  -雙人房: 1400元 / 人
                </td>
            </tr>
            <tr>
                <td className="o-activity-table__key">提供車位</td>
                <td className="o-activity-table__content">有</td>
            </tr>
            <tr>
                <td className="o-activity-table__key">提供早餐</td>
                <td className="o-activity-table__content">無</td>
            </tr>      
          </tbody>
        </table>
      }
    </>
  )
}

const StyledResidenceAndTransportationTable = styled(ResidenceAndTransportationTable)`
  width:100%;
  
  td{
    vertical-align: middle;
    padding: .75rem .75rem;
    border: 1.5px solid ${({theme})=> theme.color.default};
    line-height: 1.5rem;
  }

  .o-activity-table__key{
    text-align: center;
    width: 9rem;
    font-weight: 700;
    color: ${({theme})=> theme.color.default};
    background-color: ${({theme})=> theme.backgroundColor.default};
  }

  .o-activity-table__content{
    background-color: white;
    white-space: pre-wrap;
  }

  .o-activity-table__divide{
    height: .5rem;
    padding: 0;
  }

  @media screen and (min-width: 768px) {
    .o-activity-table__key{
      width: 12rem;
    }
    
    .o-activity-table__content{
      width: calc(50vw - 9rem);
    }
  }
`

export default StyledResidenceAndTransportationTable