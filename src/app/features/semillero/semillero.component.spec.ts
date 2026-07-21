import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemilleroComponent } from './semillero.component';

describe('SemilleroComponent', () => {
  let component: SemilleroComponent;
  let fixture: ComponentFixture<SemilleroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SemilleroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemilleroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
