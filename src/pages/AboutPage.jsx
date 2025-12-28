import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const AboutPage = ({ className }) => {
  const { t } = useTranslation('aboutPage');

  return (
    <div className={className}>
      <h1 className="o-about__title">{t('title')}</h1>
      <div className="l-about__content">
        <p>
          <h3>{t('subtitle1')}</h3>
          {t('description1')}
          <br />
          <br />
          <h3>{t('subtitle2')}</h3>
          {t('description2')}
          <br />
          <br />
          <h3>{t('subtitle3')}</h3>
          {t('description3')}
          <br />
          <br />
          <h3>{t('subtitle4')}</h3>
          {t('description4')}
          <br />
        </p>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/about-images%2Fabout-cover.png?alt=media&token=cbee551d-9992-4164-8583-9565a3e6f617"
          alt="wild sync image"
        />
      </div>
    </div>
  );
};

const StyledAboutPage = styled(AboutPage)`
  .o-about__title {
    margin-top: 1.5rem;
  }

  img {
    width: 100%;
  }

  p {
    line-height: 1.5rem;
    margin-top: 1.5rem;

    h3 {
      color: ${({ theme }) => theme.color.default};
      font-weight: 700;
    }
  }

  @media screen and (min-width: 1024px) {
    .l-about__content {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      gap: 1rem;

      img {
        width: 45%;
      }

      p {
        padding: 1rem;
      }
    }
  }
`;

export default StyledAboutPage;
