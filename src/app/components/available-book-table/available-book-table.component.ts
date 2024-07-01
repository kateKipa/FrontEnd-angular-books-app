import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book, BookForSaleReadOnlyDTO, acceptableBooks } from 'src/app/shared/interfaces/book';
import { sortBy } from 'lodash';
import { UserService } from 'src/app/services/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-available-book-table',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './available-book-table.component.html',
  styleUrl: './available-book-table.component.css'
})
export class AvailableBookTableComponent {
  @Input() books: BookForSaleReadOnlyDTO[]
  @Output() bookClicked = new EventEmitter<BookForSaleReadOnlyDTO>()
  
  constructor(private userService: UserService, private router: Router) {}

  sortOrder = {
  title: 'null',
  author: 'null',
  bookCategory : 'null',
  typeOfTransaction: 'null',
  price: 'null',
  seller: 'null',
  }

  sortData(sortKey: string) {
    if (this.sortOrder[sortKey] === 'asc') {
      this.sortOrder[sortKey] = 'desc'
      this.books = sortBy(this.books, sortKey).reverse()
    } else {
      this.sortOrder[sortKey] = 'asc'
      this.books = sortBy(this.books, sortKey)
    }

    for (let key in this.sortOrder) {
      if (key !== sortKey) {
        this.sortOrder[key] = 'none'
      }
    }
  }

  sortSign(sortKey: string) {
    if (this.sortOrder[sortKey] === 'asc') {
      return '↑';
    } else if (this.sortOrder[sortKey] === 'desc') {
      return '↓';
    } else {
      return '';
    }
  }

  youChooseABook(book: BookForSaleReadOnlyDTO) : void {
    if (this.userService.user()) {
      this.router.navigate(['/book-details', book.id])
    } else {
      this.router.navigate(['/login-signup'])
    }
  }

  onBookClicked(book: BookForSaleReadOnlyDTO) {
    this.bookClicked.emit(book)
  }
}
