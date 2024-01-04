import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameplayOptionsComponent } from './gameplay-options.component';

describe('GameplayOptionsComponent', () => {
  let component: GameplayOptionsComponent;
  let fixture: ComponentFixture<GameplayOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameplayOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameplayOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
