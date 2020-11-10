import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'

import {GalerijaComponent} from './views/galerija/galerija.component'
import {KontaktComponent} from './views/kontakt/kontakt.component'
import {MeniComponent} from './views/meni/meni.component'
import {PocetnaComponent} from './views/pocetna/pocetna.component'
import {RezervacijaComponent} from './views/rezervacija/rezervacija.component'

const routes:Routes = [
  {path: '', redirectTo: '/pocetna', pathMatch: 'full'},
  {path: 'pocetna',     component: PocetnaComponent},
  {path: 'meni',        component: MeniComponent},
  {path: 'rezervacija', component: RezervacijaComponent},
  {path: 'galerija',    component: GalerijaComponent},
  {path: 'kontakt',     component: KontaktComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}