import {AfterViewInit, Component, OnDestroy} from '@angular/core'
import {FormBuilder, FormGroup} from '@angular/forms'
import {MatSnackBar} from '@angular/material/snack-bar'
import {SocketService} from 'src/app/shared/socket/socket.service'
import {Image} from 'src/app/shared/models/image.model'

@Component({
  selector: 'app-galerija',
  templateUrl: './galerija.component.html',
  styleUrls: ['./galerija.component.css']
})
export class GalerijaComponent implements AfterViewInit, OnDestroy {
  public readonly imageForm:FormGroup
  public progress:number
  public images:Image[]

  constructor(
    private readonly _formBuilder:FormBuilder,
    private readonly _matSnackBar:MatSnackBar,
    private readonly _socketService:SocketService
  ) {
    this.imageForm = this._buildImageForm()
    this.progress = 0
  }

  private _buildImageForm():FormGroup {
    return this._formBuilder.group({image: ''})
  }

  public ngAfterViewInit():void {
    const $image = document.getElementById('image')
    this._socketService.uploader.listenOnInput($image)

    this._socketService.uploader.addEventListener('progress', (evt:any) => {
      this.progress = (evt.bytesLoaded / evt.file.size) * 100
    })

    this._socketService.uploader.addEventListener('complete', () => {
      this._matSnackBar.open('Uspesno ste ubacili sliku u galeriju', '', {duration: 7000})
      this.progress = 0
    })

    this._socketService.socket.on('getImagesRes', (images:Image[]) => {
      this.images = images
    })

    this._socketService.socket.on('rmImageRes', (image:Image) => {
      let i:number
      this.images.forEach((img, index) => {
        if (img.src === image.src) {
          i = index
        }
      })

      console.log(i)
      this.images.splice(i, 1)
    })
    this._socketService.socket.on('saveImageRes', (image:Image) => {
      this.images.push(image)
    })

    this._socketService.socket.emit('getImages')
  }
  public ngOnDestroy():void {
    this._socketService.uploader.dispatchEvent('progress')
    this._socketService.uploader.dispatchEvent('complete')
    this._socketService.socket.off('getImagesRes')
    this._socketService.socket.off('rmImagesRes')
    this._socketService.socket.off('saveImagesRes')
  }

  public getImageSrc(image:Image):string {
    return `/assets/gallery/${image.src}`
  }

  public onRmImage(image:Image):void {
    this._socketService.socket.emit('rmImage', {image})
  }
}