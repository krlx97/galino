import {Component, OnDestroy, OnInit} from '@angular/core'
import {MatSnackBar} from '@angular/material/snack-bar'
import {SocketService} from './shared/socket/socket.service'
import {UserService} from './shared/user/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
  constructor(
    private readonly _matSnackBar:MatSnackBar,
    private readonly _socketService:SocketService,
    public readonly userService:UserService
  ) {}

  public ngOnDestroy():void {
    this._socketService.socket.off('invalidToken')
    this._socketService.socket.off('expiredToken')
  }
  public ngOnInit():void {
    this._socketService.socket.on('invalidToken', () => {
      const msg = 'Došlo je do greške... Molimo vas, prijavite se ponovo'
      this.userService.logout()
      this._matSnackBar.open(msg, '', {duration: 7000})
    })

    this._socketService.socket.on('expiredToken', () => {
      const msg = 'Potvrda identiteta je istekla... Molimo vas, prijavite se ponovo'
      this.userService.logout()
      this._matSnackBar.open(msg, '', {duration: 7000})
    })
  }
}