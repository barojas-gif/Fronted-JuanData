import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteArchivosPendientesComponent } from './componente-archivos-pendientes.component';

describe('ComponenteArchivosPendientesComponent', () => {
  let component: ComponenteArchivosPendientesComponent;
  let fixture: ComponentFixture<ComponenteArchivosPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteArchivosPendientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteArchivosPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
