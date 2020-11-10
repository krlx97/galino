import {NgModule} from '@angular/core'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {BrowserModule} from '@angular/platform-browser'
import {ReactiveFormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'

import {AppRoutingModule} from './app-routing.module'
import {MaterialModule} from './material/material.module'

import {AppComponent} from './app.component'
import {FooterComponent} from './footer/footer.component'
import {HeaderComponent} from './header/header.component'
import {GalerijaComponent} from './views/galerija/galerija.component'
import {KontaktComponent} from './views/kontakt/kontakt.component'
import {MeniComponent} from './views/meni/meni.component'
import {PocetnaComponent} from './views/pocetna/pocetna.component'
import {RezervacijaComponent} from './views/rezervacija/rezervacija.component'
import {RezervacijaDialogComponent} from './views/rezervacija/rezervacija-dialog/rezervacija-dialog.component'

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    GalerijaComponent,
    KontaktComponent,
    MeniComponent,
    PocetnaComponent,
    RezervacijaComponent,
    RezervacijaDialogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    MaterialModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}