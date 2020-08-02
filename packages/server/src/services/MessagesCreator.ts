import IMessagesRepository from '../repositories/IMessagesRepository';

interface IMessageCreationDTO {
  conversationId: string;
  message: string;
}

interface IAnswer {
  id: string;
  message: string;
}

export default class MessagesCreator {
  constructor(private repository: IMessagesRepository) {}

  public async create({
    conversationId,
    message,
  }: IMessageCreationDTO): Promise<IAnswer> {
    const answer =
      'Não compreendo a linguagem dos humanos, mas enviarei ao meu mestre, o Criador, qualquer mensagem que você me mandar';
    await this.repository.addMessagesToConversation(
      conversationId,
      { owner: 'human', content: message },
      { owner: 'robot', content: answer },
    );
    // const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    // const email = message.split(' ').find(word => word.match(re));
    // if (email) {
    //   conversationInfo.email = email;
    // }
    return {
      id: conversationId,
      message: answer,
    };
  }
}
