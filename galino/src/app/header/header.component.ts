import {Component, EventEmitter, Output} from '@angular/core'
import {DeviceService} from '../shared/device/device.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() public readonly closeHeaderEvt:EventEmitter<null>

  constructor(private readonly _deviceService:DeviceService) {
    this.closeHeaderEvt = new EventEmitter()
  }

  public hideHeader():void {
    if (this._deviceService.isMobile) {
      this.closeHeaderEvt.emit()
    }
  }
}