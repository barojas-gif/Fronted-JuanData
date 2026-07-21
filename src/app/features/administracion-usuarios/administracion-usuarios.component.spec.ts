import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministracionUsuariosComponent } from './administracion-usuarios.component';
import { jwtDecode } from 'jwt-decode';

describe('AdministracionUsuariosComponent', () => {
  let component: AdministracionUsuariosComponent;
  let fixture: ComponentFixture<AdministracionUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministracionUsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministracionUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
