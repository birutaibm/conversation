import MessagesRepository from '../implementations/MessagesRepository';
import FakeMessagesRepository from '../mocks/FakeMessagesRepository';
import IMessagesRepository from '../IMessagesRepository';

import { IProvider } from '.';

const IMessagesRepositoryProvider: IProvider<IMessagesRepository> = {
  implementation: new MessagesRepository(),
  mock: () => new FakeMessagesRepository(),
};

export default IMessagesRepositoryProvider;
