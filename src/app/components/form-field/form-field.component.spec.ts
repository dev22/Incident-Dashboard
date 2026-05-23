import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';

import { FormFieldComponent } from './form-field.component';

describe('FormFieldComponent', () => {
  let component: FormFieldComponent;
  let fixture: ComponentFixture<FormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormFieldComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('config', {
      controlName: 'search',
      label: 'Search',
      type: 'text',
    });
    fixture.componentRef.setInput('form', new FormGroup({
      search: new FormControl(''),
    }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
