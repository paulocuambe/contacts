import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDo } from './create-contact.dto';

export class UpdateContactDo extends PartialType(CreateContactDo) {}
