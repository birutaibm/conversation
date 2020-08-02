import ConversationsRepository from '../implementations/ConversationsRepository';
import FakeConversationsRepository from '../mocks/FakeConversationsRepository';
import IConversationsRepository from '../IConversationsRepository';

import { IProvider } from '.';

const IConversationsRepositoryProvider: IProvider<IConversationsRepository> = {
  implementation: new ConversationsRepository(),
  mock: () => new FakeConversationsRepository(),
};

export default IConversationsRepositoryProvider;
