import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import StyledUserInfo from './StyledUserInfo';
import StyledButton from './StyledButton';

const DiscussionCreate = ({ className }) => {
  const { t } = useTranslation('common');
  return (
    <div className={className}>
      <StyledUserInfo className="o-message-reply__user-info" />
      <textarea
        className="o-message-reply__input"
        placeholder={t('discussion.placeholder')}
      />
      <StyledButton className="o-message-reply__button">
        {t('discussion.start')}
      </StyledButton>
    </div>
  );
};

const StyledDiscussionCreate = styled(DiscussionCreate)`
  display: flex;
  flex-direction: column;
  padding: 0.75rem 1rem;
  width: 100%;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.backgroundColor.default};

  .o-message-reply__user-info {
    margin-bottom: 0.5rem;
  }

  .o-message-reply__input {
    width: 100%;
    height: 5rem;
    margin-bottom: 0.5rem;
  }

  .o-message-reply__button {
    width: 5rem;
    height: 2rem;
    align-self: flex-end;
  }
`;

export default StyledDiscussionCreate;
