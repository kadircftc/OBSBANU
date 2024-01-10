import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OgrenciDersAlmaComponent } from './ogrenci-ders-alma.component';

describe('OgrenciDersAlmaComponent', () => {
  let component: OgrenciDersAlmaComponent;
  let fixture: ComponentFixture<OgrenciDersAlmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OgrenciDersAlmaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OgrenciDersAlmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
