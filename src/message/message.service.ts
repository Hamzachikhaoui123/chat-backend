import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {

  messages:Message[]=[{name:"hamza",text:"bonjour"}]
   clientTouser={};
  create(createMessageDto: CreateMessageDto,clientId:string) {
    const message={name:this.clientTouser[clientId],text:createMessageDto.text}
     this.messages.push(createMessageDto);
     return message;
  }
identify(name:string,clientId:string){
  this.clientTouser[clientId]=name;
  return Object.values(this.clientTouser)
}
getClientName(clientId:string){
  return this.clientTouser[clientId];
}
  findAll() {
    return this.messages;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} message`;
  // }

  // update(id: number, updateMessageDto: UpdateMessageDto) {
  //   return `This action updates a #${id} message`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} message`;
  // }
}
