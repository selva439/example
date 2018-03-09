import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollingStationComponent } from './polling-station.component';

describe('PollingStationComponent', () => {
  let component: PollingStationComponent;
  let fixture: ComponentFixture<PollingStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollingStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollingStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
