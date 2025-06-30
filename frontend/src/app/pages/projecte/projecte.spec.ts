import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Projecte } from './projecte';

describe('Projecte', () => {
  let component: Projecte;
  let fixture: ComponentFixture<Projecte>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projecte]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Projecte);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
