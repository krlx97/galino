import {Component} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {MatDialogRef} from '@angular/material/dialog'
import {MatSnackBar} from '@angular/material/snack-bar'
import {SocketService} from 'src/app/shared/socket/socket.service'
import {ReserveFormErrors} from 'src/app/shared/models/reserve-form-errors.model'

@Component({
  selector: 'app-rezervacija-dialog',
  templateUrl: './rezervacija-dialog.component.html',
  styleUrls: ['./rezervacija-dialog.component.css']
})
export class RezervacijaDialogComponent {
  public readonly reserveForm:FormGroup
  public readonly reserveFormErrors:ReserveFormErrors
  public isFetching:boolean

  constructor(
    private readonly _matDialogRef:MatDialogRef<RezervacijaDialogComponent>,
    private readonly _formBuilder:FormBuilder,
    private readonly _matSnackBar:MatSnackBar,
    private readonly _socketService:SocketService
  ) {
    this.reserveForm = this._buildReserveForm()
    this.reserveFormErrors = this._buildReserveFormErrors()
    this.isFetching = false
  }

  private _buildReserveForm():FormGroup {
    return this._formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      guests: [1, [Validators.required, Validators.min(1)]],
      date: ['', [Validators.required]],
      note: ['', [Validators.maxLength(500)]]
    })
  }

  private get _name():FormControl {
    return this.reserveForm.get('name') as FormControl
  }
  private get _email():FormControl {
    return this.reserveForm.get('email') as FormControl
  }
  private get _phone():FormControl {
    return this.reserveForm.get('phone') as FormControl
  }
  private get _guests():FormControl {
    return this.reserveForm.get('guests') as FormControl
  }
  private get _date():FormControl {
    return this.reserveForm.get('date') as FormControl
  }
  private get _note():FormControl {
    return this.reserveForm.get('note') as FormControl
  }

  private _isEmptyField(control:FormControl):boolean {
    return !control.value && control.touched
  }
  private _isEmailValid(control:FormControl):boolean {
    return control.value && control.invalid
  }
  private _isMinLength(control:FormControl):boolean {
    return control.value && control.value.length <= 10 && control.touched
  }

  private _buildReserveFormErrors():ReserveFormErrors {
    const {_name, _email, _phone, _guests, _date, _note} = this

    return {
      name: () => {
        if (this._isEmptyField(_name)) {
          return 'Polje ne sme biti prazno'
        }
      },
      email: () => {
        if (this._isEmailValid(_email)) {
          return 'Email nije validan'
        } else if (this._isEmptyField(_email)) {
          return 'Polje ne sme biti prazno'
        }
      },
      phone: () => {
        if (this._isEmptyField(_phone)) {
          return 'Polje ne sme biti prazno'
        }
      },
      guests: () => {
        if (this._isEmptyField(_guests)) {
          return 'Polje ne sme biti prazno, minimum 1'
        }
      },
      date: () => {
        if (this._isEmptyField(_date)) {
          return 'Polje ne sme biti prazno'
        }
      },
      note: () => ''
    }
  }

  public ngOnInit():void {
    this._socketService.socket.on('reserveRes', () => {
      this._matSnackBar.open('Uspešno ste poslali email administratoru', '', {duration: 7000})
      this._matDialogRef.close()
    })
  }
  public ngOnDestroy():void {
    this._socketService.socket.off('reserveRes')
  }

  public getDefaultTime():string[] {
    const now = new Date()
    const h = now.getHours().toString()
    const m = now.getMinutes().toString()
    const s = '00'

    return [h, m, s]
  }

  public onReserveFormSubmit():void {
    const {name, email, phone, guests, note} = this.reserveForm.value
    const now = new Date(this.reserveForm.value.date)
    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()
    const h = now.getHours()
    const m = now.getMinutes()
    const date = `${day}/${month}/${year} | ${h}:${m}h`
    const data = {name, email, phone, guests, date, note}

    this._socketService.socket.emit('reserve', data)
    this.isFetching = true
  }
}