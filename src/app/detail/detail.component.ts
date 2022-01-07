import { Component, OnInit } from '@angular/core';
import {Book} from "../model/book";
import {FormControl, FormGroup} from "@angular/forms";
import {BookService} from "../../service/book.service";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  book: Book = {};
  id:any;
  bookForm: FormGroup = new FormGroup({
    id: new FormControl(),
    title: new FormControl(),
    author: new FormControl(),
    description: new FormControl()
  })

  constructor(private bookService: BookService,
              private activateRoute: ActivatedRoute) {
    this.activateRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      this.getDetail(this.id);
    });
  }

  ngOnInit(): void {
  }

  private getDetail(id: number) {
    return this.bookService.findById(id).subscribe(booK => {
      this.book = booK;
      this.bookForm = new FormGroup({
        id: new FormControl(booK.id),
        title: new FormControl(booK.title),
        author: new FormControl(booK.author),
        description: new FormControl(booK.description),
      });
    });
  }
}
