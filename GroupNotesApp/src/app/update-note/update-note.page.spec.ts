import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNotePage } from './update-note.page';

describe('UpdateNotePage', () => {
  let component: UpdateNotePage;
  let fixture: ComponentFixture<UpdateNotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateNotePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateNotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
