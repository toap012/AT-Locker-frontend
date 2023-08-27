import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoePreviewComponent } from './shoe-preview.component';

describe('ShoePreviewComponent', () => {
  let component: ShoePreviewComponent;
  let fixture: ComponentFixture<ShoePreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoePreviewComponent]
    });
    fixture = TestBed.createComponent(ShoePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
