import { Component, Input, OnInit } from '@angular/core';
import { Drug } from '../../Drug';

@Component({
  selector: 'app-drug-card',
  templateUrl: './drug-card.component.html',
  styleUrls: ['./drug-card.component.css'],
})
export class DrugCardComponent implements OnInit {
  @Input() drug: Drug;
  // here I received the drug info from the parent component and render it inside the html template
  constructor() {}

  ngOnInit(): void {}
}
