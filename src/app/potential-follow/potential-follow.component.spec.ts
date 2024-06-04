import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialFollowComponent } from './potential-follow.component';

describe('PotentialFollowComponent', () => {
  let component: PotentialFollowComponent;
  let fixture: ComponentFixture<PotentialFollowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PotentialFollowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PotentialFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
