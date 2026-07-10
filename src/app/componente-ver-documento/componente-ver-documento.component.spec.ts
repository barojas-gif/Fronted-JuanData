import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteVerDocumentoComponent } from './componente-ver-documento.component';

describe('ComponenteVerDocumentoComponent', () => {
  let component: ComponenteVerDocumentoComponent;
  let fixture: ComponentFixture<ComponenteVerDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteVerDocumentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteVerDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
