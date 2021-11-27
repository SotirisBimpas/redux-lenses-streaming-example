import styled from "@emotion/styled";

type ContainerProps = {
    maxWidth?: number
}

export const Container = styled.div<ContainerProps>`
flex-grow: 1;
margin: 0 auto;
position: relative;
width: auto;
max-width: 1280px;
`

export const FormSection = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 10px;
`

export const FormContainer = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 6px;    
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%),
    0 0px 0 1px rgb(10 10 10 / 2%);
  font-size: 1rem;
`

export const FormHeader = styled.div`
  background-color: #ededed;
  border-radius: 6px 6px 0 0;
  color: #363636;
  font-size: 1.25em;
  font-weight: 700;
  line-height: 1.25;
  padding: 0.75em 1em
`
type InputContainerProps = {
  width?: number;
  marginRight?: number;
}

export const InputContainer = styled.div<InputContainerProps>`
  box-sizing: border-box;
  clear: both;
  font-size: 1rem;
  position: relative;
  text-align: inherit;
  flex-grow: 1;
  flex-shrink: 1;
  max-width: ${props => `${props.width}px` || "100%"};
  width: 100%;
  margin: 0;
  padding: 0;
  margin-right: ${props => `${props.marginRight}px` || 0}
`
export const FormField = styled.div`
  align-items: center;
  color: #363636;
  display: flex;
  justify-content: flex-start;
  padding: 0.5em 0.75em;
  &:not(:last-child) {
    border-bottom: 1px solid #ededed;
  }
`
type InputProps = {
  hasIcon?: string;
  width?: number;
}

export const Input = styled.input<InputProps>`
  width: 100%;
  height: 2.5em;
  max-width: 100%;
  padding-left: ${props => props.hasIcon ? '2.5em' : '.5em'};
  padding-bottom: calc(0.5em - 1px);
  padding-right: calc(0.75em - 1px);
  padding-top: calc(0.5em - 1px);
  border: 1px solid transparent;
  border-color: #dbdbdb;    
  border-radius: 2px;
  box-shadow: inset 0 0.0625em 0.125em rgb(10 10 10 / 5%);
  font-size: 0.75rem;
  line-height: 1.5;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  vertical-align: top;
  position: relative;
  &:hover {
    border-color: #b5b5b5;
  }
  &:active {
    border-color: #485fc7;
    box-shadow: 0 0 0 0.125em rgb(72 95 199 / 25%);
    outline: none;
  }
  &:focus {
    border-color: #485fc7;
    box-shadow: 0 0 0 0.125em rgb(72 95 199 / 25%);
    outline: none;
  }
  &:focus + span {
    color: black;
  }
`
export const InputIcon = styled.span`
  width: 2.5em;
  height: 2.5em;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 0.75rem;
  color: #dbdbdb;
  pointer-events: none;
  z-index: 4;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`
export const ErrorMessageContainer = styled.div`
    margin: 8px 12px;
    background-color: whitesmoke;
    border-radius: 4px;
    font-size: 1rem;
    background-color: #feecf0;
`
export const ErrorMessageHeader = styled.div`
    background-color: #f14668;
    color: #fff;
    align-items: center;
    border-radius: 4px 4px 0 0;
    display: flex;
    font-weight: 700;
    justify-content: space-between;
    line-height: 1.25;
    padding: 0.75em 1em;
    position: relative;
`
export const ErrorMessageBody = styled.div`
    width: 100%;    
    border-color: #f14668;
    color: #cc0f35;
    border-width: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-radius: 4px;
    border-style: solid;
    padding: 1.25em 1.5em;
`

export const TextAreaContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-grow: 1;
  flex-shrink: 1;
  box-sizing: border-box;
  clear: both;
  font-size: 1rem;
  position: relative;
  text-align: inherit;
  flex-grow: 1;
  flex-shrink: 1;
  width: 100%;
  margin: 0;
  padding: 0;
`

export const TextArea = styled.textarea`
  max-height: 40em;
  min-height: 8em;
  height: 2.5em;
  max-width: 100%;
  min-width: 100%;
  border: 1px solid transparent;
  border-radius: 2px;
  border-color: #3e8ed0;
  box-shadow: inset 0 0.0625em 0.125em rgb(10 10 10 / 5%);
  padding: calc(0.75em - 1px);
  font-size: 0.75rem;
  background-color: white;
  line-height: 1.5;
  margin: 0;
  &:active {
    box-shadow: 0 0 0 0.125em rgb(62 142 208 / 25%);
    outline: none;
  }
  &:focus {
    box-shadow: 0 0 0 0.125em rgb(62 142 208 / 25%);
    outline: none;
  }
`