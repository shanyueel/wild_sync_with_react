import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const LanguageToggle = ({ className }) => {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  const toggleLanguage = () => {
    const newLang = isEn ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className={className} onClick={toggleLanguage}>
      <div className={`c-language-toggle toggle-bg ${isEn ? 'c-language-toggle--left' : 'c-language-toggle--right'}`} />
      <span className={`c-language-toggle__lang-text ${isEn ? 'active' : ''}`}>EN</span>
      <span className={`c-language-toggle__lang-text ${!isEn ? 'active' : ''}`}>ZH</span>
    </div>
  );
};

const StyledLanguageToggle = styled(LanguageToggle)`
  position: relative;
  display: flex;
  width: 64px;
  height: 28px;
  border: 1.5px solid ${({ theme }) => theme.color.default};
  border-radius: 20px;
  background-color: white;
  overflow: hidden;
  user-select: none;
  cursor: pointer;

  .c-language-toggle {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 50%;
    height: 100%;
    background-color: ${({ theme }) => theme.color.default};
    transition: transform 0.3s ease;

    &--left {
      transform: translateX(0);
    }

    &--right {
      transform: translateX(100%);
    }

    &__lang-text {
      z-index: 1;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 0.8rem;
      font-weight: 700;

      transition: color 0.3s;

      color: ${({ theme }) => theme.color.default};

      &.active {
        color: white;
      }
    }
  }
`;

export default StyledLanguageToggle;
