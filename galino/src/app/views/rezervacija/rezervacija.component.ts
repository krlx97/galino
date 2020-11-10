import {Component} from '@angular/core'
import {MatDialog} from '@angular/material/dialog'
import {RezervacijaDialogComponent} from './rezervacija-dialog/rezervacija-dialog.component'

@Component({
  selector: 'app-rezervacija',
  templateUrl: './rezervacija.component.html',
  styleUrls: ['./rezervacija.component.css']
})
export class RezervacijaComponent {
  constructor(private readonly _matDialog:MatDialog) {}

  public onReserve():void {
    this._matDialog.open(RezervacijaDialogComponent, {width: '320px'})
  }
}