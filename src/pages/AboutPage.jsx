import styled from 'styled-components';

const AboutPage = ({ className }) => {
  return (
    <div className={className}>
      <h1 className="o-about__title">關於Wild Sync</h1>
      <div className="l-about__content">
        <p>
          <h3>連結自然，觸動人心</h3>
          生活在忙碌的現代社會中，往往忽略了大自然的寶貴資源以及與他人接觸的機會。Wild
          Sync希望能讓人們回歸自然，同時建立更強的社群連結。無論您是想要參加活動還是組織一個活動，Wild
          Sync都能滿足您的需求:
          <br />
          <br />
          <h3>-多樣性的活動</h3>
          我們的平台上有各種各樣的戶外活動，無論您是一位業餘愛好者還是經驗豐富的探險家，都能找到適合您的活動。
          <br />
          <br />
          <h3>-社群連結</h3>
          您可以輕鬆地在Wild
          Sync找到志同道合的登山夥伴。您可以創建個人資料、舉辦自己的活動或加入其他人的行程。
          <br />
          <br />
          <h3>-環保理念</h3>
          Wild Sync 強調環保理念，我們鼓勵參與者遵守 Leave No Trace
          原則，確保活動不對自然環境造成損害。我們希望通過參與戶外活動來教育人們如何保護我們的星球。
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
