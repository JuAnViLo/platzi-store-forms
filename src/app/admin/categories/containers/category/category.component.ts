import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CategoriesService } from './../../../../core/services/categories.service';
import { Category } from '../../../../core/models/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  category: Category;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.getCategory(params.id);
      }
    });
  }

  public createCategory(data: Category) {
    this.categoriesService.createCategory(data).subscribe((rta) => {
      this.router.navigate(['./admin/categories']);
    });
  }

  public updateCategory(data: Partial<Category>) {
    this.categoriesService
      .updateCategory(this.category.id, data)
      .subscribe((rta) => {
        this.router.navigate(['./admin/categories']);
      });
  }

  private getCategory(id: string) {
    this.categoriesService.getCategory(id).subscribe((data) => {
      this.category = data;
    });
  }
}
