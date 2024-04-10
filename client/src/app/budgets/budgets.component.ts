import { Component, OnInit } from '@angular/core';
import { BudgetFormComponent } from './budget-form/budget-form.component';
import { BudgetService } from '../shared/budget.service';
import { NgFor } from '@angular/common';
import { Budget } from '../shared/budget.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [BudgetFormComponent, NgFor],
  templateUrl: './budgets.component.html',
  styles: ``,
})
export class BudgetsComponent implements OnInit {
  constructor(public service: BudgetService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.service.getBudgetList();
  }

  populateForm(selectedRecord: Budget) {
    this.service.budgetForm.setValue({
      _id: selectedRecord._id,
      name: selectedRecord.name,
      date: selectedRecord.date,
      income: selectedRecord.income,
      expenses: selectedRecord.expenses,
      net: selectedRecord.net,
    });
  }

  onDelete(_id: string) {
    if (confirm('Are you sure you want to delete this budget?')) {
      this.service.deleteBudget(_id).subscribe((res) => {
        this.service.getBudgetList();
        this.toastr.success('Budget deleted.', 'Success!');
      });
    }
  }
}
