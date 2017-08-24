import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterComponent } from './voter.component';

describe('VoterComponent', () => {
  let component: VoterComponent;
  let fixture: ComponentFixture<VoterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return a sum of myVote and othersVote when click in totalVotes', () => {
    component.othersVote = 2;
    component.myVote = 2;

    expect(component.totalVotes).toBe(4);
  });

  describe('When click upVote', () => {
    it('should do nothing if click in upVote and myVote is 1', () => {
      component.myVote = 1;
      
      component.upVote();
  
      expect(component.myVote).toBe(1);
    });
  
    it('should increment myVote when click in upVote', () => {
      component.upVote();
  
      expect(component.myVote).toBe(1);
    })
  
    it('should raise an event with a spefic object when click in upVote', () => {
      let eventData = null; 
      component.myVoteChanged.subscribe(v => eventData = v);
  
      component.upVote();
  
      expect(eventData).toEqual({myVote: 1});
    })
  
    it('should not raise an event if myVote is 1 when click in upVote', () => {
      component.myVote = 1;
      let eventData = null; 
      component.myVoteChanged.subscribe(v => eventData = v);
  
      component.upVote();
  
      expect(eventData).toBeNull();
    })
  })

  describe('When click downVote', () => {
    it('should do nothing if click in downVote and myVote is -1', () => {
      component.downVote();
  
      expect(component.myVote).toBe(-1);
    });
  
    it('should decrement myVote when click in downVote', () => {
      component.myVote = 1;
  
      component.downVote();
  
      expect(component.myVote).toBe(0);
    })
  
    it('should raise an event with a spefic object when click in downVote', () => {
      let eventData = null; 
      component.myVoteChanged.subscribe(v => eventData = v);
  
      component.downVote();
  
      expect(eventData).toEqual({myVote: -1});
    })
  
    it('should not raise an event if myVote is 1 when click in downVote', () => {
      component.myVote = -1;
      let eventData = null; 
      component.myVoteChanged.subscribe(v => eventData = v);
  
      component.downVote();
  
      expect(eventData).toBeNull();
    })
  })
});
