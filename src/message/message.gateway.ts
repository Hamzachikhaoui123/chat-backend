import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from "socket.io"
@WebSocketGateway({ cors: { origin: "*" } })
export class MessageGateway {
  @WebSocketServer()
  server: Server
  constructor(private readonly messageService: MessageService) { }

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto,@ConnectedSocket() client:Socket) {
    const message = await this.messageService.create(createMessageDto,client.id);
    this.server.emit('message', message)
    return message
  }

  @SubscribeMessage('findAllMessage')
  findAll() {
    return this.messageService.findAll();
  }
  @SubscribeMessage('join')
  joinRoom(
  @MessageBody('name') name: string,
  @ConnectedSocket() client: Socket) {
    return this.messageService.identify(name, client.id)

  }

  @SubscribeMessage('typing')
  async typing(@MessageBody('isTyping') isTyping:boolean,@ConnectedSocket() client:Socket) {

    const name =await this.messageService.getClientName(client.id)
    client.broadcast.emit('typing',{name,isTyping})
   }
  // @SubscribeMessage('findOneMessage')
  // findOne(@MessageBody() id: number) {
  //   return this.messageService.findOne(id);
  // }

  // @SubscribeMessage('updateMessage')
  // update(@MessageBody() updateMessageDto: UpdateMessageDto) {
  //   return this.messageService.update(updateMessageDto.id, updateMessageDto);
  // }

  // @SubscribeMessage('removeMessage')
  // remove(@MessageBody() id: number) {
  //   return this.messageService.remove(id);
  // }
}
