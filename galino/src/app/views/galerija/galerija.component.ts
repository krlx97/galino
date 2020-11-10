import {Component, OnDestroy, OnInit} from '@angular/core'
import {SocketService} from 'src/app/shared/socket/socket.service'
import {Image} from 'src/app/shared/models/image.model'

@Component({
  selector: 'app-galerija',
  templateUrl: './galerija.component.html',
  styleUrls: ['./galerija.component.css']
})
export class GalerijaComponent implements OnDestroy, OnInit {
  public images:Image[]

  constructor(private readonly _socketService:SocketService) {
    this.images = []
  }

  public ngOnDestroy():void {
    this._socketService.socket.off('getImagesRes')
  }
  public ngOnInit():void {
    this._socketService.socket.on('getImagesRes', (images:Image[]) => {
      this.images = images
    })

    this._socketService.socket.emit('getImages')
  }

  public getImageSrc(image:Image):string {
    return `/assets/gallery/${image.src}`
  }
}