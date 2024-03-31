import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { MyValidators } from '../../../../utils/validators';
import { CategoriesService } from './../../../../core/services/categories.service';
import { Category } from '../../../../core/models/category.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  @Input() set category(data: Category) {
    if (data) {
      this.isNew = false;
      this.form.patchValue(data);
    }
  }

  @Output() create = new EventEmitter();
  @Output() update = new EventEmitter();

  form: FormGroup;
  isNew: boolean = true;

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private storage: AngularFireStorage
  ) {
    this.buildFrom();
  }

  ngOnInit(): void {}

  private buildFrom() {
    this.form = this.fb.group({
      name: [
        '',
        Validators.required,
        MyValidators.validateCategory(this.categoriesService),
      ],
      image: ['', Validators.required],
    });
  }

  public save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.value;

    if (this.isNew) {
      this.create.emit(data);
    } else {
      this.update.emit(data);
    }
  }

  get nameField(): AbstractControl {
    return this.form.get('name');
  }
  get imageField(): AbstractControl {
    return this.form.get('image');
  }

  uploadFile(event) {
    const img = event.target.files[0];
    const imgName = Date();
    const ref = this.storage.ref(imgName);
    const task = this.storage.upload(imgName, img);

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          const urlImg$ = ref.getDownloadURL();
          urlImg$.subscribe((url) => {
            this.imageField.setValue(url);
          });
        })
      )
      .subscribe();
  }
}
