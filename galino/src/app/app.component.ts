import {Component, ElementRef, ViewChild} from '@angular/core'
import {Data, RouterOutlet} from '@angular/router'
import {routeAnimations, expandHeader} from './app.animations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routeAnimations, expandHeader]
})
export class AppComponent {
  @ViewChild('hamburger')
  private readonly _$hamburger:ElementRef<HTMLDivElement>

  public isHeaderOpen:boolean

  constructor() {
    this.isHeaderOpen = false
  }

  public prepareRoute(outlet:RouterOutlet):Data {
    return outlet.activatedRouteData
  }

  public toggleNav():void {
    this._$hamburger.nativeElement.classList.toggle('change')
    this.isHeaderOpen = !this.isHeaderOpen
  }
}