import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountDetails } from '../model/accounts.modul';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http:HttpClient) {}

  public getAccount(accountId : string , page : number , size : number):Observable<AccountDetails>{
    return this.http.get<AccountDetails>(environment.host+"/accounts/"+accountId+"/pageOperations?page="+page+"&size="+size)
  }

  public debit(accountId : string , amount : number , description : string){
    return this.http.post(environment.host+"/accounts/debit",{accountIdDTO : accountId, amountDTO : amount, descriptionDTO : description});
  }

  public credit(accountId : string , amount : number , description : string){
    return this.http.post(environment.host+"/accounts/credit",{accountIdDTO : accountId, amountDTO : amount, descriptionDTO : description});
  }

  public transfer(accountIdSrc : string ,accountIdDest : string , amount : number ){
    return this.http.post(environment.host+"/accounts/transfer",{accountIdSRC : accountIdSrc, accountIdDEST : accountIdDest , amountDTO : amount});
  }
}
