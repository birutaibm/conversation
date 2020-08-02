import IConversationsRepository from '../repositories/IConversationsRepository';
import IConversation from '../models/IConversation';

export default class ConversationsRecover {
  constructor(private repository: IConversationsRepository) {}

  public async recoverAll(): Promise<IConversation[]> {
    const conversations = await this.repository.getAll();
    return conversations;
  }

  public async recover(id: string): Promise<IConversation> {
    const conversations = await this.repository.findById(id);
    return conversations;
  }
}
