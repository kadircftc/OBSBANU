import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OgrenciNotBilgisiComponent } from './ogrenci-not-bilgisi.component';

describe('OgrenciNotBilgisiComponent', () => {
  let component: OgrenciNotBilgisiComponent;
  let fixture: ComponentFixture<OgrenciNotBilgisiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OgrenciNotBilgisiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OgrenciNotBilgisiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
