import IMessage from '../../models/IMessage';
import IConversationsRepository from '../IConversationsRepository';
import IMessagesRepository from '../IMessagesRepository';
import * as Provider from '../provider';

export default class MessagesRepository implements IMessagesRepository {
  private readonly conversations: IConversationsRepository;

  constructor(conversationsRepository?: IConversationsRepository) {
    this.conversations =
      conversationsRepository ||
      Provider.IConversationsRepository.implementation;
  }

  public async findByConversationId(
    conversationId: string,
  ): Promise<IMessage[]> {
    const conversation = await this.conversations.findById(conversationId);
    return conversation.messages;
  }

  public async addMessagesToConversation(
    conversationId: string,
    ...messages: IMessage[]
  ): Promise<void> {
    if (messages.length) {
      const conversation = await this.conversations.findById(conversationId);
      const allMessages = [...conversation.messages, ...messages];
      await this.conversations.save({ ...conversation, messages: allMessages });
    }
  }
}
