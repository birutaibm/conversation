import IMessage from '../models/IMessage';
import IConversationsRepository from '../repositories/IConversationsRepository';

export default class MessagesRecover {
  constructor(private repository: IConversationsRepository) {}

  public async recoverAll(conversationId: string): Promise<IMessage[]> {
    const messages = await this.repository.findMessagesByConversationId(
      conversationId,
    );
    return messages;
  }
}
