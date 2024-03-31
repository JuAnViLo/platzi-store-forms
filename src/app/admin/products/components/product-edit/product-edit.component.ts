import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { MyValidators } from './../../../../utils/validators';
import { ProductsService } from './../../../../core/services/products/products.service';
import { Category } from '../../../../core/models/category.model';
import { CategoriesService } from '../../../../core/services/categories.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  form: FormGroup;
  id: string;
  categories: Category[] = [];
  states = [
    { name: 'Arizona', abbrev: 'AZ' },
    { name: 'California', abbrev: 'CA' },
    { name: 'Colorado', abbrev: 'CO' },
    { name: 'New York', abbrev: 'NY' },
    { name: 'Pennsylvania', abbrev: 'PA' },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.getCategories();

    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.productsService.getProduct(this.id).subscribe((product) => {
        console.log(
          '🚀 ~ ProductEditComponent ~ this.productsService.getProduct ~ product:',
          product
        );
        this.form.patchValue({ ...product, state: this.states[3] });
      });
    });
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      console.log(
        '🚀 ~ ProductEditComponent ~ saveProduct ~ product:',
        product
      );
      // this.productsService
      //   .updateProduct(this.id, product)
      //   .subscribe((newProduct) => {
      //     console.log(newProduct);
      //     this.router.navigate(['./admin/products']);
      //   });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      images: [''],
      categoryId: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(4)]],
      state: [''],
    });
  }

  get priceField() {
    return this.form.get('price');
  }

  private getCategories() {
    this.categoriesService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
}
