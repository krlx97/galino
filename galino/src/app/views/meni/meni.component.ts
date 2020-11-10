import {Component, OnDestroy, OnInit} from '@angular/core'
import {SocketService} from 'src/app/shared/socket/socket.service'
import {Menu} from 'src/app/shared/models/menu.model'

@Component({
  selector: 'app-meni',
  templateUrl: './meni.component.html',
  styleUrls: ['./meni.component.css']
})
export class MeniComponent implements OnDestroy, OnInit {
  public menus:Menu[]

  constructor(private readonly _socketService:SocketService) {
    this.menus = []
  }

  public ngOnDestroy():void {
    this._socketService.socket.off('getMenusRes')
  }
  public ngOnInit():void {
    this._socketService.socket.on('getMenusRes', (menus:Menu[]) => {
      this.menus = menus
    })

    this._socketService.socket.emit('getMenus')
  }
}