import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivosPendientesComponent } from './archivos-pendientes.component';

describe('ArchivosPendientesComponent', () => {
  let component: ArchivosPendientesComponent;
  let fixture: ComponentFixture<ArchivosPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchivosPendientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivosPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
