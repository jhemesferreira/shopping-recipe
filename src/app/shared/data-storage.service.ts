import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

// Injectable is optinal theoretically => But we need to add as soon as a service gets another service injected
@Injectable({
  providedIn: 'root'
})
export class DataStorageService
{
  constructor(private http: HttpClient){}
}
