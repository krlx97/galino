import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MaterialModule} from './material/material.module'
import {MeniComponent} from './views/meni/meni.component'
import {GalerijaComponent} from './views/galerija/galerija.component'
import {ReactiveFormsModule} from '@angular/forms'
import {LoginComponent} from './login/login.component'

@NgModule({
  declarations: [
    AppComponent,
    MeniComponent,
    GalerijaComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}