import IConversationsRepository from '../IConversationsRepository';
import IConversation from '../../models/IConversation';
import IMessage from '../../models/IMessage';

export default class FakeConversationsRepository
  implements IConversationsRepository {
  private conversations: IConversation[];

  constructor() {
    this.conversations = [];
  }

  public async getAll(): Promise<IConversation[]> {
    return [...this.conversations];
  }

  public async save(
    conversation: Omit<IConversation, 'id'>,
  ): Promise<IConversation> {
    const lastIndex = this.conversations.length - 1;
    const lastId = this.conversations[lastIndex]
      ? Number(this.conversations[lastIndex].id)
      : 0;
    const id = (lastId + 1).toString();
    const newConversation = { ...conversation, id };
    this.conversations.push(newConversation);
    return newConversation;
  }

  public async findById(id: string): Promise<IConversation | undefined> {
    return this.conversations.find(conversation => conversation.id === id);
  }

  public async deleteId(id: string): Promise<boolean> {
    const index = this.conversations.findIndex(
      conversation => conversation.id === id,
    );
    if (index !== -1) {
      this.conversations.splice(index, 1);
      return true;
    }
    return false;
  }

  public async update(
    id: string,
    conversation: Partial<Omit<IConversation, 'id'>>,
  ): Promise<IConversation> {
    return Object.assign(
      this.conversations.find(candidate => candidate.id === id),
      conversation,
    );
  }

  public async findMessagesByConversationId(
    conversationId: string,
  ): Promise<IMessage[]> {
    const { messages } = await this.findById(conversationId);
    return messages;
  }

  public async addMessagesToConversation(
    conversationId: string,
    ...messages: IMessage[]
  ): Promise<void> {
    const conversation = await this.findById(conversationId);
    const allMessages = [...conversation.messages, ...messages];
    await this.update(conversation.id, { messages: allMessages });
  }
}
