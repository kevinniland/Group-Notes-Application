import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGroupPage } from './view-group.page';

describe('ViewGroupPage', () => {
  let component: ViewGroupPage;
  let fixture: ComponentFixture<ViewGroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGroupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
