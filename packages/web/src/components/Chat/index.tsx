import React, { useState, useCallback, useRef } from 'react';

import MessageGroup from './MessageGroup';
import { Container, Header, Conversation, Message, Input } from './styles';
import { useConversation } from '../../hooks/conversation';

const Chat: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [typeMessage, setTypedMessage] = useState('');

  const { messages, sendMessage } = useConversation();

  const handleSend = useCallback(() => {
    setTypedMessage(message => {
      sendMessage(message);
      return '';
    });
  }, [sendMessage]);

  return (
    <Container>
      <Header>
        <h1>Chat</h1>
      </Header>
      <Conversation>
        {messages.map(messageGroup => (
          <MessageGroup key={messageGroup.id} type={messageGroup.owner}>
            {messageGroup.content.map((message, index) => (
              <Message key={index.toString()} type={messageGroup.owner}>
                {message}
              </Message>
            ))}
          </MessageGroup>
        ))}
      </Conversation>
      <Input>
        <input
          ref={inputRef}
          name="message"
          id="message"
          value={typeMessage}
          onChange={e => setTypedMessage(e.target.value)}
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={!typeMessage.length}
        >
          Send
        </button>
      </Input>
    </Container>
  );
};

export default Chat;
