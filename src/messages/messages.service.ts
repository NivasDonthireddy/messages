import { Inject, Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateMessageDto } from './dtos/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    public messagesRepo: Repository<Message>,
    @InjectRepository(EntityManager)
    public manager: Repository<EntityManager>,
  ) {}

  async findOne(id: number) {
    return this.messagesRepo.findOneBy({ id });
  }

  findAll() {
    return this.messagesRepo.find();
  }

  async create(body: CreateMessageDto) {
    const message = await this.messagesRepo.create({
      message: body.content,
      status: body.status,
    });
    return this.messagesRepo.save(message);
  }
}
