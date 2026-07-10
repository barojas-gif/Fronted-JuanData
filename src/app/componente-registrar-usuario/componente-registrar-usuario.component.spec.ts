import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteRegistrarUsuarioComponent } from './componente-registrar-usuario.component';

describe('ComponenteRegistrarUsuarioComponent', () => {
  let component: ComponenteRegistrarUsuarioComponent;
  let fixture: ComponentFixture<ComponenteRegistrarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteRegistrarUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteRegistrarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
