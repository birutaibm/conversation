import IConversationsRepositoryProvider from './IConversationsRepositoryProvider';

export interface IProvider<T> {
  implementation: T;
  mock: () => T;
}

export const IConversationsRepository = IConversationsRepositoryProvider;
