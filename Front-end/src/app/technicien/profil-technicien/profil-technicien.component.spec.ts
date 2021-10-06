import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilTechnicienComponent } from './profil-technicien.component';

describe('ProfilTechnicienComponent', () => {
  let component: ProfilTechnicienComponent;
  let fixture: ComponentFixture<ProfilTechnicienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilTechnicienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilTechnicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
