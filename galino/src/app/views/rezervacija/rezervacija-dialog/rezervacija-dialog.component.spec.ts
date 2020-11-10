import {ComponentFixture, TestBed} from '@angular/core/testing'
import {RezervacijaDialogComponent} from './rezervacija-dialog.component'

describe('RezervacijaDialogComponent', () => {
  let component:RezervacijaDialogComponent
  let fixture:ComponentFixture<RezervacijaDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RezervacijaDialogComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RezervacijaDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})