import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public isLoggedIn:boolean

  constructor() {
    this.isLoggedIn = false
  }

  get token():string {
    return localStorage.getItem('token')
  }

  public login(token:string):void {
    this.isLoggedIn = true
    localStorage.setItem('token', token)
  }

  public logout():void {
    this.isLoggedIn = false
    localStorage.removeItem('token')
  }
}