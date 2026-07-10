import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteSemestreComponent } from './componente-semestre.component';

describe('ComponenteSemestreComponent', () => {
  let component: ComponenteSemestreComponent;
  let fixture: ComponentFixture<ComponenteSemestreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteSemestreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteSemestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
