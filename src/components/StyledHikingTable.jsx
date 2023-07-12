import { useSelector } from "react-redux"
import styled from "styled-components"

const HikingTable = ({className,inputUsed}) => {
    const environmentParams = useSelector((state) => state.environment)
    const isMediumLayout = environmentParams.windowSize === "medium" || environmentParams.windowSize === "large"
    
  return(
    <>
      {isMediumLayout ? 
        <table className={className}>
          <tbody>
            <tr>
              <td className="c-table-key o-activity-key">出發地點</td>
              <td className="c-table-content o-activity-content">
                {inputUsed? 
                  <input type="text" id="create-activity-departure" placeholder="請輸入出發地點"/> 
                  : "上東埔停車場"}
              </td>
              <td className="c-table-key o-activity-key">步道類型</td>
              <td className="c-table-content o-activity-content">
                {inputUsed? 
                <select>
                  <option>郊山步道</option>
                  <option>中級山步道</option>
                  <option>高山步道</option>
                </select>
                :"中級山步道"}
              </td>
            </tr>
            <tr>
                <td className="c-table-key o-activity-key">步道難度</td>
                <td className="c-table-content o-activity-content">
                  {inputUsed?
                    <select>
                      <option>一星：入門</option>
                      <option>二星：中等</option>
                      <option>三星：進階</option>
                      <option>四星：專家</option>
                      <option>五星：大師</option>
                    </select>
                    :"★★☆☆☆"
                  }
                </td>
                <td className="c-table-key o-activity-key">步道走法</td>
                <td className="c-table-content o-activity-content">
                  {inputUsed?
                    <select>
                      <option>環狀路線</option>
                      <option>原路折返</option>
                      <option>雙向進出</option>
                    </select>
                    :"環狀路線"}
                </td>
            </tr>
            <tr>
                <td className="c-table-key o-activity-key">路徑長度</td>
                <td className="c-table-content o-activity-content">
                  {inputUsed?
                    <div className="c-number-input__with-unit">
                      <input type="number"/>
                      <label>公里</label>
                    </div>
                    :"11公里"
                  }
                </td>
                <td className="c-table-key o-activity-key">高度落差</td>
                <td className="c-table-content o-activity-content">
                  {inputUsed?
                    <div className="c-number-input__with-unit">
                      <input type="number"/>
                      <label>公尺</label>
                    </div>
                    :"283公尺"
                  }
                </td>
            </tr>
            <tr>
                <td className="c-table-key o-activity-key">所需時間</td>
                <td className="c-table-content o-activity-content">
                  {inputUsed?
                    <div className="c-time-length-input">
                      <div className="c-number-input__with-unit">
                        <input type="number"/>
                        <label>小時</label>
                      </div>
                      <div className="c-number-input__with-unit">
                        <input type="number"/>
                        <label>分鐘</label>
                      </div>
                    </div>
                    :"5小時30分鐘"
                  }
                
                </td>
              <td className="c-table-key o-activity-key">路面狀況</td>
              <td className="c-table-content o-activity-content">
                {inputUsed?
                  <input placeholder="柏油路、原始山徑、石階、木棧道"/>
                  :"柏油路、原始山徑、石階、木棧道"
                }
              </td>
            </tr>
            <tr>
                <td className="c-table-key o-activity-key">入園申請</td>
                <td className="c-table-content o-activity-content">
                  <input type="radio"/><label>是</label>
                  <input type="radio"/><label>否</label>
                </td>
                <td className="c-table-key o-activity-key">所屬園區</td>
                <td className="c-table-content o-activity-content">玉山國家公園</td>
            </tr>
            <tr>
              <td className="c-table-key o-activity-key" colSpan={1}>路線資訊</td>
              <td className="c-table-content o-activity-content" colSpan={3}>
                {inputUsed?
                  <textarea />
                  :"信義路五段150巷22弄→(0.05K,2分鐘)→靈雲宮→(0.5K,35分鐘)→六巨石→(0.1K, 8分鐘)→逸賢亭(象山頂)→(0.25K, 10分鐘)→打印台→(0.6K, 35分鐘)→永春崗公園"
                }
              </td>
            </tr>
            <tr>
              <td className="c-table-key o-activity-key" colSpan={4}>路徑地圖</td>
            </tr>
            <tr>
              <td className="c-table-content o-activity-content" colSpan={4}>
                <img className="o-activity-table__image" src="https://farm4.static.flickr.com/3616/3368789043_3f745faa30_b.jpg" alt="hiking map"/>
              </td>
            </tr>        
          </tbody>
        </table>
        :
        <table className={className}>
          <tbody>
            <tr>
                <td className="c-table-key o-activity-key">出發地點</td>
                <td className="c-table-content o-activity-content">{inputUsed? <input type="text" id="create-activity-departure" placeholder="請輸入出發地點"/>: "上東埔停車場"}</td>
            </tr>
            <tr>
              <td className="c-table-key o-activity-key">步道類型</td>
              <td className="c-table-content o-activity-content">中級山步道</td>
            </tr>
            <tr>
                <td className="c-table-key o-activity-key">步道難度</td>
                <td className="c-table-content o-activity-content">★★☆☆☆</td>
            </tr>
            <tr>
                <td className="c-table-key o-activity-key">步道走法</td>
                <td className="c-table-content o-activity-content">環狀</td>
            </tr>
            <tr>
                <td className="c-table-key o-activity-key">路徑長度</td>
                <td className="c-table-content o-activity-content">11公里</td>
            </tr>
            <tr>
                <td className="c-table-key o-activity-key">高度落差</td>
                <td className="c-table-content o-activity-content">283公尺</td>
            </tr>
            
            <tr>
                <td className="c-table-key o-activity-key">所需時間</td>
                <td className="c-table-content o-activity-content">5小時30分鐘</td>
            </tr>
            <tr>
              <td className="c-table-key o-activity-key">路面狀況</td>
              <td className="c-table-content o-activity-content">柏油路、原始山徑、石階、木棧道</td>
            </tr>
            <tr>
                <td className="c-table-key o-activity-key">所屬園區</td>
                <td className="c-table-content o-activity-content">玉山國家公園</td>
            </tr>
            <tr>
                <td className="c-table-key o-activity-key">入園申請</td>
                <td className="c-table-content o-activity-content">否</td>
            </tr>
            <tr>
              <td className="c-table-key o-activity-key" colSpan={2}>路線資訊</td>
            </tr>
            <tr>
              <td className="c-table-content o-activity-content" colSpan={2}>信義路五段150巷22弄→(0.05K,2分鐘)→靈雲宮→(0.5K,35分鐘)→六巨石→(0.1K, 8分鐘)→逸賢亭(象山頂)→(0.25K, 10分鐘)→打印台→(0.6K, 35分鐘)→永春崗公園</td>
            </tr>
            <tr>
              <td className="c-table-key o-activity-key" colSpan={2}>路徑地圖</td>
            </tr>
            <tr>
              <td className="c-table-content o-activity-content" colSpan={2}>
                <img className="o-activity-table__image" src="https://farm4.static.flickr.com/3616/3368789043_3f745faa30_b.jpg" alt="hiking map"/>
              </td>
            </tr>        
          </tbody>
        </table>
      }
    </>
  )
}

const StyledHikingTable = styled(HikingTable)`
  width: 100%;
  
  .o-activity-table__image{
    width: 100%;
  }

  @media screen and (min-width: 768px) {
    .o-activity-key{
      width: 12rem;
      white-space: nowrap;
    }
    
    .c-table-content{
      width: calc(50vw - 12rem);
    }
  }
`

export default StyledHikingTable