import { Request, Response } from 'express';

import * as Provider from '../repositories/provider';
import ConversationsRecover from '../services/ConversationsRecover';
import ConversationsCreator from '../services/ConversationsCreator';
import IConversationsRepository from '../repositories/IConversationsRepository';

export default class ConversationController {
  private repository: IConversationsRepository;

  private recover: ConversationsRecover;

  private creator: ConversationsCreator;

  constructor(repository?: IConversationsRepository) {
    if (repository) {
      this.repository = repository;
    }
  }

  private getConversationsRepository(): IConversationsRepository {
    if (!this.repository) {
      this.repository = Provider.IConversationsRepository.implementation;
    }
    return this.repository;
  }

  private getConversationsRecover(): ConversationsRecover {
    if (!this.recover) {
      this.recover = new ConversationsRecover(
        this.getConversationsRepository(),
      );
    }
    return this.recover;
  }

  private getConversationsCreator(): ConversationsCreator {
    if (!this.creator) {
      this.creator = new ConversationsCreator(
        this.getConversationsRepository(),
      );
    }
    return this.creator;
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const conversations = await this.getConversationsRecover().recoverAll();
    return response.json(conversations);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const conversations = await this.getConversationsRecover().recover(id);
    return response.json(conversations);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const conversation = await this.getConversationsCreator().create();
    return response.status(201).json(conversation);
  }
}
