import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Drug } from 'src/Drug';

@Injectable({
  providedIn: 'root',
})
export class DrugDataService {

  constructor(private http: HttpClient) { }
  


  getAllDrugs(): Observable<Drug[]> {
    return this.http.get<Drug[]>('http://localhost:8000/drugs');
  }
}
