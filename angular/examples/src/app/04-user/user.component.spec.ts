import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

import { UserComponent } from './user.component';
import { UserService } from './user.service';

describe('UserComponent', () => {
  let component: UserComponent;
  let service: UserService;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [ UserComponent ],
      providers: [UserService]
    })
    .compileComponents();

    service = TestBed.get(UserService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set users property with user list from the service', () => {
    let users = [1, 2, 3];
    spyOn(service, 'getUsers').and.returnValue(Observable.from([ users ]))

    component.ngOnInit();

    expect(component.users).toBe(users);
  })

  describe('when deleting object', () => {
    let user = {};

    beforeEach(() => {
      component.users = [
        {id: 1, name: 'test 1'},
        {id: 2, name: 'test 2'},
        {id: 3, name: 'test 3'}
      ];
      user = component.users[1];
    });

    it('should delete the user from the list if confirm is true', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      spyOn(service, 'deleteUser').and.returnValue(Observable.empty());
      
      component.deleteUser(user);

      expect(component.users.indexOf(user)).toBe(-1);
    })

    it('should NOT delete the user from the list if confirm is false', () => {
      spyOn(window, 'confirm').and.returnValue(false);

      component.deleteUser(user);

      expect(component.users.indexOf(user)).toBeGreaterThan(-1);
    })

    it('should call service to delete user when confirmation is true', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      let spyDeleteUser = spyOn(service, 'deleteUser').and.returnValue(Observable.empty());

      component.deleteUser(user);

      expect(spyDeleteUser).toHaveBeenCalled();
    })

    it('should NOT call service to delete user when confirmation is false', () => {
      spyOn(window, 'confirm').and.returnValue(false);
      let spyDeleteUser = spyOn(service, 'deleteUser').and.returnValue(Observable.empty());

      component.deleteUser(user);

      expect(spyDeleteUser).not.toHaveBeenCalled();
    })

    it('should undo deletion if calling service to fail', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      spyOn(window, 'alert').and.callFake(() => {});
      spyOn(service, 'deleteUser').and.returnValue(Observable.throw('error'));

      component.deleteUser(user);

      expect(component.users.indexOf(user)).toBeGreaterThan(-1);
    })

    it('should show error message in alert box if service to fail', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      let spyAlert = spyOn(window, 'alert').and.callFake(() => {});
      spyOn(service, 'deleteUser').and.returnValue(Observable.throw('error'));

      component.deleteUser(user);

      expect(spyAlert).toHaveBeenCalled();
    })
  })

});
