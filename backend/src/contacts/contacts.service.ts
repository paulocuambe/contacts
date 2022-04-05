import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from 'eventemitter2';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';
import { CreateContactDo } from './dto/create-contact.dto';
import { UpdateContactDo } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact) private contactsRepository: Repository<Contact>,
    private eventEmitter: EventEmitter2,
  ) {}

  findAll(): Promise<Contact[]> {
    return this.contactsRepository.find({ deleted: false });
  }

  async findById(id: number): Promise<Contact> {
    return this.contactsRepository.findOneOrFail(id, {
      where: {
        deleted: false,
      },
    });
  }

  async create(creatContactDto: CreateContactDo): Promise<Contact> {
    let contact = this.contactsRepository.create(creatContactDto);
    contact = await this.contactsRepository.save(contact);

    this.eventEmitter.emit('contact.created', {
      title: 'contact',
      contact_id: contact.id,
      timestamp: contact.created_at,
      description: `contact created`,
    });

    return contact;
  }

  async update(
    id: number,
    updateContactDto: UpdateContactDo,
  ): Promise<Contact> {
    const contact = await this.findById(id);

    if (updateContactDto.firstName) {
      contact.firstName = updateContactDto.firstName;
    }

    if (updateContactDto.lastName) {
      contact.lastName = updateContactDto.lastName;
    }

    if (updateContactDto.email) {
      contact.email = updateContactDto.email;
    }

    if (updateContactDto.phoneNumber) {
      contact.phoneNumber = updateContactDto.phoneNumber;
    }

    if (contact) {
      return this.contactsRepository.save(contact);
    }
  }

  async delete(id: number): Promise<Contact> {
    const contact = await this.findById(id);
    contact.deleted = true;

    return this.contactsRepository.save(contact);
  }
}
