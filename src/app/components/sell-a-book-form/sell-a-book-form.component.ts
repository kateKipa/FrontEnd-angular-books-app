import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookCategory, BookForSale, ConditionOfBook, PaymentMethod, TypeOfTransaction } from 'src/app/shared/interfaces/book';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-sell-a-book-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sell-a-book-form.component.html',
  styleUrl: './sell-a-book-form.component.css'
})
export class SellABookFormComponent {
  bookService = inject(BookService)
  validationService = inject(ValidationService)
  router = inject(Router) 

  categories: { key: string, value: string }[];
  types: { key: string, value: string }[];
  methods: { key: string, value: string }[];
  conditions: { key: string, value: string }[];

  form: FormGroup;
  errorMessage?: string;
  type : string = ''
  selectedTransactionType: string | null = ''
  successInAddingBook : string = ''
  addedBook : any | null
  selectedPrice : number

  //@Output() typeOfTransaction = new EventEmitter<string>();


  
  constructor(private fb: FormBuilder) {
    this.categories = this.mapEnumToArray(BookCategory)
    this.conditions = this.mapEnumToArray(ConditionOfBook)
    this.types = this.mapEnumToArray(TypeOfTransaction)
    this.methods = this.mapEnumToArray(PaymentMethod)

    this.form = new FormGroup ({
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      description: new FormControl(''),
      bookCategory : new FormControl ('',Validators.required),
      conditionOfBook : new FormControl(''),
      typeOfTransaction : new FormControl('', Validators.required),
      price : new FormControl(0, [Validators.required, Validators.min(0), Validators.max(9999.99), Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
      paymentMethod : new FormControl('')
    })
  }

  onSubmit() {
    const bookForSale = this.form.value as BookForSale
    this.bookService.addANewBookForSale(bookForSale).subscribe({
      next: (response: any) => {
        console.log(response)
        this.successInAddingBook = 'success'
        this.form.reset();
        this.addedBook = response

        //this.router.navigate(['/my-profile'])
      },
      error: (response) => {
        console.error(response)
        this.successInAddingBook = 'fail'
        this.errorMessage = Object.values(response.error.errors)[0][0]
        console.log(this.errorMessage)

      }
    })
  }

   private mapEnumToArray(enumObj: any): { key: string, value: string }[] {
    return Object.keys(enumObj)
      .filter(key => isNaN(Number(key))) // Filter out numeric keys
      .map(key => ({ key, value: enumObj[key] }));
  }


  onSelect(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedTransactionType = select.value;
    if (this.selectedTransactionType === 'Free') {
      this.form.get('price')?.setValue(0.00);
      this.form.get('price')?.disable();
    } else {
      this.form.get('price')?.enable();
      this.form.get('price')?.setValue('');
    }
  }

  onFree(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedPrice = parseFloat(select.value);
    if (this.selectedPrice == 0) {
      this.form.get('typeOfTransaction')?.setValue('Free')
    }
  }

}
