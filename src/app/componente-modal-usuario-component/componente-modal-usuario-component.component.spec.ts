import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteModalUsuarioComponentComponent } from './componente-modal-usuario-component.component';

describe('ComponenteModalUsuarioComponentComponent', () => {
  let component: ComponenteModalUsuarioComponentComponent;
  let fixture: ComponentFixture<ComponenteModalUsuarioComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteModalUsuarioComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteModalUsuarioComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
