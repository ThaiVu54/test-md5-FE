import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {BookService} from "../../service/book.service";
import {Book} from "../model/book";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: any;
  bookForm: FormGroup = new FormGroup({
    title: new FormControl(),
    author: new FormControl(),
    description: new FormControl()
  });
  private book: Book = {};

  constructor(private activateRoute: ActivatedRoute,
              private bookService: BookService,
              private router: Router) {
    this.activateRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      this.getDetail(this.id);
    })
  }

  ngOnInit(): void {
  }

  edit() {
    const book = this.bookForm.value;
    this.bookService.editBook(this.id, book).subscribe(() => {
      this.bookForm.reset();
      alert('Successful!');
      this.router.navigate(['/']);
    }, error => {
      alert('Error!');
    });
  }

  private getDetail(id: number) {
    return this.bookService.findById(id).subscribe(book => {
      this.book = book;
      this.bookForm = new FormGroup({
        id: new FormControl(book.id),
        title: new FormControl(book.title),
        author: new FormControl(book.author),
        description: new FormControl(book.description)
      });
    });
  }
}
