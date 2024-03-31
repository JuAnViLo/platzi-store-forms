import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss'],
})
export class BasicFormComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.buildFrom();
  }

  private buildFrom() {
    this.form = this.fb.group({
      fullName: this.fb.group({
        name: [
          'Juan',
          [
            Validators.required,
            Validators.maxLength(10),
            Validators.pattern(/^[a-záéíóúàèìòùüñ ]+$/gi),
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.maxLength(10),
            Validators.pattern(/^[a-záéíóúàèìòùüñ ]+$/gi),
          ],
        ],
      }),
      emailField: ['', [Validators.required, Validators.email]],
      phoneField: ['', Validators.required],
      colorField: [''],
      dateField: [''],
      numberField: [
        18,
        [Validators.required, Validators.min(18), Validators.max(100)],
      ],
      categoryField: [''],
      multiCategoryField: [''],
      checkField: ['', Validators.requiredTrue],
      radioField: [''],
    });
  }

  ngOnInit(): void {
    this.nameField.valueChanges.subscribe((field) => {
      console.log(field);
    });
  }

  getNameValue() {
    console.log(this.nameField.value);
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
  }

  get isNameFiledValid() {
    return this.nameField.touched && this.nameField.valid;
  }

  get isNameFiledInvalid() {
    return this.nameField.touched && this.nameField.invalid;
  }

  get nameField() {
    return this.form.get('fullName.name');
  }
  get emailField() {
    return this.form.get('emailField');
  }
  get phoneField() {
    return this.form.get('phoneField');
  }
  get colorField() {
    return this.form.get('colorField');
  }
  get dateField() {
    return this.form.get('dateField');
  }
  get numberField() {
    return this.form.get('numberField');
  }
  get categoryField() {
    return this.form.get('categoryField');
  }
  get multiCategoryField() {
    return this.form.get('multiCategoryField');
  }
  get checkField() {
    return this.form.get('checkField');
  }
  get radioField() {
    return this.form.get('radioField');
  }
}
