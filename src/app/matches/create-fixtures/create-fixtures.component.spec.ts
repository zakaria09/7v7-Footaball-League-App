import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFixturesComponent } from './create-fixtures.component';

describe('CreateFixturesComponent', () => {
  let component: CreateFixturesComponent;
  let fixture: ComponentFixture<CreateFixturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFixturesComponent ]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(CreateFixturesComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
