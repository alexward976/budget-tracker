import { Component } from '@angular/core';
import { BudgetService } from '../../shared/budget.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-budget-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './budget-form.component.html',
  styles: ``,
})
export class BudgetFormComponent {
  submitted: boolean = false;

  constructor(public service: BudgetService, private toastr: ToastrService) {}

  onSubmit() {
    this.submitted = true;
    if (this.service.budgetForm.valid) {
      if (this.service.budgetForm.get('_id')?.value == '') {
        this.service.postBudget().subscribe((res) => {
          this.service.getBudgetList();
          this.toastr.success('Budget saved.', 'Success!');
          this.resetForm();
        });
      } else {
        this.service.updateBudget().subscribe((res) => {
          this.service.getBudgetList();
          this.toastr.info('Budget updated.');
          this.resetForm();
        });
      }
    }
  }

  updateNet() {
    let income: number = this.service.budgetForm.get('income')?.value as number;
    let expenses: number = this.service.budgetForm.get('expenses')
      ?.value as number;

    let net = income - expenses;

    this.service.budgetForm.get('net')?.setValue(net);
  }

  resetForm() {
    this.service.budgetForm.setValue({
      _id: '',
      name: '',
      date: '',
      income: 0,
      expenses: 0,
      net: 0,
    });
    console.log(this.service.budgetForm.value);
    this.submitted = false;
  }
}
