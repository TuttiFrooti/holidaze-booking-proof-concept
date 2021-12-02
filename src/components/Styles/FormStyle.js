import styled from "styled-components";
import { theme } from "../../utils/theme";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 100px;
`;

export const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Label = styled.span`
  font-weight: bold;
  font-size: 18px;
  position: relative;
  margin-bottom: 5px;

  ${props => props.required && `
    &:after {
      content: '*';
      display: inline-block;
      position: absolute;
      margin-left: 2px;
      font-size: 20px;
    }
  `}

  &:after{
    color: ${p => p.theme.colors.alert};
  }
`;

export const Input = styled.input`
  height: 40px;
  outline: none;
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-radius: 5px;
  background-color: ${props => props.theme.colors.brightMamba};
  padding: 0 10px;

  ${props => props.dateInput && `
    width: 160px;
  `}
`;

export const TextArea = styled.textarea`
  outline: none;
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-radius: 5px;
  background-color: ${props => props.theme.colors.brightMamba};
  padding: 10px;
  min-height: 180px;
  font-size: 16px;
`;

export const SelectStyle = styled.select`

`;

export const SelectStylingObj = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: theme.colors.brightMamba,
    borderColor: theme.colors.lightGray,
    height: '42px',
    boxShadow: state.isFocused ? theme.colors.primaryHover : 1,
    '&:hover': {
      borderColor: state.isFocused ?
        theme.colors.primaryHover : theme.colors.primary
    }
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused && theme.colors.primaryHover,
    color: state.isSelected ? theme.colors.primary : 
      state.isFocused ? theme.colors.brightMamba : theme.colors.primary,
      '&:hover': {
        color: state.isFocused &&
          theme.colors.brightMamba
      },
      '&:active': {
        backgroundColor: state.isFocused && theme.colors.primaryHover,
        color: theme.colors.brightMamba,
      },
    padding: '5px 10px',
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: theme.colors.brightMamba
  })
}

export const FormError = styled.span`
  font-size: .9rem;
  margin-bottom: 10px;
  color: ${props => props.theme.colors.alert};

  ${props => props.main && `
    font-size: 1rem;
    font-weight: bold;
  `}
`;

export const FormSuccess = styled.div`
  transition: all 1s ease;
  position: fixed;
  display: ${props => props.success ? 'block' : 'none'};
  left: 50%;
  top: ${props => props.success ? '20px' : '0'};;
  transform: translateX(-50%);
  border-radius: 5px;
  background-color: ${props => props.theme.colors.success};
  color: ${props => props.theme.colors.brightMamba};
  padding: 15px 20px;
`;

export const Submit = styled.button`
  width: 100%;
  height: 50px;
  border: 0;
  border-radius: 30px;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.brightMamba};
  font-size: 18px;
  cursor: pointer;

  transition: background-color .2s ease;
  &:hover{
    background-color: ${props => props.theme.colors.primaryHover};
  }

  &:active{
    background-color: ${props => props.theme.colors.primaryFocus};
  }

  ${props => props.m10 && `
    margin-top: 10px;
  `}
`;