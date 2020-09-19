import { Component, OnInit } from '@angular/core';
import { COMPARE_STRING } from 'src/app/shared/constant/utils';
import { Category } from '../../model/category';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {

  private allCategories: Category[] = [];
  items: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(
      (data: Category[]) => {
        this.allCategories = data;
        this.refreshItems(data);
      }
    );
  }

  goItem(item: Category): void {
    item.children && item.children.length > 0 ? 
      this.refreshItems(item.children) : 
      console.log(item);
  }

  private refreshItems(items: Category[]) {
    this.items = items;
    this.items.sort((a, b) => COMPARE_STRING(a.name, b.name));
  }

}
