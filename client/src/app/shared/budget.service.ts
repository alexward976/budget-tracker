import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { Budget } from './budget.model';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  readonly baseUrl = 'http://localhost:3000/api/budgets/';
  list: Budget[] = [];

  budgetForm = this.fb.group({
    _id: [''],
    name: ['', Validators.required],
    date: [''],
    income: [0, Validators.required],
    expenses: [0, Validators.required],
    net: [0, Validators.required],
  });

  getBudgetList() {
    this.http
      .get(this.baseUrl)
      .pipe(catchError(this.errorHandler))
      .subscribe((data) => {
        this.list = data as Budget[];
      });
  }

  postBudget() {
    return this.http
      .post(this.baseUrl, this.budgetForm.value)
      .pipe(catchError(this.errorHandler));
  }

  updateBudget() {
    return this.http
      .put(
        this.baseUrl + this.budgetForm.get('_id')?.value,
        this.budgetForm.value
      )
      .pipe(catchError(this.errorHandler));
  }

  deleteBudget(_id: string) {
    return this.http
      .delete(this.baseUrl + _id)
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
