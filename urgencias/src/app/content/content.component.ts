import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  theme: string;
  constructor(private route: ActivatedRoute) { this.route.params.subscribe((f:any)=>{
    this.theme = f.theme;
  })}

  ngOnInit() {
  }

}
