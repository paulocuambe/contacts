import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from 'eventemitter2';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactDo } from './dto/create-contact.dto';
import { UpdateContactDo } from './dto/update-contact.dto';
import { ContactLog } from './entities/contact-log.entity';
import { SearchParams } from './dto/SearchParams.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact) private contactsRepository: Repository<Contact>,
    @InjectRepository(ContactLog)
    private contactLogRepository: Repository<ContactLog>,
    private eventEmitter: EventEmitter2,
  ) {}

  findAll(query?: SearchParams): Promise<Contact[]> {
    const dbQuery = this.contactsRepository.createQueryBuilder('contact');

    if (query.q) {
      dbQuery.where(
        `contact.firstName LIKE '%${query.q}%' or contact.lastName LIKE '%${query.q}%' or contact.email LIKE '%${query.q}%' or contact.phoneNumber LIKE '%${query.q}%'`,
      );
    }

    if (['true', 'false'].includes(query.deleted)) {
      dbQuery.andWhere(`contact.deleted = ${query.deleted}`);
    }

    console.log(dbQuery.getQuery());

    return dbQuery.getMany();
  }

  async findById(id: number): Promise<Contact> {
    return this.contactsRepository.findOneOrFail(id, {
      where: {
        deleted: false,
      },
    });
  }

  async findLogs(id: number): Promise<ContactLog[]> {
    return this.contactLogRepository.find({
      where: {
        contact: {
          id,
        },
      },
      order: {
        generated_at: 'DESC',
      },
    });
  }

  async create(creatContactDto: CreateContactDo): Promise<Contact> {
    let contact = this.contactsRepository.create(creatContactDto);

    contact = await this.contactsRepository.save(contact);
    this.eventEmitter.emit('contact.created', contact);

    return contact;
  }

  async update(
    id: number,
    updateContactDto: UpdateContactDo,
  ): Promise<Contact> {
    let contact = await this.findById(id);

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
      contact = await this.contactsRepository.save(contact);
      this.eventEmitter.emit('contact.updated', contact);
    }

    return contact;
  }

  async delete(id: number): Promise<Contact> {
    let contact = await this.findById(id);
    contact.deleted = true;

    contact = await this.contactsRepository.save(contact);
    this.eventEmitter.emit('contact.deleted', contact);

    return contact;
  }
}
