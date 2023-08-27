import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoeListComponent } from './shoe-list.component';

describe('ShoeListComponent', () => {
  let component: ShoeListComponent;
  let fixture: ComponentFixture<ShoeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoeListComponent]
    });
    fixture = TestBed.createComponent(ShoeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
