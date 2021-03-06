import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { ContactsEventsListener } from './listeners/contacts-events.listener';
import { ContactLog } from './entities/contact-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contact, ContactLog])],
  controllers: [ContactsController],
  providers: [ContactsService, ContactsEventsListener],
})
export class ContactsModule {}
