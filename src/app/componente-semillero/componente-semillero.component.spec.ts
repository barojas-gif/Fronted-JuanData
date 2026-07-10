import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteSemilleroComponent } from './componente-semillero.component';

describe('ComponenteSemilleroComponent', () => {
  let component: ComponenteSemilleroComponent;
  let fixture: ComponentFixture<ComponenteSemilleroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteSemilleroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteSemilleroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
