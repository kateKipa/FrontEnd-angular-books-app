import { Component, Input } from '@angular/core';
import { BookForSaleReadOnlyDTO } from 'src/app/shared/interfaces/book';

@Component({
  selector: 'app-book-table-dialog',
  standalone: true,
  imports: [],
  templateUrl: './book-table-dialog.component.html',
  styleUrl: './book-table-dialog.component.css'
})
export class BookTableDialogComponent {
@Input() book: BookForSaleReadOnlyDTO 
}
