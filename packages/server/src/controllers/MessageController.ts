import { Request, Response } from 'express';

import IMessagesRepository from '../repositories/IMessagesRepository';
import * as Provider from '../repositories/provider';
import MessagesRecover from '../services/MessagesRecover';
import MessagesCreator from '../services/MessagesCreator';

export default class MessageController {
  private readonly recover: MessagesRecover;

  private readonly creator: MessagesCreator;

  constructor(messagesRepository?: IMessagesRepository) {
    const repository =
      messagesRepository || Provider.IMessagesRepository.implementation;
    this.recover = new MessagesRecover(repository);
    this.creator = new MessagesCreator(repository);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { conversationId } = request.params;
    const messages = await this.recover.recoverAll(conversationId);
    return response.json(messages);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { conversationId } = request.params;
    const { message } = request.body;
    const answer = await this.creator.create({ conversationId, message });
    return response.status(201).json(answer);
  }
}
