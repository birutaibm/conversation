import IConversationsRepositoryProvider from './IConversationsRepositoryProvider';
import IMessagesRepositoryProvider from './IMessagesRepositoryProvider';

export interface IProvider<T> {
  implementation: T;
  mock: () => T;
}

export const IConversationsRepository = IConversationsRepositoryProvider;

export const IMessagesRepository = IMessagesRepositoryProvider;
