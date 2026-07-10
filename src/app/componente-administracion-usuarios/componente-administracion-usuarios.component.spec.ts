import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponenteAdministracionUsuariosComponent } from './componente-administracion-usuarios.component';
import { jwtDecode } from 'jwt-decode';

describe('ComponenteAdministracionUsuariosComponent', () => {
  let component: ComponenteAdministracionUsuariosComponent;
  let fixture: ComponentFixture<ComponenteAdministracionUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteAdministracionUsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteAdministracionUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
