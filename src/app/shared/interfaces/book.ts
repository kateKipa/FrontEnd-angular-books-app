import { User } from "./user"

export interface Book {
    title: string
    author: string
    description: string
    category: string
}


export interface acceptableBooks {
  bookId: number
  title: string
  author: string
  typeOfTransaction: TypeOfTransaction
  price: number
  description: string
  BookCategory : BookCategory
  conditionOfBook : ConditionOfBook
  paymentMethod : PaymentMethod
  buyer : User
  seller : User

}

export enum TypeOfTransaction {
  Sale = "Sale",
  Free = "Free"
}

export enum BookCategory {
  Fiction = "Fiction",
  Mystery = "Mystery",
  ScienceFiction = "Science Fiction",
  Fantasy = "Fantasy",
  Biography = "Biography",
  History = "History",
  Children = "Children",
  Romance = "Romance",
  Thriller = "Thriller",
  SelfHelp = "Self Help",
  GraphicNovel = "Graphic Novel",
  Poetry = "Poetry",
  Educational = "Educational"
}

export enum ConditionOfBook {
  New = "New",
  LikeNew = "Like New",
  VeryGood = "Very Good",
  Good = "Good",
  Acceptable = "Acceptable",
  Poor = "Poor"
}

export enum PaymentMethod {
  Card = "Card",
  Paypal = "Paypal",
  Cash = "Cash",
  Deposit = "Deposit"
}

export interface BookForSale {
  title : string
  author: string
  description: string
  bookCategory : BookCategory
  conditionOfBook : ConditionOfBook
  typeOfTransaction: TypeOfTransaction
  price : number,
  paymentMethod : PaymentMethod

}

export interface BookForSaleReadOnlyDTO {
  id: number
  bookId: number
  title: string;
  author: string;
  description: string;
  bookCategory: BookCategory;
  conditionOfBook?: ConditionOfBook;
  typeOfTransaction: TypeOfTransaction;
  price: number;
  paymentMethod?: PaymentMethod;
  seller: User;
}