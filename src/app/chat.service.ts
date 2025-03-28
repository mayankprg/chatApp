import { inject, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket = inject(Socket);
  
  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }

  getMessages() {
    const msgObs = this.socket.fromEvent('message')
    return msgObs
  }
  
}
