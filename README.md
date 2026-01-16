# Wild Sync - Outdoor Activity Hosting Platform

This is a website designed to help you host outdoor activities and organize groups online. Through Wild Sync, you can register an account to host your own hiking events; or, as a participant, you can browse activities hosted by others and choose the ones that interest you. It allows anyone to quickly find partners for outdoor adventures through Wild Sync.

## Live Demo

The website is deployed via gh-pages and can be experienced at the following link:[Wild Sync](https://shanyueel.github.io/wild_sync_with_react/)

## Test Account

Account: user0@wildsync.com

Password: 12345678

## 開發工具

- [React.Js](https://react.dev/) - Web Framework @18.2.0
- [Node.Js](https://nodejs.org/en/) - Server Environment @14.18.1
- [Firebase](https://firebase.google.com/?hl=zh-cn) - Backend Database Service

## Features

### Registration / Login

- Visitors can select "Login" or "Register" via the user dropdown menu in the navigation bar.
![Navbar User Dropdown](https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Flogin-register-button.jpg?alt=media&token=85f1a53f-230d-476f-8157-b225416e4058)

[Register Page](https://shanyueel.github.io/wild_sync_with_react/register)

-Enter your email and nickname, and enter your password twice to register. You will be redirected to the homepage upon successful registration.

![Register Page](https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Fregister-page.jpg?alt=media&token=bb1568d6-a195-487f-832c-d8fbf4754a68)

[Login Page](https://shanyueel.github.io/wild_sync_with_react/login)

- If you are already registered, you can log in directly with your email and password. You will be redirected to the homepage after logging in.

![Login Page](https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Flogin-page.jpg?alt=media&token=68cc96b3-4c95-41f7-a10b-e980ef2977d9)

### Home Page

[Home Page](https://shanyueel.github.io/wild_sync_with_react/)

- Popular Areas: Recommendations for the top six counties/cities are displayed based on the volume of activities in each area.

![Home Page Popular Area](https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Fhome-page-popular-areas.jpg?alt=media&token=f0109202-b72d-4ab9-9d0e-41add949e053)

- Activity List: Lists all activities. You can use the filter in the top-left corner to sort by preference, difficulty, time, and location.

- View Toggle: The top-right corner allows you to switch between Card view and List view.

Note: Currently, only "Hiking" is available as an activity type. Other activity options are not yet implemented.

![Home Page Activities list](https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Fhome-page-activities-list.jpg?alt=media&token=9e82e1e9-592e-4bce-88df-7389b65b95fc)

### Search Function

[Search Page](https://shanyueel.github.io/wild_sync_with_react/activity/search)

- You can access the search page via the search bar in the navbar or through the "Activity List".

- The search page allows for keyword searching, as well as filtering by sort order, difficulty, time, and location.

- The right side of the search page lists the five most recently viewed activities.

![Search Page](https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Factivity-search-page.jpg?alt=media&token=aea7f4d3-0fb1-4e7f-9deb-614932ec9d96)

### Activity Details

[Activity Page](https://shanyueel.github.io/wild_sync_with_react/activity/dBDYjckpZnjs6ZByZYVd)

- The upper section of the Activity Page displays key information, including time, location, introduction, difficulty, duration, estimated cost, and participant limits.

- The "Participants" section on the right shows the current host and attendees.

- If logged in, users can bookmark the activity or request to join. Joined activities can be viewed on the user profile page.

![Activity Page](https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Factivity-page.jpg?alt=media&token=317656c2-f09a-4898-8c44-6cd494924822)

- The lower section of the page details the itinerary, transportation, accommodation info, and schedule planning.

- At the bottom of the page, there is a "Browsing History" section showing the user's five most recently viewed activities.

![Activity Page Tables](https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Factivity-page-tables.jpg?alt=media&token=d100668e-87d1-4422-b8bd-a4952b5818ac)

### User Profile

[User Page](https://shanyueel.github.io/wild_sync_with_react/user/OCE9IwK6yhgyUHnOif7rnq9TqSJ2)

- The User Page displays a specific user's basic information, including email, region, age, occupation, and bio.

- Below that, you can view lists of activities the user has participated in, bookmarked, or hosted.

- The "Popular Hosts" section on the right recommends the top 10 users who have hosted the most activities from the database.

![User Page](https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Fuser-page.jpg?alt=media&token=19d3ec8d-1d23-4c51-a2f9-de51beb81131)

### Create Activity (Login Required)

- After logging in, click the "+" symbol next to the user icon in the top-right corner of the navbar to open the Create Activity modal.

- Currently, all fields are mandatory by default. If left blank, a warning will appear, preventing the user from proceeding to the next step.

- To prevent accidental closure, data is preserved if the modal is closed. To reset the form, use the "Clear Data" button in the top-right of the window.

- Once all five steps are completed, the browser will automatically redirect to the newly created activity page.

![Activity Create Modal](https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Factivity-create-modal.jpg?alt=media&token=f2df71a7-ce94-4e2a-a19a-db082abe1c38)

### Update Activity & Manage Participants (Login Required)

[Activity Page](https://shanyueel.github.io/wild_sync_with_react/activity/iLwpOTVg6YyTmoiPucWW)

- On a page for an activity you host, click the "Update Activity" button below the introduction to open the update modal.

- Usage is similar to the Create Activity modal. Additionally, you can use "Revert Changes" in the top-right to undo edits.

- To delete an activity, use the "Delete Activity" button in the top-right corner. A confirmation alert will pop up to verify the deletion.

![Activity Update Modal](https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Factivity-update-modal.jpg?alt=media&token=c978fc14-287f-4b50-9458-446f6409e28f)

- As a host, a remove button will appear on participant cards, allowing you to remove other users who have joined.

![Activity Page Attendance](https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Factivity-page-attendance.jpg?alt=media&token=b70f93ed-cdc3-4302-a151-32c1927ea7f6)

### Update Public Profile (Login Required)

[User Edit Modal](https://shanyueel.github.io/wild_sync_with_react/user/8XKZphuNddVABtKKzmZgWpZ0Bh23)

- On your own User Page, click "Update Profile" to open the "Edit User Profile" modal.

- You can update public information such as your cover photo, avatar, name, birthday, occupation, region, and bio.

- If you do not wish to save changes, click "Cancel Update" in the bottom-right to discard changes and close the window.

![User Edit Modal](https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Fuser-edit-modal.jpg?alt=media&token=90f9110f-48b4-47b1-9dd6-f38fd50be10c)

### Update Account Settings (Login Required)

- Access the "Edit Account Settings" modal via "Account Settings" in the navbar user dropdown.

- Here you can reset your username, email, and password. Since this involves sensitive information, you will need to enter your current password to confirm updates after clicking "Update Account".

![Account Update Modal](https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Faccount-update-modal.jpg?alt=media&token=124158cc-85e8-4de9-9bf4-b9c510639fcd)

### Logout (Login Required)

- Select "Logout" from the user dropdown in the navbar to log out and reset the current view.

![Logout](https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Flogout-button.jpg?alt=media&token=e742f698-d9a4-4305-bcf3-4fe9342ac18c)
