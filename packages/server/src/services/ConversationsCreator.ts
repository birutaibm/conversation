import IConversationsRepository from '../repositories/IConversationsRepository';
import IConversation from '../models/IConversation';

interface IAnswer {
  id: string;
  message: string;
}

export default class ConversationsCreator {
  constructor(private repository: IConversationsRepository) {}

  public async create(): Promise<IAnswer> {
    const answer = 'Olá humano, me chamo Baby Bot, prazer';
    const conversationInfo: Omit<IConversation, 'id'> = {
      emailConfirm: false,
      disclosure: false,
      messages: [
        {
          owner: 'robot',
          content: answer,
        },
      ],
    };
    const conversation = await this.repository.save(conversationInfo);
    return {
      id: conversation.id,
      message: answer,
    };
  }
}
