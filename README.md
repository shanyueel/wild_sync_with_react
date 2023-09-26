# Wild Sync - 戶外活動舉辦平台

這是一個幫助您舉辦戶外活動、線上揪團的網站。透過 Wild Sync，您可以註冊帳號並舉辦自己的登山活動；或者是作為參與者，瀏覽其他人主辦的活動，並挑選有興趣的參加，讓任何人都能夠透過 Wild Sync 快速找到戶外活動的夥伴。

## 線上體驗 Wild Sync

網站透過 gh-pages 部屬，可透過以下網址體驗：[Wild Sync](https://shanyueel.github.io/wild_sync_with_react/)

## 測試帳號

帳號: user0@wildsync.com

密碼: 12345678

## 開發工具

- [React.Js](https://react.dev/) - Web 框架 @18.2.0
- [Node.Js](https://nodejs.org/en/) - 服務器環境 @14.18.1
- [Firebase](https://firebase.google.com/?hl=zh-cn) - 後端資料庫

## 功能介紹

### 註冊 / 登入功能

-訪客可以藉由導覽列的使用者下拉選單，選擇「登入」或是「註冊」。

![Navbar User Dropdown](https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Flogin-register-button.jpg?alt=media&token=85f1a53f-230d-476f-8157-b225416e4058)

[Register Page](https://shanyueel.github.io/wild_sync_with_react/register)

-輸入信箱、暱稱，並且重複輸入密碼已註冊，註冊完成後會跳轉至首頁。

![Register Page](https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Fregister-page.jpg?alt=media&token=bb1568d6-a195-487f-832c-d8fbf4754a68)

[Login Page](https://shanyueel.github.io/wild_sync_with_react/login)

-若已經註冊過，可以直接輸入信箱、密碼登入，登入後會跳轉至首頁。

![Login Page](https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Flogin-page.jpg?alt=media&token=68cc96b3-4c95-41f7-a10b-e980ef2977d9)

### 首頁瀏覽

[Home Page](https://shanyueel.github.io/wild_sync_with_react/)

-熱門活動地點會依據縣市的活動數量，推薦最多的六個縣市區域。

![Home Page Popular Area](https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Fhome-page-popular-areas.jpg?alt=media&token=f0109202-b72d-4ab9-9d0e-41add949e053)

-活動列表會列出所有活動，可以利用左上角的篩選器選擇排序方式、難度、時間與地點。

-右上角的顯示方式提供卡片與清單兩種顯示方式。

補：目前活動僅提供"登山"一種活動，其他活動選擇目前無實裝。

![Home Page Activities list](https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Fhome-page-activities-list.jpg?alt=media&token=9e82e1e9-592e-4bce-88df-7389b65b95fc)

### 搜尋功能

[Search Page](https://shanyueel.github.io/wild_sync_with_react/activity/search)

-透過導覽列的搜索欄或是"活動列表"，可以進入搜尋頁面。

-搜尋頁面可以利用關鍵字搜尋，同時利用篩選器篩選排序方式、難度、時間與地點。

-搜尋頁面右邊會列出近期查看過的五個活動。

![Search Page](https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Factivity-search-page.jpg?alt=media&token=aea7f4d3-0fb1-4e7f-9deb-614932ec9d96)

### 瀏覽活動資訊

[Activity Page](https://shanyueel.github.io/wild_sync_with_react/activity/dBDYjckpZnjs6ZByZYVd)

-活動資訊頁面上半部可以看到活動的重要資訊、包含時間、地點、簡介以及難度、時長、預估費用以及人數限制等。

-右手邊的「活動參加者」欄位，可以看到目前活動的主辦人與參加者。

-如有登入，則可以使用收藏活動、報名加入功能，加入後可在使用者資訊頁瀏覽。

![Activity Page](https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Factivity-page.jpg?alt=media&token=317656c2-f09a-4898-8c44-6cd494924822)

-活動資訊頁面的下半部能夠看到戶外活動的詳細細節、交通住宿資訊、行程安排等。

-活動資訊業面的最後也有瀏覽紀錄欄位，可供使用者查看近期的五個活動瀏覽紀錄。

![Activity Page Tables](https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Factivity-page-tables.jpg?alt=media&token=d100668e-87d1-4422-b8bd-a4952b5818ac)

### 瀏覽使用者資訊

[User Page](https://shanyueel.github.io/wild_sync_with_react/user/OCE9IwK6yhgyUHnOif7rnq9TqSJ2)

-使用者頁面可以查看特定使用者基本資訊，包含信箱、地區、年紀、職業、自我介紹等。

-另外下面也可以查看使用者參與、收藏以及主辦過的活動清單。

-右半邊的「熱門主辦者」欄位，會從資料庫中推薦出舉辦最多活動的 10 位使用者。

![User Page](https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Fuser-page.jpg?alt=media&token=19d3ec8d-1d23-4c51-a2f9-de51beb81131)

### 建立活動(需要登入)

-登入後，透過導覽列右上角、使用者旁邊的「+」符號，即可進入建立活動視窗。

-目前預設所有資料皆須填寫，若有空白會顯示警告並阻擋使用者前往下一步。

-為避免誤觸關閉，關掉建立活動視窗後資料會保留，如要清空可透過視窗右上的「清空填入資料」清空重填。

-五個步驟的所有資料都填寫完成後，會自動跳轉至新建立的活動頁面。

![Activity Create Modal](https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Factivity-create-modal.jpg?alt=media&token=f2df71a7-ce94-4e2a-a19a-db082abe1c38)

### 更新活動與移除參與者(需要登入)

[Activity Page](https://shanyueel.github.io/wild_sync_with_react/activity/iLwpOTVg6YyTmoiPucWW)

-前往使用者所舉辦的活動頁面，可以利用簡介下方的更新活動按鈕，進入更新活動視窗。

-使用方式大致與活動建立視窗相同。另外若想取消更改可以利用視窗右上角的「還原變更」還原活動資訊。

-若想要刪除活動，可以利用右上角的「刪除活動」刪除，會有警示的彈出視窗彈出確認是否要刪除。

![Activity Update Modal](https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Factivity-update-modal.jpg?alt=media&token=c978fc14-287f-4b50-9458-446f6409e28f)

-身為主辦人，則在參與者卡片上會有移除按鈕，能夠移除已經參與的其他使用者。

![Activity Page Attendance](https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Factivity-page-attendance.jpg?alt=media&token=b70f93ed-cdc3-4302-a151-32c1927ea7f6)

### 更新使用者公開資訊(需要登入)

[User Edit Modal](https://shanyueel.github.io/wild_sync_with_react/user/8XKZphuNddVABtKKzmZgWpZ0Bh23)

-於自己的使用者頁面，可以透過「更新資料」來進入「編輯使用者資料視窗」。

-可以透過使用者資料視窗來更新會公開的封面照片、大頭貼、名稱、生日、職業、地區與自我介紹。

-若不想更新，可利用右下角的「取消更新」移除變更並關閉視窗。

![User Edit Modal](https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Fuser-edit-modal.jpg?alt=media&token=90f9110f-48b4-47b1-9dd6-f38fd50be10c)

### 更新帳戶資訊(需要登入)

-利用導覽列的使用者下拉選單中的「帳戶設定」，可以進入「編輯帳戶資訊視窗」。

-這邊可以重設使用者名稱、信箱以及密碼。因為涉及敏感資訊，因此在按下「更新帳戶」後會需要輸入員密碼以更新。

![Account Update Modal](https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Faccount-update-modal.jpg?alt=media&token=124158cc-85e8-4de9-9bf4-b9c510639fcd)

### 登出功能(需要登入)

-利用導覽列的使用者下拉選單中的「帳戶登出」，即可登出並重置當前畫面。

![Logout](https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Flogout-button.jpg?alt=media&token=e742f698-d9a4-4305-bcf3-4fe9342ac18c)
