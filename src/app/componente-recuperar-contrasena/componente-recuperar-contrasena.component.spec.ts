import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteRecuperarContrasenaComponent } from './componente-recuperar-contrasena.component';

describe('ComponenteRecuperarContrasenaComponent', () => {
  let component: ComponenteRecuperarContrasenaComponent;
  let fixture: ComponentFixture<ComponenteRecuperarContrasenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteRecuperarContrasenaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteRecuperarContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
