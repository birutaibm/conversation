import IConversation from '../../models/IConversation';
import MongoConversation, {
  extractInfo,
} from '../../models/implementations/Conversation';
import IConversationsRepository from '../IConversationsRepository';
import IMessage from '../../models/IMessage';

export default class ConversationsRepository
  implements IConversationsRepository {
  public async getAll(): Promise<IConversation[]> {
    const mongoConversations = await MongoConversation.find();
    return mongoConversations
      .map(conversation => extractInfo(conversation))
      .filter(conversation => conversation !== undefined) as IConversation[];
  }

  public async save(
    conversation: Omit<IConversation, 'id'>,
  ): Promise<IConversation> {
    const mongoCreated = await MongoConversation.create(conversation);
    const mongoConversation = extractInfo(mongoCreated) as IConversation;
    return mongoConversation;
  }

  public async update(
    id: string,
    conversation: Partial<Omit<IConversation, 'id'>>,
  ): Promise<IConversation> {
    const mongoCreated = await MongoConversation.findByIdAndUpdate(
      id,
      conversation,
    );
    const mongoConversation = extractInfo(mongoCreated) as IConversation;
    return mongoConversation;
  }

  public async findById(id: string): Promise<IConversation | undefined> {
    const mongoFound = await MongoConversation.findById(id);
    return extractInfo(mongoFound);
  }

  public async deleteId(id: string): Promise<boolean> {
    const mongoDeleted = await MongoConversation.deleteOne({ _id: id });
    return mongoDeleted.deletedCount === 1;
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
