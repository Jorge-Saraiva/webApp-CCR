import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeCreateEditComponent } from './qrcode-create-edit.component';

describe('QrcodeCreateEditComponent', () => {
  let component: QrcodeCreateEditComponent;
  let fixture: ComponentFixture<QrcodeCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrcodeCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrcodeCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
