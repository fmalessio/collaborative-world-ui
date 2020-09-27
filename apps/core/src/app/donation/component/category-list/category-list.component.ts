import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  // Navigation
  currents: Category[] = [];
  parentId: number;

  @Output() change: EventEmitter<number> = new EventEmitter<number>();

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(
      (data: Category[]) => {
        this.allCategories = data;
        this.refreshItems(data);
      }
    );
  }

  nextItems(item: Category): void {
    if (item.children && item.children.length > 0) {
      this.parentId = item.id;
      this.refreshItems(item.children);
    } else {
      this.change.emit(item.id);
    }
  }

  prevItems(): void {
    if (!this.parentId) {
      this.refreshItems(this.allCategories);
      return;
    }
    this.findLevel(this.parentId, this.allCategories).then((categories: Category[]) => {
      this.parentId = categories[0].parentId;
      this.refreshItems(categories);
    });
  }

  private refreshItems(items: Category[]) {
    this.currents = items;
    this.currents.sort((a, b) => COMPARE_STRING(a.name, b.name));
  }

  private findLevel(id: number, categories: Category[]): Promise<Category[]> {
    return new Promise<Category[]>((resolve, reject) => {
      if (!categories || categories.length < 1) {
        reject();
      }
      if (categories.find(c => c.id === id)) {
        resolve(categories);
      } else {
        categories.forEach(element => {
          this.findLevel(id, element.children);
        });
      }
    });
  }

}
