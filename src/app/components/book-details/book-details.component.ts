import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApprovalSaleService } from 'src/app/services/approvalSale.service';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';
import { BookForSaleReadOnlyDTO } from 'src/app/shared/interfaces/book';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit {
  router = inject(Router)
  userService = inject(UserService)

  
  book: BookForSaleReadOnlyDTO | null = null;
  

  constructor(private route: ActivatedRoute, private approvalSaleService: ApprovalSaleService, private bookService: BookService) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id')     //paramMap.get('id') returns a string.
    if (bookId) {
      this.bookService.getBooks().subscribe({
        next: (data) => {
          this.book = data.find(b => b.id === +bookId) || null;
          
        },
        error: (err) => console.error('Failed to fetch books', err)
      });
    }
  }

  onClickedCancel() {
    return this.router.navigate(['available-books'])
  }

  askForBuying(book: BookForSaleReadOnlyDTO) {
    if (this.userService.user() === null) {
      this.router.navigate(['login-signup']);
      return;
    }
    
    const buyerId = this.userService.user()!.userId;
    console.log('Requesting purchase for book ID:', book.id, 'Buyer ID:', buyerId);

    this.approvalSaleService.askForBuying(book.id, buyerId).subscribe({
      next: (response) => {
        console.log('Purchase request sent successfully', response);
        window.alert('You successfully sent a request to the seller');
        this.router.navigate(['available-books']);        // Redirect after successful request
      },
      error: (err) => {
        console.error('Failed to send purchase request', err);
        if (err.status === 404) {
          window.alert('The book was not found.');
        } else {
          window.alert('Failed to send purchase request');
        }
      }
    });
  }
}