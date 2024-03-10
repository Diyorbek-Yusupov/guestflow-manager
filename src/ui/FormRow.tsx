import styled, { css } from 'styled-components';

interface IStyledFormRowProps {
  direction: 'vertical' | 'horizontal';
}

const StyledFormRow = styled.div<IStyledFormRowProps>`
  display: grid;
  align-items: center;
  /* grid-template-columns: 24rem 1fr 1.2fr;
  grid-template-columns: 24rem 1fr 1.2fr; */

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  ${({ direction }) =>
    direction === 'horizontal' &&
    css`
      grid-template-columns: 24rem 1fr 1.2fr;
      gap: 2.4rem;
      &:has(button) {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
      }
    `}
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

interface IPropTypes {
  children: JSX.Element;
  error?: string;
  label?: string;
  direction?: 'vertical' | 'horizontal';
}

function FormRow({
  children,
  error,
  label,
  direction = 'horizontal',
}: IPropTypes) {
  return (
    <StyledFormRow direction={direction}>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
