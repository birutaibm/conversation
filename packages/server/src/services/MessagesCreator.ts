import IConversationsRepository from '../repositories/IConversationsRepository';

interface IMessageCreationDTO {
  conversationId: string;
  message: string;
}

interface IAnswer {
  id: string;
  message: string;
}

export default class MessagesCreator {
  constructor(private repository: IConversationsRepository) {}

  public async create({
    conversationId,
    message,
  }: IMessageCreationDTO): Promise<IAnswer> {
    const conversation = await this.repository.findById(conversationId);
    let answer: string;
    if (!conversation.emailConfirm) {
      if (!conversation.email) {
        const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        const email = message.split(' ').find(word => word.match(re));
        if (email) {
          conversation.email = email;
          answer = `Você gostaria que o Criador te respondesse no e-mail ${email}? Responda com o e-mail para confirmar`;
        } else if (conversation.disclosure) {
          answer =
            'Não se esqueça de deixar um endereço de e-mail para o Criador entrar em contato com você';
        } else {
          conversation.disclosure = true;
          answer =
            'Não compreendo a linguagem dos humanos, mas enviarei ao meu mestre, o Criador, qualquer mensagem que você me mandar';
        }
      } else {
        const mailFound = message
          .split(' ')
          .find(word => word === conversation.email);
        if (mailFound) {
          conversation.emailConfirm = true;
          answer = 'Entendi, direi ao criador para responder nesse e-mail';
        } else {
          conversation.email = null;
          answer = 'Desculpe, eu tinha entendido errado. Continue, por favor';
        }
      }
    } else {
      answer = 'Direi a ele';
    }
    conversation.messages.push({ owner: 'human', content: message });
    conversation.messages.push({ owner: 'robot', content: answer });
    delete conversation.id;
    await this.repository.update(conversationId, conversation);
    return {
      id: conversationId,
      message: answer,
    };
  }
}
