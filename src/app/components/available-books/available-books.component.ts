import { Component, Inject, OnInit, inject} from '@angular/core';
import {BookForSaleReadOnlyDTO} from 'src/app/shared/interfaces/book';
import { AvailableBookTableComponent } from "../available-book-table/available-book-table.component";
import { BookService } from 'src/app/services/book.service';
import {
  Dialog,
  DialogRef,
  DIALOG_DATA,
  DialogModule,
} from '@angular/cdk/dialog';
import { BookTableDialogComponent } from '../book-table-dialog/book-table-dialog.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-available-books',
    standalone: true,
    templateUrl: './available-books.component.html',
    styleUrl: './available-books.component.css',
    imports: [AvailableBookTableComponent, DialogModule, RouterLink]
})
export class AvailableBooksComponent implements OnInit {
  router = inject(Router) 

  availableBooks: BookForSaleReadOnlyDTO[] = [];
  filteredBooks: BookForSaleReadOnlyDTO[] = [];

  constructor(private bookService: BookService, public dialog: Dialog) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((response: BookForSaleReadOnlyDTO[]) => {
      this.availableBooks = response;
      this.filteredBooks = response; // Initialize filteredBooks with all books
    });
  }

  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredBooks = this.availableBooks.filter(book =>
      book.title.toLowerCase().includes(searchTerm)
    );
  }

  onBookClicked(book:BookForSaleReadOnlyDTO) {
    console.log(book)
    this.dialog.open(BookDialogComponent, { data: book})
  }
}

@Component({
  imports:[BookTableDialogComponent],
  standalone: true,
  template: `
    <app-book-table-dialog [book]="book"></app-book-table-dialog>
    <button class="btn my-btn" (click)="dialogRef.close()">
      Close
    </button>`
,
styles: [
  `
    :host {
      display: block;
      background: #fff;
      border-radius: 8px;
      padding: 16px;
      max-width: 500px;
    }
    .my-btn {
        background-color: rgb(200, 160, 130, 08);
        font-family: "Caveat", cursive;
        color: #fff
      }
  `,
],
})
class BookDialogComponent {
  constructor(
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public book: BookForSaleReadOnlyDTO,
  ) {}
}
