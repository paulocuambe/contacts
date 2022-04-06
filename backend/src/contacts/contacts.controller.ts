import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { DuplicateEntriesFilter } from 'src/exceptions/duplicate-entries.filter';
import { EntityNotFoundFilter } from 'src/exceptions/entity-not-found.filter';
import { Contact } from './entities/contact.entity';
import { ContactsService } from './contacts.service';
import { CreateContactDo } from './dto/create-contact.dto';
import { UpdateContactDo } from './dto/update-contact.dto';
import { ContactLog } from './entities/contact-log.entity';

@UseFilters(EntityNotFoundFilter, DuplicateEntriesFilter)
@Controller('api/contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  findAll(): Promise<Contact[]> {
    return this.contactsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id): Promise<Contact> {
    return this.contactsService.findById(+id);
  }

  @Get(':id/logs')
  findLogs(@Param('id') id): Promise<ContactLog[]> {
    return this.contactsService.findLogs(+id);
  }

  @Post()
  create(@Body() createContactDto: CreateContactDo) {
    return this.contactsService.create(createContactDto);
  }

  @Patch(':id')
  update(@Param('id') id, @Body() updateContactDto: UpdateContactDo) {
    return this.contactsService.update(+id, updateContactDto);
  }

  @Delete(':id')
  delete(@Param('id') id) {
    return this.contactsService.delete(id);
  }
}
