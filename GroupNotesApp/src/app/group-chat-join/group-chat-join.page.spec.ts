import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupChatPage } from './group-chat.page';

describe('GroupChatPage', () => {
  let component: GroupChatPage;
  let fixture: ComponentFixture<GroupChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupChatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
