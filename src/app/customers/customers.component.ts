import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers! : Observable<Array<Customer>>;
  errorMessage! : object;
  searchFormGroup : FormGroup | undefined;
  
  constructor(private customerService : CustomerService , private fb : FormBuilder , private router : Router ) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control("")
    });
    this.handleSearchCustomers();
  }

  handleSearchCustomers(){
    let key = this.searchFormGroup?.value.keyword;
    this.customers = this.customerService.searchCustommer(key).pipe(
      catchError(err=>{
        this.errorMessage = err.message;
        return throwError(err.message);
      })
    )
  }

  deleteCustomer(customer : Customer){
    let conf = confirm("are you sure ?");
    if(!conf) return;
    this.customerService.deleteCustomer(customer.id).subscribe({
      next : (resp)=>{
        this.customers = this.customers.pipe(
          map(data=>{
            let index = data.indexOf(customer);
            data.slice(index,1)
            return data;
          })
        )
      },
      error : err=>{
        console.log(err)
      }
    });
  }


  getAccounts(customer : Customer){
    this.router.navigateByUrl("/customer-accounts/"+customer.id , {state : customer})
  }

}


