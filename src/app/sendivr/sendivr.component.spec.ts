import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendivrComponent } from './sendivr.component';

describe('SendivrComponent', () => {
  let component: SendivrComponent;
  let fixture: ComponentFixture<SendivrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendivrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendivrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
