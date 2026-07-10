import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteInicioEstudiantesComponent } from './componente-inicio-estudiantes.component';

describe('ComponenteInicioEstudiantesComponent', () => {
  let component: ComponenteInicioEstudiantesComponent;
  let fixture: ComponentFixture<ComponenteInicioEstudiantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteInicioEstudiantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteInicioEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
