import {NgModule} from '@angular/core'

import {MatButtonModule} from '@angular/material/button'
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatDialogModule} from '@angular/material/dialog'
import {MatDividerModule} from '@angular/material/divider'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatProgressBarModule} from '@angular/material/progress-bar'
import {MatSnackBarModule} from '@angular/material/snack-bar'

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule
} from '@angular-material-components/datetime-picker'

@NgModule({
  imports: [
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatSnackBarModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule
  ],
  exports: [
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatSnackBarModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule
  ]
})
export class MaterialModule {}