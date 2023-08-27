import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoeIndexComponent } from './shoe-index.component';

describe('ShoeIndexComponent', () => {
  let component: ShoeIndexComponent;
  let fixture: ComponentFixture<ShoeIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoeIndexComponent]
    });
    fixture = TestBed.createComponent(ShoeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
