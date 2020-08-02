import ConversationsCreator from './ConversationsCreator';
import IConversationsRepository from '../repositories/IConversationsRepository';
import IConversationsRepositoryProvider from '../repositories/provider/IConversationsRepositoryProvider';

let repository: IConversationsRepository;
let service: ConversationsCreator;

describe('Conversations Creator', () => {
  beforeEach(() => {
    repository = IConversationsRepositoryProvider.mock();
    service = new ConversationsCreator(repository);
  });

  it('should be able to save tool in the repository', async () => {
  });
});
