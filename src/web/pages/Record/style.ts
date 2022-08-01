import styled from '@emotion/styled';
export const color = 'white';
export const Container = styled.div`
  padding: 32px;
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  &:hover {
    color: ${color};
  }
  margin-bottom: 5px;
`;
