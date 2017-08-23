import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeComponent } from './like.component';

describe('LikeComponent', () => {
  let component: LikeComponent;
  let fixture: ComponentFixture<LikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be 0 by default the value of totalLikes', () => {
    expect(component.totalLikes).toBe(0);
  })
  
  it('should be false by default the value of iLike', () => {
    expect(component.iLike).toBeFalsy();
  })

  it('should toggle iLike when click it', () => {
    let iLike = component.iLike;
    component.click();

    expect(component.iLike).toEqual(!iLike);
  })

  it('should decrement totalLikes if iLike is true when click it', () => {
    component.click();
    component.iLike = true;

    expect(component.totalLikes).toBe(1);
  })

  it('should increment totalLikes if iLike is falsy when click it', () => {
    component.totalLikes = 1;
    component.iLike = true;
    component.click();

    expect(component.totalLikes).toBe(0);
  })
});
