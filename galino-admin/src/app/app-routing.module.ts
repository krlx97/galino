import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'

import {GalerijaComponent} from './views/galerija/galerija.component'
import {MeniComponent} from './views/meni/meni.component'

const routes:Routes = [
  {path: '', redirectTo: 'meni', pathMatch: 'full'},
  {path: 'meni',      component: MeniComponent},
  {path: 'galerija',  component: GalerijaComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}