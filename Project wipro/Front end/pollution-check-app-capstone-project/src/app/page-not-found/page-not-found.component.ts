import { Component, AfterContentInit } from '@angular/core';

declare let require: any;

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements AfterContentInit {

  constructor() { }

  ngAfterContentInit() {
    const Parallax = require('parallax-js');
    const scene = document.getElementById('scene');
    const parallaxInstance = new Parallax(scene, {
      relativeInput: true
    });
  }

}
