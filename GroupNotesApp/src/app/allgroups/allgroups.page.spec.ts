import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllgroupsPage } from './allgroups.page';

describe('AllgroupsPage', () => {
  let component: AllgroupsPage;
  let fixture: ComponentFixture<AllgroupsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllgroupsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllgroupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
