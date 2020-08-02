import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';

import api from '../services/api';

interface IMessage {
  owner: 'human' | 'robot';
  content: string;
}

interface IMessages {
  id: string;
  owner: 'human' | 'robot';
  content: string[];
}

interface IConversationContext {
  messages: IMessages[];
  sendMessage: (message: string) => void;
}

const Context = createContext<IConversationContext>({} as IConversationContext);

export function useConversation(): IConversationContext {
  const context = useContext(Context);

  if (!context) {
    throw new Error(
      'useConversation must be used within an ConversationProvider',
    );
  }

  return context;
}

export const ConversationProvider: React.FC = ({ children }) => {
  const [id, setId] = useState<string | null>(null);

  const putMessage = useCallback(
    async (message: string): Promise<string> => {
      console.log('add message');
      const { data } = await api.put(`/conversation/${id}`, { message });
      return data.message;
    },
    [id],
  );

  const [messages, setMessages] = useState<IMessages[]>([]);

  const addMessage = useCallback((message: IMessage) => {
    setMessages(old => {
      const newMessages = [...old];
      const lastIndex = newMessages.length - 1;
      const lastGroup = lastIndex >= 0 && newMessages[lastIndex];
      if (lastGroup && lastGroup.owner === message.owner) {
        newMessages[lastIndex] = {
          ...lastGroup,
          content: [...lastGroup.content, message.content],
        };
      } else {
        newMessages.push({
          id: (lastIndex + 1).toString(),
          owner: message.owner,
          content: [message.content],
        });
      }
      return newMessages;
    });
  }, []);

  useEffect(() => {
    const create = async (): Promise<string> => {
      const { data } = await api.post('/conversation');
      setId(data.id);
      return data.message;
    };
    create().then(answer => {
      addMessage({
        owner: 'robot',
        content: answer,
      });
    });
  }, [addMessage]);

  const sendMessage = useCallback(
    (message: string) => {
      putMessage(message).then(answer => {
        addMessage({
          owner: 'human',
          content: message,
        });
        addMessage({
          owner: 'robot',
          content: answer,
        });
      });
    },
    [addMessage, putMessage],
  );

  return (
    <Context.Provider value={{ messages, sendMessage }}>
      {children}
    </Context.Provider>
  );
};
