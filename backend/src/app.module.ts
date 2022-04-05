import { Module } from '@nestjs/common';
import { ContactsModule } from './contacts/contacts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from 'ormconfig';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot(ormConfig),
    ContactsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
