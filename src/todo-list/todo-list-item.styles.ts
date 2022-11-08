import { Field } from 'formik';
import styled from 'styled-components';

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  height: 40px;
`;

export const InputField = styled(Field)`
  width: calc(100% - 150px);
`;

export const Button = styled.button`
  width: 40px;
`;
