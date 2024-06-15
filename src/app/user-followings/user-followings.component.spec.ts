import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFollowingsComponent } from './user-followings.component';

describe('UserFollowingsComponent', () => {
  let component: UserFollowingsComponent;
  let fixture: ComponentFixture<UserFollowingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFollowingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserFollowingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
