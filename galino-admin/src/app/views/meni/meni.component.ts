import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Menu } from 'src/app/shared/models/menu.model';
import { SocketService } from 'src/app/shared/socket/socket.service';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
  selector: 'app-meni',
  templateUrl: './meni.component.html',
  styleUrls: ['./meni.component.css']
})
export class MeniComponent implements OnDestroy, OnInit {
  public menuList:Menu[]
  public menuForm:FormGroup
  public isLoading:boolean

  constructor(
    private readonly _formBuilder:FormBuilder,
    private readonly _matSnackBar:MatSnackBar,
    private readonly _socketService:SocketService,
    private readonly _userService:UserService
  ) {
    this.menuList = []
    this.isLoading = false
  }

  private _buildMenuForm():FormGroup {
    const {_formBuilder} = this

    return _formBuilder.group({
      menus: _formBuilder.array(
        this.menuList.map((menu) => _formBuilder.group({
          title: [menu.title, [Validators.required]],
          items: _formBuilder.array(
            menu.items.map((item) => _formBuilder.group({
              name: [item.name, [Validators.required]],
              ingredients: [item.ingredients, [Validators.required]],
              price: [item.price, [Validators.required]]
            }))
          )
        }))
      )
    })
  }
  public get menus():FormArray {
    return this.menuForm.get('menus') as FormArray
  }
  public title(i:number):FormControl {
    return this.menus.controls[i].get('title') as FormControl
  }
  public items(i:number):FormArray {
    return this.menus.controls[i].get('items') as FormArray
  }
  public name(i:number, k:number):FormControl {
    return this.items(i).controls[k].get('name') as FormControl
  }
  public ingredients(i:number, k:number):FormControl {
    return this.items(i).controls[k].get('ingredients') as FormControl
  }
  public price(i:number, k:number):FormControl {
    return this.items(i).controls[k].get('price') as FormControl
  }

  public ngOnDestroy():void {
    this._socketService.socket.off('getMenusRes')
    this._socketService.socket.off('saveMenuRes')
  }
  public ngOnInit():void {
    this._socketService.socket.on('getMenusRes', (menus:Menu[]) => {
      this.menuList = menus
      this.menuForm = this._buildMenuForm()
    })

    this._socketService.socket.on('saveMenuRes', () => {
      this.isLoading = false
      this._matSnackBar.open('Uspešno ste sačuvali meni', '', {duration: 7000})
    })

    this._socketService.socket.emit('getMenus')
  }

  public onRmMenu(i:number):void {
    this.menus.removeAt(i)
  }
  public onRmProduct(i:number, k:number):void {
    this.items(i).removeAt(k)
  }
  public onAddProduct(i:number):void {
    const food = this._formBuilder.group({
      name: ['', [Validators.required]],
      ingredients: ['', [Validators.required]],
      price: ['', [Validators.required]]
    })

    this.items(i).push(food)
  }
  public onAddMenu():void {
    const menu = this._formBuilder.group({
      title: ['', Validators.required],
      items: this._formBuilder.array([])
    })

    this.menus.push(menu)
  }

  public onSubmit():void {
    const token = this._userService.token
    const {menus} = this.menuForm.value

    this.isLoading = true
    this._socketService.socket.emit('saveMenu', {token, menus})
  }
}