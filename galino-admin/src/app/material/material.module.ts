import {NgModule} from '@angular/core'

import {MatButtonModule} from '@angular/material/button'
import {MatDividerModule} from '@angular/material/divider'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatListModule} from '@angular/material/list'
import {MatProgressBarModule} from '@angular/material/progress-bar'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatSnackBarModule} from '@angular/material/snack-bar'

@NgModule({
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatSnackBarModule
  ],
  exports: [
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatSnackBarModule
  ]
})
export class MaterialModule {}