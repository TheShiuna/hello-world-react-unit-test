import styled from 'styled-components';

export const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  & * {
    box-sizing: border-box;
  }
`;

export const Title = styled.h1`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #354435;
  text-align: center;
`;