import { Request, Response } from 'express';

import * as Provider from '../repositories/provider';
import MessagesRecover from '../services/MessagesRecover';
import MessagesCreator from '../services/MessagesCreator';
import IConversationsRepository from '../repositories/IConversationsRepository';

export default class MessageController {
  private repository: IConversationsRepository;

  private recover: MessagesRecover;

  private creator: MessagesCreator;

  constructor(repository?: IConversationsRepository) {
    if (repository) {
      this.repository = repository;
    }
  }

  private getMessagesRepository(): IConversationsRepository {
    if (!this.repository) {
      this.repository = Provider.IConversationsRepository.implementation;
    }
    return this.repository;
  }

  private getMessagesRecover(): MessagesRecover {
    if (!this.recover) {
      this.recover = new MessagesRecover(this.getMessagesRepository());
    }
    return this.recover;
  }

  private getMessagesCreator(): MessagesCreator {
    if (!this.creator) {
      this.creator = new MessagesCreator(this.getMessagesRepository());
    }
    return this.creator;
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { conversationId } = request.params;
    const messages = await this.getMessagesRecover().recoverAll(conversationId);
    return response.json(messages);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { conversationId } = request.params;
    const { message } = request.body;
    const answer = await this.getMessagesCreator().create({
      conversationId,
      message,
    });
    return response.status(201).json(answer);
  }
}
