import React from 'react';

import {
  MessageGroupContainer,
  MessageGroupAvatar,
  MessageGroupContent,
} from './styles';

interface IProps {
  type: 'human' | 'robot';
  children: React.ReactNode;
}

const MessageGroup: React.FC<IProps> = ({ type, children }) => {
  return (
    <MessageGroupContainer type={type}>
      <MessageGroupAvatar type={type} />
      <MessageGroupContent>{children}</MessageGroupContent>
    </MessageGroupContainer>
  );
};

export default MessageGroup;
