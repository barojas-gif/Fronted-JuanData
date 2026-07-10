import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteArchivosAceptadosComponent } from './componente-archivos-aceptados.component';

describe('ComponenteArchivosAceptadosComponent', () => {
  let component: ComponenteArchivosAceptadosComponent;
  let fixture: ComponentFixture<ComponenteArchivosAceptadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteArchivosAceptadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteArchivosAceptadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
