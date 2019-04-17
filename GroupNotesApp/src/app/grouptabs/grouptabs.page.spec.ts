import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrouptabsPage } from './grouptabs.page';

describe('GrouptabsPage', () => {
  let component: GrouptabsPage;
  let fixture: ComponentFixture<GrouptabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrouptabsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrouptabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
