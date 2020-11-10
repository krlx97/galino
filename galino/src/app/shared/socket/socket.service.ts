import {Injectable} from '@angular/core'
import * as io from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public readonly socket:SocketIOClient.Socket

  constructor() {
    // production: 'wss://localhost:443'
    this.socket = io('ws://localhost:8080')
  }
}