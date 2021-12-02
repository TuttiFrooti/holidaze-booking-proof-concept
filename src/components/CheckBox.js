import { useState } from 'react';
import styled from 'styled-components';

export default function CheckBox({ dataClass, label, name, onChange }) {
  const [checked, setChecked] = useState(null);

  return (
    <Label>
      <HiddenCheckbox
        data-class={dataClass}
        // checked={checked}
        name={name}
        onChange={onChange}
        onClick={() => { setChecked(!checked) }}
      />
      <CheckBoxStyled checked={checked}>
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </CheckBoxStyled>
      {label}
    </Label>
  )
}
const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`

const CheckBoxStyled = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${props => (props.checked ? props.theme.colors.primary : props.theme.colors.brightMamba)};
  border-radius: 3px;
  border: 1px solid ${props => props.theme.colors.lightGray};
  transition: all 150ms;

  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  }
`;


const Label = styled.label`
  display: flex;
  gap: 10px;
  align-items: center;
`;


/*
  Hide checkbox visually but remain accessible to screen readers.
  Source: https://polished.js.org/docs/#hidevisually
*/
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;