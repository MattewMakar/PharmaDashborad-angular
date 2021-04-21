import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Drug } from 'src/Drug';

@Injectable({
  providedIn: 'root',
})
export class DrugDataService {

  constructor(private http: HttpClient) { }
  

//here I send a request to the server to get all the available drugs in the database 
  getAllDrugs(): Observable<Drug[]> {
    return this.http.get<Drug[]>('http://localhost:8000/drugs');
  }
}
