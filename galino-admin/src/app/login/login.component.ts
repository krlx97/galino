import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {MatSnackBar} from '@angular/material/snack-bar'
import {SocketService} from '../shared/socket/socket.service'
import {UserService} from '../shared/user/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy, OnInit {
  public readonly loginForm:FormGroup
  public isLoading:boolean

  constructor(
    private readonly _formBuilder:FormBuilder,
    private readonly _matSnackBar:MatSnackBar,
    private readonly _socketService:SocketService,
    private readonly _userService:UserService
  ) {
    this.loginForm = this._buildLoginForm()
    this.isLoading = false
  }

  private _buildLoginForm():FormGroup {
    return this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  public ngOnDestroy():void {
    this._socketService.socket.off('loginRes')
    this._socketService.socket.off('authRes')
  }
  public ngOnInit():void {
    const token = localStorage.getItem('token')

    this._socketService.socket.on('loginRes', ({token, msg}) => {
      if (token) {
        this._userService.login(token)
      }

      this._matSnackBar.open(msg, '', {duration: 7000})
      this.isLoading = false
    })

    this._socketService.socket.on('authRes', () => {
      this._userService.isLoggedIn = true
    })

    if (token) {
      this._socketService.socket.emit('auth', {token})
    }
  }

  public onLoginSubmit():void {
    this._socketService.socket.emit('login', this.loginForm.value)
    this.isLoading = true
  }
}