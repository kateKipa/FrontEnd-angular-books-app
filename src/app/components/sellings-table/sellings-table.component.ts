import { Component, Input, inject } from '@angular/core';
import { sortBy } from 'lodash';
import { ApprovalSaleService } from 'src/app/services/approvalSale.service';
import { TypeOfTransaction, acceptableBooks } from 'src/app/shared/interfaces/book';

@Component({
  selector: 'app-sellings-table',
  standalone: true,
  imports: [],
  templateUrl: './sellings-table.component.html',
  styleUrl: './sellings-table.component.css'
})
export class SellingsTableComponent {
  @Input() tableBooks: acceptableBooks[]
  @Input() sellerBuyer: string
  @Input() booksForApproval: boolean
  @Input() booksForAskingApproval: boolean

  approvalSaleService = inject(ApprovalSaleService)


  approveSale(bookId: number) {
    this.approvalSaleService.approveSale(bookId).subscribe({
      next: (response) => {
        console.log('Sale approved successfully', response);
        window.alert('You approved the purchase successfully');
        this.removeFromTable(bookId); 
      },
      error: (err) => {
        console.error('Failed to approve sale', err);
        window.alert('Failed to approve sale');
      }
    });
  }
  
  rejectSale(bookId: number) {
    this.approvalSaleService.rejectSale(bookId).subscribe({
      next: (response) => {
        console.log('Sale rejected successfully', response);
        window.alert('You rejected the purchase successfully');
        this.removeFromTable(bookId); 
      },
      error: (err) => {
        console.error('Failed to reject sale', err);
        window.alert('Failed to reject sale');
      }
    });
  }
  
  removeFromTable(bookId: number) {
    this.tableBooks = this.tableBooks.filter(book => book.bookId !== bookId);
  }

  sortOrder = {
    title: 'none',
    author: 'none',
    TypeOfTransaction: 'none',
    price: 'none',
    sellerBuyerName: 'none'
  }

  sortData(sortKey: string) {
    if (this.sortOrder[sortKey] === 'asc') {
      this.sortOrder[sortKey] = 'desc'
      this.tableBooks = sortBy(this.tableBooks, sortKey).reverse()
    } else {
      this.sortOrder[sortKey] = 'asc'
      this.tableBooks = sortBy(this.tableBooks, sortKey)
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
}


