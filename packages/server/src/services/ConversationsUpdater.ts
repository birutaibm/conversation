import IConversationsRepository from '../repositories/IConversationsRepository';
import IConversation from '../models/IConversation';

interface IAnswer {
  id: string;
  message: string;
}

export default class ConversationsUpdater {
  constructor(private repository: IConversationsRepository) {}

  public async addMessage(id: string, message: string): Promise<IAnswer> {
    const messages = await this.repository.findById(id);
    const answer =
      'Não compreendo a linguagem dos humanos, mas enviarei ao meu mestre, o Criador, qualquer mensagem que você me mandar';
    if (!messages.email) {
      const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
      const email = message.split(' ').find(word => word.match(re));
      if (email) {
        messages.email = email;
      }
    }

    messages.messages.push({
      owner: 'human',
      content: message,
    });
    messages.messages.push({
      owner: 'robot',
      content: answer,
    });
    const conversation = await this.repository.save(messages);
    return {
      id: conversation.id,
      message: answer,
    };
  }
}
