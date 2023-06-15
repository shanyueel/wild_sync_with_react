import styled from "styled-components"

const ActivityTable = ({className,isMediumLayout}) => {

  return(
    <>
      {isMediumLayout ? 
        <table className={className}>
          <tbody>
            <tr>
              <td className="o-activity-table__key">出發地點</td>
              <td className="o-activity-table__content">上東埔停車場</td>
              <td className="o-activity-table__key">步道類型</td>
              <td className="o-activity-table__content">中級山步道</td>
            </tr>
            <tr>
                <td className="o-activity-table__key">步道難度</td>
                <td className="o-activity-table__content">★★☆☆☆</td>
                <td className="o-activity-table__key">步道走法</td>
                <td className="o-activity-table__content">環狀</td>
            </tr>
            <tr>
                <td className="o-activity-table__key">路徑長度</td>
                <td className="o-activity-table__content">11公里</td>
                <td className="o-activity-table__key">高度落差</td>
                <td className="o-activity-table__content">283公尺</td>
            </tr>
            <tr>
                <td className="o-activity-table__key">所需時間</td>
                <td className="o-activity-table__content">5小時30分鐘</td>
              <td className="o-activity-table__key">路面狀況</td>
              <td className="o-activity-table__content">柏油路、原始山徑、石階、木棧道</td>
            </tr>
            <tr>
                <td className="o-activity-table__key">所屬園區</td>
                <td className="o-activity-table__content">玉山國家公園</td>
                <td className="o-activity-table__key">入園申請</td>
                <td className="o-activity-table__content">否</td>
            </tr>
            <tr>
              <td className="o-activity-table__key" colSpan={1}>路線資訊</td>
              <td className="o-activity-table__content" colSpan={3}>信義路五段150巷22弄→(0.05K,2分鐘)→靈雲宮→(0.5K,35分鐘)→六巨石→(0.1K, 8分鐘)→逸賢亭(象山頂)→(0.25K, 10分鐘)→打印台→(0.6K, 35分鐘)→永春崗公園</td>
            </tr>
            <tr>
              <td className="o-activity-table__key" colSpan={4}>路徑地圖</td>
            </tr>
            <tr>
              <td className="o-activity-table__content" colSpan={4}>
                <img className="o-activity-table__image" src="https://farm4.static.flickr.com/3616/3368789043_3f745faa30_b.jpg" alt="hiking map"/>
              </td>
            </tr>        
          </tbody>
        </table>
        :
        <table className={className}>
          <tbody>
            <tr>
                <td className="o-activity-table__key">出發地點</td>
                <td className="o-activity-table__content">上東埔停車場</td>
            </tr>
            <tr>
              <td className="o-activity-table__key">步道類型</td>
              <td className="o-activity-table__content">中級山步道</td>
            </tr>
            <tr>
                <td className="o-activity-table__key">步道難度</td>
                <td className="o-activity-table__content">★★☆☆☆</td>
            </tr>
            <tr>
                <td className="o-activity-table__key">步道走法</td>
                <td className="o-activity-table__content">環狀</td>
            </tr>
            <tr>
                <td className="o-activity-table__key">路徑長度</td>
                <td className="o-activity-table__content">11公里</td>
            </tr>
            <tr>
                <td className="o-activity-table__key">高度落差</td>
                <td className="o-activity-table__content">283公尺</td>
            </tr>
            
            <tr>
                <td className="o-activity-table__key">所需時間</td>
                <td className="o-activity-table__content">5小時30分鐘</td>
            </tr>
            <tr>
              <td className="o-activity-table__key">路面狀況</td>
              <td className="o-activity-table__content">柏油路、原始山徑、石階、木棧道</td>
            </tr>
            <tr>
                <td className="o-activity-table__key">所屬園區</td>
                <td className="o-activity-table__content">玉山國家公園</td>
            </tr>
            <tr>
                <td className="o-activity-table__key">入園申請</td>
                <td className="o-activity-table__content">否</td>
            </tr>
            <tr>
              <td className="o-activity-table__key" colSpan={2}>路線資訊</td>
            </tr>
            <tr>
              <td className="o-activity-table__content" colSpan={2}>信義路五段150巷22弄→(0.05K,2分鐘)→靈雲宮→(0.5K,35分鐘)→六巨石→(0.1K, 8分鐘)→逸賢亭(象山頂)→(0.25K, 10分鐘)→打印台→(0.6K, 35分鐘)→永春崗公園</td>
            </tr>
            <tr>
              <td className="o-activity-table__key" colSpan={2}>路徑地圖</td>
            </tr>
            <tr>
              <td className="o-activity-table__content" colSpan={2}>
                <img className="o-activity-table__image" src="https://farm4.static.flickr.com/3616/3368789043_3f745faa30_b.jpg" alt="hiking map"/>
              </td>
            </tr>        
          </tbody>
        </table>
      }
    </>
  )
}

const StyledActivityTable = styled(ActivityTable)`
  width: 100%;
  
  td{
    vertical-align: middle;
    padding: .75rem .75rem;
    border: 1.5px solid ${({theme})=> theme.color.default};
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
  
  .o-activity-table__image{
    width: 100%;
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

export default StyledActivityTable