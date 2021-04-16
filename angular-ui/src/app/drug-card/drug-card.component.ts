import { Component, OnInit } from '@angular/core';
import { Drug } from '../../Drug';

@Component({
  selector: 'app-drug-card',
  templateUrl: './drug-card.component.html',
  styleUrls: ['./drug-card.component.css']
})
export class DrugCardComponent implements OnInit {


  drug={
  name: "m",
  UUID: "d",
  date_added: new Date(),
  quantity: 0,
  summary: "s",
  }
  constructor() { }

  ngOnInit(): void {
    console.log(this.drug);
    
  }

}
