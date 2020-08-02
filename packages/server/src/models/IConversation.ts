import IMessage from './IMessage';

export default interface IConversation {
  id: string;
  email?: string;
  emailConfirm: boolean;
  messages: IMessage[];
}
