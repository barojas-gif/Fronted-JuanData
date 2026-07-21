import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivosAceptadosComponent } from './archivos-aceptados.component';

describe('ArchivosAceptadosComponent', () => {
  let component: ArchivosAceptadosComponent;
  let fixture: ComponentFixture<ArchivosAceptadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchivosAceptadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivosAceptadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
