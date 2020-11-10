import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core'
import {SocketService} from 'src/app/shared/socket/socket.service'
import {Image} from 'src/app/shared/models/image.model'

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements AfterViewInit, OnDestroy {
  @ViewChild('flipElem') private readonly _$flipElem:ElementRef
  @ViewChild('imgFront') private readonly _$imgFront:ElementRef
  @ViewChild('imgBack') private readonly _$imgBack:ElementRef

  public images:Image[]
  private _interval:any
  private _flipCount:number
  private _currentImg:number

  constructor(private readonly _socketService:SocketService) {
    this.images = []
    this._flipCount = 0
    this._currentImg = 0
  }

  public ngAfterViewInit():void {
    this._socketService.socket.on('getImagesRes', (images:Image[]) => {
      this.images = images

      this._$imgFront.nativeElement.src = `/assets/gallery/${this.images[0].src}`
      this._$imgBack.nativeElement.src = `/assets/gallery/${this.images[1].src}`

      this._interval = setInterval(() => {
        this._$flipElem.nativeElement.style.transform = `rotateY(${180 * this._flipCount}deg)`

        if (this._flipCount % 2) {
          this._$imgBack.nativeElement.src = `/assets/gallery/${this.images[this._currentImg].src}`
        } else {
          this._$imgFront.nativeElement.src = `/assets/gallery/${this.images[this._currentImg].src}`
        }

        this._flipCount += 1
        this._currentImg += 1

        if (this._currentImg > this.images.length - 1) {
          this._currentImg = 0
        }
      }, 4000)
    })

    this._socketService.socket.emit('getImages')
  }
  public ngOnDestroy():void {
    clearInterval(this._interval)
    this._socketService.socket.off('getImagesRes')
  }
}
