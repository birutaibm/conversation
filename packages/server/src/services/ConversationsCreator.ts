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
    // 'Não compreendo a linguagem dos humanos, mas enviarei ao meu mestre, o Criador, qualquer mensagem que você me mandar';
    const conversationInfo: Omit<IConversation, 'id'> = {
      emailConfirm: false,
      messages: [
        {
          owner: 'robot',
          content: answer,
        },
      ],
    };
    // const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    // const email = message.split(' ').find(word => word.match(re));
    // if (email) {
    //   conversationInfo.email = email;
    // }
    const conversation = await this.repository.save(conversationInfo);
    return {
      id: conversation.id,
      message: answer,
    };
  }
}
