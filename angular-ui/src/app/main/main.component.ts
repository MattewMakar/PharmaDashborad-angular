import { Component, OnInit } from '@angular/core';
import { Drug } from '../../Drug'
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  Drugs: Drug[];
  constructor() { }

  ngOnInit(): void {
  }

}
