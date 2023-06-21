import styled from "styled-components"

const OthersTable = ({className}) => {

  return(
    <>
        <table className={className}>
          <tbody>
            <tr>
              <td className="o-activity-table__key">詳細行程</td>
            </tr>
            <tr>
              <td className="o-activity-table__content">
                <p className="o-activity-content">
                  成功登山人<br />
                  時間: 2023/07/02 (日)<br />
                  09:00 - 13:00<br />
                  地點：塔塔加遊客中心<br />
                  費用：無<br />
                  程度：初階<br />
                  <br />
                  提醒：<br />
                  記得自備登山裝備、換洗衣物
                </p>
              </td>
            </tr>
            <tr>
              <td className="o-activity-table__key">備註</td>
            </tr>
            <tr>
              <td className="o-activity-table__content">
                中級山步道
              </td>
            </tr>
          </tbody>
        </table>
    </>
  )
}

const StyledOthersTable = styled(OthersTable)`
  width: 100%;
  
  td{
    width: 100%;
    vertical-align: middle;
    padding: .75rem .75rem;
    border: 1.5px solid ${({theme})=> theme.color.default};
  }

  .o-activity-table__key{
    text-align: center;
    width: 100%;
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
`

export default StyledOthersTable