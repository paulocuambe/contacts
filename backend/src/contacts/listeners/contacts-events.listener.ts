import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class ContactsEventsListener {
  @OnEvent('contact.created')
  handleContactCreatedEvent(event: any) {
    console.log(event);
  }
}
