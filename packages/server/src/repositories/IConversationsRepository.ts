import IConversation from '../models/IConversation';
import IMessage from '../models/IMessage';

export default interface IConversationsRepository {
  getAll: () => Promise<IConversation[]>;
  save: (conversation: Omit<IConversation, 'id'>) => Promise<IConversation>;
  findById: (id: string) => Promise<IConversation | undefined>;
  deleteId: (id: string) => Promise<boolean>;
  update: (
    id: string,
    conversation: Partial<Omit<IConversation, 'id'>>,
  ) => Promise<IConversation>;

  findMessagesByConversationId: (conversationId: string) => Promise<IMessage[]>;
  addMessagesToConversation: (
    conversationId: string,
    ...messages: IMessage[]
  ) => Promise<void>;
}
