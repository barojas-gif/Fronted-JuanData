import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteMateriaComponent } from './componente-materia.component';

describe('ComponenteMateriaComponent', () => {
  let component: ComponenteMateriaComponent;
  let fixture: ComponentFixture<ComponenteMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteMateriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
