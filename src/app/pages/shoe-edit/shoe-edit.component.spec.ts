import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoeEditComponent } from './shoe-edit.component';

describe('ShoeEditComponent', () => {
  let component: ShoeEditComponent;
  let fixture: ComponentFixture<ShoeEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoeEditComponent]
    });
    fixture = TestBed.createComponent(ShoeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
