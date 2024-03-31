import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../../../core/models/category.model';
import { CategoriesService } from '../../../../core/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  displayedColumns: string[] = ['id', 'name', 'image', 'actions'];

  constructor(
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories() {
    this.categoriesService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  public deleteCategory(id: string) {
    this.categoriesService.deleteCategory(id).subscribe((rta) => {
      this.router.navigate(['./admin/categories']);
      this.getCategories();
    });
  }
}
