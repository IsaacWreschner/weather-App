import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchesHistoryComponent } from './searches-history.component';

describe('SearchesHistoryComponent', () => {
  let component: SearchesHistoryComponent;
  let fixture: ComponentFixture<SearchesHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchesHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
