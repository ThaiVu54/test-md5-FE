import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";
import {Book} from "../app/model/book";

  const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Book[]>{
    return this.http.get<Book[]>(`${API_URL}/books`);
  }

  findById(id: number): Observable<Book>{
    return this.http.get<Book>(`${API_URL}/books/${id}`);
  }

  editBook(id: number, book: Book):Observable<Book>{
    return this.http.put<Book>(`${API_URL}/books/${id}`,book);
  }

  deleteBook(id: number):Observable<Book>{
    return this.http.delete<Book>(`${API_URL}/books/${id}`)
  }

  saveBook(book: Book): Observable<Book> {
    return this.http.post<Book>(API_URL + '/books', book);
  }
}
