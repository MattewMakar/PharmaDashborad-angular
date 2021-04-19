import { Component, OnInit, OnDestroy } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { Drug } from '../../Drug';
import { DrugDataService } from '../drug-data.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {
  drugs: Drug[];
  subject = webSocket<Drug[]>({
    url: 'ws://localhost:8080',
    deserializer: (data) => JSON.parse(data.data)
  });
  constructor(private dataService: DrugDataService) {}

  ngOnInit(): void {
    this.dataService.getAllDrugs().subscribe((data) => {
      this.drugs = data.sort(
        (a, b) =>  Date.parse(`${b.date_added}`) - Date.parse(`${a.date_added}`)
        
      ).slice(0, 50);
});

    this.subject.subscribe((data) => {      
      this.drugs = data.sort(
        (a, b) => Date.parse(`${b.date_added}`) - Date.parse(`${a.date_added}`)
      ).slice(0,50);
    });
  }

  ngOnDestroy(): void {
    this.subject.unsubscribe();
  }
}
