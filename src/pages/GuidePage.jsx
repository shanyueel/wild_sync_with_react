import styled from "styled-components";


const GuidePage = ({className}) => {

  return(
    <div className={className}>
      <h1 className="o-guide__title">Wild Sync 功能簡介</h1>

      <div className="l-guide__function">
        <h2>-註冊 / 登入功能-</h2>
        <h3>訪客可以藉由導覽列的使用者下拉選單，選擇「登入」或是「註冊」。</h3>
        <img src="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Flogin-register-button.jpg?alt=media&token=85f1a53f-230d-476f-8157-b225416e4058" alt="Navbar User Dropdown"/>

        <h3>輸入信箱、暱稱，並且重複輸入密碼已註冊，註冊完成後會跳轉至首頁。</h3>
        <img src="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Fregister-page.jpg?alt=media&token=bb1568d6-a195-487f-832c-d8fbf4754a68" alt="Register Page"/>
        
        <h3>若已經註冊過，可以直接輸入信箱、密碼登入，登入後會跳轉至首頁。</h3>
        <img src="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Flogin-page.jpg?alt=media&token=68cc96b3-4c95-41f7-a10b-e980ef2977d9" alt="Login Page"/>
        
      </div>

      <div className="l-guide__function">
        <h2>首頁瀏覽</h2>

        <h3>熱門活動地點會依據縣市的活動數量，推薦最多的六個縣市區域。</h3>
        <img src="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Fhome-page-popular-areas.jpg?alt=media&token=f0109202-b72d-4ab9-9d0e-41add949e053" alt="Home Page Popular Area"/>
        
        <h3>活動列表會列出所有活動，可以利用左上角的篩選器選擇排序方式、難度、時間與地點。</h3>
        <h3>右上角的顯示方式提供卡片與清單兩種顯示方式。</h3>
        <h3>目前活動僅提供"登山"一種活動，其他活動選擇目前無實裝。</h3>
        <img src="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Fhome-page-activities-list.jpg?alt=media&token=9e82e1e9-592e-4bce-88df-7389b65b95fc" alt="Home Page Activities list"/>

      </div>
      
      <div className="l-guide__function">
        <h2>搜尋功能</h2>

        <h3>透過導覽列的搜索欄或是"活動列表"，可以進入搜尋頁面。</h3>
        <h3>搜尋頁面可以利用關鍵字搜尋，同時利用篩選器篩選排序方式、難度、時間與地點。</h3>
        <h3>搜尋頁面右邊會列出近期查看過的五個活動。</h3>
        <img src="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Factivity-search-page.jpg?alt=media&token=aea7f4d3-0fb1-4e7f-9deb-614932ec9d96" alt="Search Page"/>

      </div>

      <div className="l-guide__function">
        <h2>瀏覽活動資訊</h2>

        <h3>活動資訊頁面上半部可以看到活動的重要資訊、包含時間、地點、簡介以及難度、時長、預估費用以及人數限制等。</h3>
        <h3>右手邊的「活動參加者」欄位，可以看到目前活動的主辦人與參加者。</h3>
        <h3>如有登入，則可以使用收藏活動、報名加入功能，加入後可在使用者資訊頁瀏覽。</h3>
        <img src="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Factivity-page.jpg?alt=media&token=317656c2-f09a-4898-8c44-6cd494924822" alt="Activity Page"/>

        <h3>活動資訊頁面的下半部能夠看到戶外活動的詳細細節、交通住宿資訊、行程安排等。</h3>
        <h3>活動資訊業面的最後也有瀏覽紀錄欄位，可供使用者查看近期的五個活動瀏覽紀錄。</h3>
        <img src="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Factivity-page-tables.jpg?alt=media&token=d100668e-87d1-4422-b8bd-a4952b5818ac" alt="Activity Page Tables"/>

      </div>

      <div className="l-guide__function">
        <h2>瀏覽使用者資訊</h2>

        <h3>使用者頁面可以查看特定使用者基本資訊，包含信箱、地區、年紀、職業、自我介紹等。</h3>
        <h3>另外下面也可以查看使用者參與、收藏以及主辦過的活動清單。</h3>
        <h3>右半邊的「熱門主辦者」欄位，會從資料庫中推薦出舉辦最多活動的 10 位使用者。</h3>
        <img src="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Fuser-page.jpg?alt=media&token=19d3ec8d-1d23-4c51-a2f9-de51beb81131" alt="User Page"/>

      </div>

      <div className="l-guide__function">
        <h2>建立活動 (需要登入)</h2>

        <h3>登入後，透過導覽列右上角、使用者旁邊的「+」符號，即可進入建立活動視窗。</h3>
        <h3>目前預設所有資料皆須填寫，若有空白會顯示警告並阻擋使用者前往下一步。</h3>
        <h3>為避免誤觸關閉，關掉建立活動視窗後資料會保留，如要清空可透過視窗右上的「清空填入資料」清空重填。</h3>
        <h3>五個步驟的所有資料都填寫完成後，會自動跳轉至新建立的活動頁面。</h3>
        <img src="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Factivity-create-modal.jpg?alt=media&token=f2df71a7-ce94-4e2a-a19a-db082abe1c38" alt="Activity Create Modal"/>

      </div>

      <div className="l-guide__function">
        <h2>更新活動與移除參與者 (需要登入)</h2>

        <h3>前往使用者所舉辦的活動頁面，可以利用簡介下方的更新活動按鈕，進入更新活動視窗。</h3>
        <h3>使用方式大致與活動建立視窗相同。另外若想取消更改可以利用視窗右上角的「還原變更」還原活動資訊。</h3>
        <h3>若想要刪除活動，可以利用右上角的「刪除活動」刪除，會有警示的彈出視窗彈出確認是否要刪除。</h3>
        <img src="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Factivity-update-modal.jpg?alt=media&token=c978fc14-287f-4b50-9458-446f6409e28f" alt="Activity Update Modal"/>

        <h3>身為主辦人，則在參與者卡片上會有移除按鈕，能夠移除已經參與的其他使用者。</h3>
        <img src="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Factivity-page-attendance.jpg?alt=media&token=b70f93ed-cdc3-4302-a151-32c1927ea7f6" alt="Activity Page Attendance"/>

      </div>

      <div className="l-guide__function">
        <h2>更新使用者公開資訊 (需要登入)</h2>

        <h3>於自己的使用者頁面，可以透過「更新資料」來進入「編輯使用者資料視窗」。</h3>
        <h3>可以透過使用者資料視窗來更新會公開的封面照片、大頭貼、名稱、生日、職業、地區與自我介紹。</h3>
        <h3>若不想更新，可利用右下角的「取消更新」移除變更並關閉視窗。</h3>
        <img src="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Fuser-edit-modal.jpg?alt=media&token=90f9110f-48b4-47b1-9dd6-f38fd50be10c" alt="User Edit Modal"/>

      </div>

      <div className="l-guide__function">
        <h2>更新帳戶資訊 (需要登入)</h2>

        <h3>利用導覽列的使用者下拉選單中的「帳戶設定」，可以進入「編輯帳戶資訊視窗」。</h3>
        <h3>這邊可以重設使用者名稱、信箱以及密碼。因為涉及敏感資訊，因此在按下「更新帳戶」後會需要輸入員密碼以更新。</h3>
        <img src="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Faccount-update-modal.jpg?alt=media&token=124158cc-85e8-4de9-9bf4-b9c510639fcdc" alt="Account Update Modal"/>

      </div>

      <div className="l-guide__function">
        <h2>登出功能 (需要登入)</h2>

        <h3>利用導覽列的使用者下拉選單中的「帳戶登出」，即可登出並重置當前畫面。</h3>
        <img src="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Flogout-button.jpg?alt=media&token=e742f698-d9a4-4305-bcf3-4fe9342ac18c" alt="Logout"/>

      </div>
      
    </div>
  )
}

const StyledGuidePage = styled(GuidePage)`
  .o-guide__title{
    margin-top: 1.5rem;
  }

  .l-guide__function{
    display: flex;
    flex-direction: column;
    text-align: start;
    margin-top: 2rem;

    h2{
      color: ${({theme})=> theme.color.default};
      font-weight: 700;
      align-self: flex-start;
    }

    img{
      width: 100%;
      margin-top: .75rem;
    }

    h3{
      position: relative;
      margin-top: 1.5rem;
      margin-left: 1.5rem;
      line-height: 1.5rem;
      align-self: flex-start;

      &::before{
        position: absolute;
        left: -1rem;
        content: "●";
        color: ${({theme})=>theme.color.default};
      }
    }
  }

  @media screen and (min-width: 480px) {
    .l-guide__function img{
      width: 80%;
    }
  }

  @media screen and (min-width: 768px) {
    .l-guide__function img{
      width: 75%;
    }
  }
`

export default StyledGuidePage