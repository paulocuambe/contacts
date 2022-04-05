import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './contact.entity';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { ContactsEventsListener } from './listeners/contacts-events.listener';

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  controllers: [ContactsController],
  providers: [ContactsService, ContactsEventsListener],
})
export class ContactsModule {}
