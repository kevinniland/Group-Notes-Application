import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePopoverComponent } from './image-popover.component';

describe('ImagePopoverComponent', () => {
  let component: ImagePopoverComponent;
  let fixture: ComponentFixture<ImagePopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagePopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagePopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
