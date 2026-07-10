import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteSubirDocumentoComponent } from './componente-subir-documento.component';

describe('ComponenteSubirDocumentoComponent', () => {
  let component: ComponenteSubirDocumentoComponent;
  let fixture: ComponentFixture<ComponenteSubirDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteSubirDocumentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteSubirDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
