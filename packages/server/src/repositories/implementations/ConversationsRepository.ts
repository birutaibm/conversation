import IConversation from '../../models/IConversation';
import MongoConversation, {
  extractInfo,
} from '../../models/implementations/Conversation';
import IConversationsRepository from '../IConversationsRepository';

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

  public async findById(id: string): Promise<IConversation | undefined> {
    const mongoFound = await MongoConversation.findById(id);
    return extractInfo(mongoFound);
  }

  public async deleteId(id: string): Promise<boolean> {
    const mongoDeleted = await MongoConversation.deleteOne({ _id: id });
    return mongoDeleted.deletedCount === 1;
  }
}
