import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, Observable, throwError } from 'rxjs';
import { AccountDetails } from '../model/accounts.modul';
import { AccountsService } from '../services/accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accountFormGroup! : FormGroup;
  currentPage : number = 0;
  pageSize : number = 5;
  accountObservable! : Observable<AccountDetails>;
  errorMessage! : string;

  operationForm! :FormGroup;


  constructor(private fb : FormBuilder, private accountService : AccountsService) { }

  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      accountId : this.fb.control('')
    });

    this.operationForm = this.fb.group({
      operationType : this.fb.control(null),
      amount : this.fb.control(0),
      description : this.fb.control(null),
      accountDestination : this.fb.control(null)
    });
  };

  searchAccount(){
    let accountId : string = this.accountFormGroup.value.accountId;
    
    this.accountObservable = this.accountService.getAccount(accountId , this.currentPage , this.pageSize).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );

    console.log(this.accountObservable);
  }

  gotoPage(page : number){
    this.currentPage = page;
    this.searchAccount(); 
  }

  accountOperations(){
    let accountId : string = this.accountFormGroup.value.accountId;
    let operation = this.operationForm.value.operationType;
    let amount : number = this.operationForm.value.amount;
    let description : string = this.operationForm.value.description;
    let destination : string = this.operationForm.value.accountDestination;

    if(operation == 'DEBIT'){
      this.accountService.debit(accountId,amount,description).subscribe({
        next : data=>{
          alert("debit success");
          this.operationForm.reset();
          this.searchAccount(); 
        },
        error : err=>{
          console.log(err);
        }
      })
    }
    else if(operation == 'CREDIT'){
      this.accountService.credit(accountId,amount,description).subscribe({
        next : data=>{
          alert("credit success");
          this.operationForm.reset();
          this.searchAccount(); 
        },
        error : err=>{
          console.log(err);
        }
      })
    }
    else if(operation == 'TRANSFER'){
      this.accountService.transfer(accountId,destination,amount).subscribe({
        next : data=>{
          alert("transfer has been done successfully");
          this.operationForm.reset();
          this.searchAccount(); 
        },
        error : err=>{
          console.log(err);
        }
      })
    }

    
  }

}
