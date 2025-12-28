import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const GuidePage = ({ className }) => {
  const { t } = useTranslation('guidePage');

  return (
    <div className={className}>
      <h1 className="o-guide__title">{t('title')}</h1>

      <div className="l-guide__function">
        <h2>{t('sections.auth.title')}</h2>
        <h3>{t('sections.auth.step1')}</h3>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Flogin-register-button.jpg?alt=media&token=85f1a53f-230d-476f-8157-b225416e4058"
          alt="Navbar User Dropdown"
        />

        <h3>{t('sections.auth.step2')}</h3>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Fregister-page.jpg?alt=media&token=bb1568d6-a195-487f-832c-d8fbf4754a68"
          alt="Register Page"
        />

        <h3>{t('sections.auth.step3')}</h3>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Flogin-page.jpg?alt=media&token=68cc96b3-4c95-41f7-a10b-e980ef2977d9"
          alt="Login Page"
        />
      </div>

      <div className="l-guide__function">
        <h2>{t('sections.home.title')}</h2>

        <h3>{t('sections.home.desc1')}</h3>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Fhome-page-popular-areas.jpg?alt=media&token=f0109202-b72d-4ab9-9d0e-41add949e053"
          alt="Home Page Popular Area"
        />

        <h3>{t('sections.home.desc2')}</h3>
        <h3>{t('sections.home.desc3')}</h3>
        <h3>{t('sections.home.desc4')}</h3>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Fhome-page-activities-list.jpg?alt=media&token=9e82e1e9-592e-4bce-88df-7389b65b95fc"
          alt="Home Page Activities list"
        />
      </div>

      <div className="l-guide__function">
        <h2>{t('sections.search.title')}</h2>

        <h3>{t('sections.search.desc1')}</h3>
        <h3>{t('sections.search.desc2')}</h3>
        <h3>{t('sections.search.desc3')}</h3>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Factivity-search-page.jpg?alt=media&token=aea7f4d3-0fb1-4e7f-9deb-614932ec9d96"
          alt="Search Page"
        />
      </div>

      <div className="l-guide__function">
        <h2>{t('sections.activity.title')}</h2>

        <h3>{t('sections.activity.desc1')}</h3>
        <h3>{t('sections.activity.desc2')}</h3>
        <h3>{t('sections.activity.desc3')}</h3>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Factivity-page.jpg?alt=media&token=317656c2-f09a-4898-8c44-6cd494924822"
          alt="Activity Page"
        />

        <h3>{t('sections.activity.desc4')}</h3>
        <h3>{t('sections.activity.desc5')}</h3>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Factivity-page-tables.jpg?alt=media&token=d100668e-87d1-4422-b8bd-a4952b5818ac"
          alt="Activity Page Tables"
        />
      </div>

      <div className="l-guide__function">
        <h2>{t('sections.user.title')}</h2>

        <h3>{t('sections.user.desc1')}</h3>
        <h3>{t('sections.user.desc2')}</h3>
        <h3>{t('sections.user.desc3')}</h3>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Fuser-page.jpg?alt=media&token=19d3ec8d-1d23-4c51-a2f9-de51beb81131"
          alt="User Page"
        />
      </div>

      <div className="l-guide__function">
        <h2>{t('sections.create.title')}</h2>

        <h3>{t('sections.create.desc1')}</h3>
        <h3>{t('sections.create.desc2')}</h3>
        <h3>{t('sections.create.desc3')}</h3>
        <h3>{t('sections.create.desc4')}</h3>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Factivity-create-modal.jpg?alt=media&token=f2df71a7-ce94-4e2a-a19a-db082abe1c38"
          alt="Activity Create Modal"
        />
      </div>

      <div className="l-guide__function">
        <h2>{t('sections.update.title')}</h2>

        <h3>{t('sections.update.desc1')}</h3>
        <h3>{t('sections.update.desc2')}</h3>
        <h3>{t('sections.update.desc3')}</h3>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Factivity-update-modal.jpg?alt=media&token=c978fc14-287f-4b50-9458-446f6409e28f"
          alt="Activity Update Modal"
        />

        <h3>{t('sections.update.desc4')}</h3>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Factivity-page-attendance.jpg?alt=media&token=b70f93ed-cdc3-4302-a151-32c1927ea7f6"
          alt="Activity Page Attendance"
        />
      </div>

      <div className="l-guide__function">
        <h2>{t('sections.editUser.title')}</h2>

        <h3>{t('sections.editUser.desc1')}</h3>
        <h3>{t('sections.editUser.desc2')}</h3>
        <h3>{t('sections.editUser.desc3')}</h3>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Fuser-edit-modal.jpg?alt=media&token=90f9110f-48b4-47b1-9dd6-f38fd50be10c"
          alt="User Edit Modal"
        />
      </div>

      <div className="l-guide__function">
        <h2>{t('sections.account.title')}</h2>

        <h3>{t('sections.account.desc1')}</h3>
        <h3>{t('sections.account.desc2')}</h3>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Faccount-update-modal.jpg?alt=media&token=124158cc-85e8-4de9-9bf4-b9c510639fcdc"
          alt="Account Update Modal"
        />
      </div>

      <div className="l-guide__function">
        <h2>{t('sections.logout.title')}</h2>

        <h3>{t('sections.logout.desc1')}</h3>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/guide-images%2Flogout-button.jpg?alt=media&token=e742f698-d9a4-4305-bcf3-4fe9342ac18c"
          alt="Logout"
        />
      </div>
    </div>
  );
};

const StyledGuidePage = styled(GuidePage)`
  .o-guide__title {
    margin-top: 1.5rem;
  }

  .l-guide__function {
    display: flex;
    flex-direction: column;
    text-align: start;
    margin-top: 2rem;

    h2 {
      color: ${({ theme }) => theme.color.default};
      font-weight: 700;
      align-self: flex-start;
    }

    img {
      width: 100%;
      margin-top: 0.75rem;
    }

    h3 {
      position: relative;
      margin-top: 1.5rem;
      margin-left: 1.5rem;
      line-height: 1.5rem;
      align-self: flex-start;

      &::before {
        position: absolute;
        left: -1rem;
        content: '●';
        color: ${({ theme }) => theme.color.default};
      }
    }
  }

  @media screen and (min-width: 480px) {
    .l-guide__function img {
      width: 80%;
    }
  }

  @media screen and (min-width: 768px) {
    .l-guide__function img {
      width: 75%;
    }
  }
`;

export default StyledGuidePage;
