import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinGame } from './spin-game';

describe('SpinGame', () => {
  let component: SpinGame;
  let fixture: ComponentFixture<SpinGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinGame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinGame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
