import IMessage from '../models/IMessage';

export default interface IMessagesRepository {
  findByConversationId: (conversationId: string) => Promise<IMessage[]>;
  addMessagesToConversation: (
    conversationId: string,
    ...messages: IMessage[]
  ) => Promise<void>;
}
