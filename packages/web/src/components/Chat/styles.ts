import styled from 'styled-components';

interface IProps {
  type: 'human' | 'robot';
}

export const Container = styled.div`
  background-color: #123;
  width: 400px;
  height: 600px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.25);
`;

export const Header = styled.div`
  background-color: #234;
  border-radius: 10px 10px 0 0;
  color: #fff;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Conversation = styled.ul`
  background-color: #ddd;
  flex: 1;
  width: 100%;
  list-style: none;
`;
export const MessageGroupContainer = styled.li<IProps>`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  flex-direction: ${({ type }) => (type === 'robot' ? 'row' : 'row-reverse')};
`;
export const MessageGroupAvatar = styled.div<IProps>`
  background-color: #999;
  width: 40px;
  height: 40px;
  margin: 5px;
  border-radius: 50%;
  ${({ type }) => {
    const side = type === 'robot' ? 'right' : 'left';
    return `border-bottom-${side}-radius: 0;`;
  }}
`;
export const MessageGroupContent = styled.ul`
  list-style: none;
  width: 60%;
  margin: 5px;
`;
export const Message = styled.li<IProps>`
  background-color: #333;
  color: #fff;
  max-width: 100%;
  padding: 5px;
  margin: 3px;
  &:first-child {
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }
  &:last-child {
    margin-bottom: 0;
    ${({ type }) => {
      const side = type === 'robot' ? 'right' : 'left';
      return `border-bottom-${side}-radius: 10px;`;
    }}
  }
`;
export const Input = styled.div`
  background-color: #fff;
  border-radius: 0 0 10px 10px;
  border: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: stretch;
  justify-content: flex-start;

  > input {
    flex: 1;
    border-radius: 0 0 0 10px;
    border: 0;
  }

  > button {
    background: transparent;
    border: 0;
  }
`;
