import {Injectable} from '@angular/core'
import * as io from 'socket.io-client'
import * as SocketIOFileUpload from 'socketio-file-upload'

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  readonly socket:SocketIOClient.Socket
  readonly uploader:any

  constructor() {
    // production: 'wss://localhost:443'
    this.socket = io('ws://localhost:8080')
    this.uploader = new SocketIOFileUpload(this.socket)
  }
}