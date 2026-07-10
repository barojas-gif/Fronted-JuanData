import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteMasVistosComponent } from './componente-mas-vistos.component';

describe('ComponenteMasVistosComponent', () => {
  let component: ComponenteMasVistosComponent;
  let fixture: ComponentFixture<ComponenteMasVistosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteMasVistosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteMasVistosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
