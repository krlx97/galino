import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms'
import {MatSnackBar} from '@angular/material/snack-bar'
import {DeviceService} from 'src/app/shared/device/device.service'
import {SocketService} from 'src/app/shared/socket/socket.service'
import {ContactFormErrors} from 'src/app/shared/models/contact-form-errors.model'
import {ContactFormInitState} from 'src/app/shared/models/contact-form-init-state.model'

@Component({
  selector: 'app-kontakt',
  templateUrl: './kontakt.component.html',
  styleUrls: ['./kontakt.component.css']
})
export class KontaktComponent implements OnDestroy, OnInit {
  @ViewChild(FormGroupDirective) private readonly _$contactForm:NgForm

  public readonly contactForm:FormGroup
  public readonly contactFormInitState:ContactFormInitState
  public readonly contactFormErrors:ContactFormErrors
  public isFetching:boolean

  constructor(
    private readonly _formBuilder:FormBuilder,
    private readonly _matSnackBar:MatSnackBar,
    private readonly _socketService:SocketService,
    public readonly deviceService:DeviceService,
  ) {
    this.contactForm = this._buildContactForm()
    this.contactFormInitState = this.contactForm.value
    this.contactFormErrors = this._buildContactFormErrors()
    this.isFetching = false
  }

  private _buildContactForm():FormGroup {
    return this._formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      msg: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500)
      ]]
    })
  }

  private get _name():FormControl {
    return this.contactForm.get('name') as FormControl
  }
  private get _email():FormControl {
    return this.contactForm.get('email') as FormControl
  }
  private get _phone():FormControl {
    return this.contactForm.get('phone') as FormControl
  }
  private get _msg():FormControl {
    return this.contactForm.get('msg') as FormControl
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

  private _buildContactFormErrors():ContactFormErrors {
    const {_name, _email, _phone, _msg} = this

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
      msg: () => {
        if (this._isEmptyField(_msg)) {
          return 'Polje ne sme biti prazno'
        } else if (this._isMinLength(_msg)) {
          return 'Polje mora da sadrzi minimum 10 karaktera'
        }
      }
    }
  }

  public ngOnInit():void {
    this._socketService.socket.on('emailRes', () => {
      this._matSnackBar.open('Uspešno ste poslali email administratoru', '', {duration: 7000})
      this._$contactForm.resetForm(this.contactFormInitState)
      this.isFetching = false
    })
  }
  public ngOnDestroy():void {
    this._socketService.socket.off('emailRes')
  }

  public onContactFormSubmit():void {
    this._socketService.socket.emit('email', this.contactForm.value)
    this.isFetching = true
  }
}