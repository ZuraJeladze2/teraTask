import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailedComponentComponent } from './user-detailed.component';

describe('UserDetailedComponentComponent', () => {
  let component: UserDetailedComponentComponent;
  let fixture: ComponentFixture<UserDetailedComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailedComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDetailedComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
