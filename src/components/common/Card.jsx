import styled from 'styled-components';

function Card({ children, as: Tag = 'div', ...rest }) {
  return (
    <Surface as={Tag} {...rest}>
      {children}
    </Surface>
  );
}

export default Card;

const Surface = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.cardLg};
  box-shadow: ${({ theme }) => theme.shadow.cardSoft};
`;
