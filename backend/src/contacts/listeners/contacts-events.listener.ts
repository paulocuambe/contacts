import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactLog } from '../entities/contact-log.entity';
import { Contact } from '../entities/contact.entity';

type LogFields = {
  log_type: 'create' | 'update' | 'delete';
  description: string;
};

@Injectable()
export class ContactsEventsListener {
  constructor(
    @InjectRepository(ContactLog)
    private readonly contactsEventsRepository: Repository<ContactLog>,
  ) {}

  @OnEvent('contact.created')
  handleContactCreatedEvent(event: Contact) {
    this.contactsEventsRepository.save(
      this.getLog(event, {
        log_type: 'create',
        description: 'save contact',
      }),
    );
  }

  @OnEvent('contact.updated')
  handleContactUpdatedEvent(event: any) {
    this.contactsEventsRepository.save(
      this.getLog(event, {
        log_type: 'update',
        description: 'update contact',
      }),
    );
  }

  @OnEvent('contact.deleted')
  handleContactDeleteEvent(event: any) {
    this.contactsEventsRepository.save(
      this.getLog(event, {
        log_type: 'delete',
        description: 'delete contact',
      }),
    );
  }

  getLog(event: Contact, logFields: LogFields) {
    const log = {
      ...event,
      ...logFields,
      contact: event,
    };

    delete log.id;
    return log;
  }
}
