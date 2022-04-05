import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
export class CreateContactDo {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;
}
