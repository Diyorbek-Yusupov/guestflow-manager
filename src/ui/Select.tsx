import React from 'react';
import styled from 'styled-components';

interface IStyledSelectProps {
  type?: 'white';
}

const StyledSelect = styled.select<IStyledSelectProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === 'white'
        ? 'var(--color-grey-100)'
        : 'var(--color-grey-300)'};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

interface ISelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    IStyledSelectProps {
  options: { value: string; label: string }[];
}

function Select({ options, ...props }: ISelectProps) {
  return (
    <StyledSelect {...props}>
      {options.map((item) => (
        <option value={item.value} key={item.value}>
          {item.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
