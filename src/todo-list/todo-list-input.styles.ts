import styled from 'styled-components';

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 60px;
  border: solid black 3px;
  padding: 10px;
  gap: 10px;
`;

export const InputText = styled.input`
  width: calc(100% - 100px);
`;

export const Button = styled.button`
  width: 40px;
`