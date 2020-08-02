import IMessagesRepository from '../repositories/IMessagesRepository';
import IMessage from '../models/IMessage';

export default class MessagesRecover {
  constructor(private repository: IMessagesRepository) {}

  public async recoverAll(conversationId: string): Promise<IMessage[]> {
    const messages = await this.repository.findByConversationId(conversationId);
    return messages;
  }
}
