import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data/data.service";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

}
