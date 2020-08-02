import IConversation from '../models/IConversation';
console.log('creating ConversationsRepository');

export default interface IConversationsRepository {
  getAll: () => Promise<IConversation[]>;
  save: (conversation: Omit<IConversation, 'id'>) => Promise<IConversation>;
  findById: (id: string) => Promise<IConversation | undefined>;
  deleteId: (id: string) => Promise<boolean>;
}
