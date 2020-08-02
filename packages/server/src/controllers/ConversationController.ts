import { Request, Response } from 'express';

import IConversationsRepository from '../repositories/IConversationsRepository';
import * as Provider from '../repositories/provider';
import ConversationsRecover from '../services/ConversationsRecover';
import ConversationsCreator from '../services/ConversationsCreator';

export default class ConversationController {
  private readonly recover: ConversationsRecover;

  private readonly creator: ConversationsCreator;

  constructor(conversationsRepository?: IConversationsRepository) {
    const repository =
      conversationsRepository ||
      Provider.IConversationsRepository.implementation;
    this.recover = new ConversationsRecover(repository);
    this.creator = new ConversationsCreator(repository);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const conversations = await this.recover.recoverAll();
    return response.json(conversations);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const conversations = await this.recover.recover(id);
    return response.json(conversations);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const conversation = await this.creator.create();
    return response.status(201).json(conversation);
  }
}
