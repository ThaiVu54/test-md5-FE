import { Component, OnInit } from '@angular/core';
import {Book} from "../model/book";
import {BookService} from "../../service/book.service";
import {first} from "rxjs";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.findAll().subscribe(books => {
      console.log(books);
      this.books = books;
    });
  }

  books: Book[]=[];
  findAll(): Book[] {
    return this.books;
  }


  delete(id: any) {
  const book = this.books.find(x => x.id === id);
  // book.isDeleting = true;
    if(confirm('Are you sure you want to delete it?')){
      this.bookService.deleteBook(id)
        .pipe(first())
        .subscribe(()=> this.books = this.books.filter(x => x.id !== id))
    }
    }
}
