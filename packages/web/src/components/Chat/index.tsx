import React, { useState, useCallback, useRef, useEffect } from 'react';

import MessageGroup from './MessageGroup';
import { Container, Header, Conversation, Message, Input } from './styles';
import { useConversation } from '../../hooks/conversation';

const Chat: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const conversationElement = useRef<HTMLUListElement>(null);

  const [typeMessage, setTypedMessage] = useState('');

  const { messages, sendMessage } = useConversation();

  const handleSend = useCallback(() => {
    sendMessage(typeMessage);
    setTypedMessage('');
  }, [sendMessage, typeMessage]);

  useEffect(() => {
    const element = conversationElement.current;
    if (element) {
      if (element.scrollTop < element.scrollHeight - element.offsetHeight) {
        element.scrollTop += element.scrollHeight - element.offsetHeight;
      }
    }
  }, [conversationElement, messages]);

  return (
    <Container>
      <Header>
        <h1>Chat</h1>
      </Header>
      <Conversation ref={conversationElement}>
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
