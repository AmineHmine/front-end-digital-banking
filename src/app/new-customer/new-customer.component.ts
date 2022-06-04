import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

  customerNewFormGroup! : FormGroup;
  constructor(private fb : FormBuilder, private customerService : CustomerService , private router : Router) { }

  ngOnInit(): void {
    this.customerNewFormGroup = this.fb.group({
      name : this.fb.control(null,[Validators.required,Validators.minLength(3)]),
      email : this.fb.control(null,[Validators.required,Validators.email]),
    })
  }

  saveCustomer(){
    let customer = this.customerNewFormGroup.value;
    this.customerService.addCustomer(customer).subscribe({
      next : data=>{
        alert("Customer has been successfully saved!");
        //this.customerNewFormGroup.reset();
        this.router.navigateByUrl("/customers")
      },
      error : err => {
        console.log(err);
      }
    });
  }
}
