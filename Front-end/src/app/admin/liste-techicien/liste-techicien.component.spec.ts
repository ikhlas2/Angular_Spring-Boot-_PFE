import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTechicienComponent } from './liste-techicien.component';

describe('ListeTechicienComponent', () => {
  let component: ListeTechicienComponent;
  let fixture: ComponentFixture<ListeTechicienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeTechicienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeTechicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
