import { Component, Inject, OnInit } from '@angular/core';
import { SellingsTableComponent } from '../sellings-table/sellings-table.component';
import { BookForSaleReadOnlyDTO, acceptableBooks } from 'src/app/shared/interfaces/book';
import { BookService } from 'src/app/services/book.service';
import { SaleService } from 'src/app/services/sale.service';
import { RouterLink } from '@angular/router';
import { ApprovalSaleService } from 'src/app/services/approvalSale.service';
import { BookReadyForTradingService } from 'src/app/services/bookReadyForTrading.service';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [SellingsTableComponent, RouterLink],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit {
  //saleService = Inject(SaleService)

  accBooks: acceptableBooks[] = []
  givenBooks: acceptableBooks[] = []
  approvalBooks: acceptableBooks[] = []
  askingApprovalBooks: acceptableBooks[] = []
  readyForTradingBooks: acceptableBooks[] = []

  seller : string = 'Seller username'
  buyer : string = 'Buyer username'
  booksForApproval : boolean = false
  booksForAskingApproval : boolean = false
  userBuyer : string = "User who asks for purchase"
  userSeller : string = "User who offer the book"


  constructor(private saleService: SaleService, private approvalSaleService: ApprovalSaleService, private bookReadyForTradingService: BookReadyForTradingService) {}

  
  ngOnInit(): void {
      this.saleService.getBuyingBooks()
          .subscribe({
            next: (data) => {
              this.accBooks = data
              console.log(data)
            },
            error: (error) => {
              console.error('Error fetching buying books:', error);
            }
          }),
          this.saleService.getSellingBooks()
          .subscribe({
            next: (data) => {
              this.givenBooks = data
              console.log(data)
            },
            error: (error) => {
              console.error('Error fetching selling books:', error);
            }
          }),
          this.approvalSaleService.askForApprovalByUser()
          .subscribe({
            next: (data) => {
              this.booksForApproval = true
              this.approvalBooks = data
              console.log(data)
              
            }, 
            error: (error) => {
              console.error('Error fetching selling books:', error);
            }
          }),
          this.approvalSaleService.askForApproval()
          .subscribe({
            next: (data) => {
              this.booksForAskingApproval = true
              this.askingApprovalBooks = data
              console.log(data)
              
            }, 
            error: (error) => {
              console.error('Error fetching selling books:', error);
            }
          }),
          this.bookReadyForTradingService.GetReadyBooks()
          .subscribe({
            next: (data) => {
              this.readyForTradingBooks = data
              console.log(data)
              
            }, 
            error: (error) => {
              console.error('Error fetching ready for trading books:', error);
            }
          })
    }

    confirmReceived(book: acceptableBooks) {
      const confirmation = confirm('Are you sure you have received the book?');
      if (confirmation) {
        this.bookReadyForTradingService.receiveBook(book).subscribe({
          next: (response) => {
            console.log(response)
            alert('Book received successfully!');
            this.readyForTradingBooks = [];
            this.bookReadyForTradingService.GetReadyBooks().subscribe({
              next: (books) => {
                this.readyForTradingBooks = books;
              },
              error: (err) => {
                console.error('Failed to load books ready for trading', err);
              }
            })
            this.saleService.getBuyingBooks().subscribe({
              next: (books) => {
                this.accBooks = books
              console.log(books)
            },
            error: (error) => {
              console.error('Error fetching buying books:', error);
            }
          })
          },
          error: (err) => {
            console.error('Failed to confirm book reception', err);
            alert('Failed to confirm book reception');
          }
        });
      }
    }
}
    

