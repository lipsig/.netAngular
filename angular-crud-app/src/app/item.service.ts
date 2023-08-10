import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:5256/api/items'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get<any[]>(this.apiUrl);
  }

  createItem(item: any) {
    return this.http.post<any>(this.apiUrl, item);
  }

  updateItem(id: number, item: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, item);
  }

  deleteItem(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}