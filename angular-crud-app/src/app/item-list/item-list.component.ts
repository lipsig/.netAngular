import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: any[] = [];
  newItem: any = {};
  selectedItem: any = {};

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
    });
  }

  createItem() {
    this.itemService.createItem(this.newItem).subscribe(item => {
      this.items.push(item);
      this.newItem = {};
    });
  }

  editItem(item: any) {
    this.selectedItem = { ...item };
  }

  updateItem() {
    this.itemService.updateItem(this.selectedItem.id, this.selectedItem).subscribe(() => {
      const index = this.items.findIndex(item => item.id === this.selectedItem.id);
      this.items[index] = this.selectedItem;
      this.selectedItem = {};
    });
  }

  deleteItem(id: number) {
    this.itemService.deleteItem(id).subscribe(() => {
      this.items = this.items.filter(item => item.id !== id);
    });
  }
}