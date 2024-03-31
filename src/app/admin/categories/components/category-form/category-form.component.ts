import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { MyValidators } from '../../../../utils/validators';
import { CategoriesService } from './../../../../core/services/categories.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router,
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

    this.createCategory();
  }

  private createCategory() {
    const data = this.form.value;

    this.categoriesService.createCategory(data).subscribe((rta) => {
      this.router.navigate(['./admin/categories']);
    });
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
