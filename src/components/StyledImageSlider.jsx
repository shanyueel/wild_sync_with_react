import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';

const ImageSlider = ({ className, sliderImages }) => {
  return (
    <div className={className}>
      <Slider
        className="c-slider"
        dots={true}
        infinite={true}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        arrows={true}
      >
        {sliderImages.map((sliderImage) => (
          <img
            key={sliderImage.title}
            className="o-slider-image"
            src={sliderImage.image}
            alt={sliderImage.title}
          />
        ))}
      </Slider>
    </div>
  );
};

const StyledImageSlider = styled(ImageSlider)`
  .c-slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    .o-slider-image {
      width: 100%;
      height: 20rem;
      object-fit: cover;
      max-width: 1400px;
    }
  }

  @media screen and (min-width: 768px) {
    .c-slider {
      .o-slider-image {
        height: 24rem;
      }
    }
  }

  @media screen and (min-width: 1024px) {
    .c-slider {
      .o-slider-image {
      }
    }
  }
`;

export default StyledImageSlider;
