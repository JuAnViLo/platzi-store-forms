import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Category } from '../models/category.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http.get<Category[]>(`${environment.url_api}/categories/`);
  }

  createCategory(data: Partial<Category>) {
    return this.http.post<Category[]>(
      `${environment.url_api}/categories/`,
      data
    );
  }

  updateCategory(id: string, data: Partial<Category>) {
    return this.http.put<Category[]>(
      `${environment.url_api}/categories/${id}`,
      data
    );
  }
  // WITH API
  // checkCategory(name: string) {
  //   return this.http.post<Category[]>(
  //     `${environment.url_api}/categories/availability`,
  //     name
  //   );
  // }

  // WITHOUT API
  checkCategory(name: string) {
    return this.getAllCategories().pipe(
      map((categories) => {
        console.log("🚀 ~ CategoriesService ~ map ~ categories:", categories)
        const isAvailable = !categories.some(
          (category) => category.name === name
        );
        console.log("🚀 ~ CategoriesService ~ map ~ isAvailable:", isAvailable)
        return isAvailable;
      })
    );
  }
}
