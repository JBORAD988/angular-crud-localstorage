import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private key = 'items';

  constructor() { }

  saveItem(item: any): void {
    let items = this.getItems();
    if (!items) {
      items = [];
    }
    const existingItemIndex = items.findIndex((i: any) => i.id === item.id);
    if (existingItemIndex !== -1) {
      items[existingItemIndex] = item;
    } else {
      item.id = new Date().getTime();
      items.push(item);
    }

    localStorage.setItem(this.key, JSON.stringify(items));
  }

  getItems(): any[] {
    const items = localStorage.getItem(this.key);
    return items ? JSON.parse(items) : [];
  }

  deleteItem(id: number): void {
    let items = this.getItems();
    items = items.filter((item: any) => item.id !== id);
    localStorage.setItem(this.key, JSON.stringify(items));
  }

  getItemById(id: number): any {
    const items = this.getItems();
    return items.find((item: any) => item.id === id);
  }
}
