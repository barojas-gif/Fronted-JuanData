import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteActualizarContrasenaComponent } from './componente-actualizar-contrasena.component';

describe('ComponenteActualizarContrasenaComponent', () => {
  let component: ComponenteActualizarContrasenaComponent;
  let fixture: ComponentFixture<ComponenteActualizarContrasenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteActualizarContrasenaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteActualizarContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
