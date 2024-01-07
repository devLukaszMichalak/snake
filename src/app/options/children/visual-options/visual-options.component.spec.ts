import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualOptionsComponent } from './visual-options.component';

describe('VisualOptionsComponent', () => {
  let component: VisualOptionsComponent;
  let fixture: ComponentFixture<VisualOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
