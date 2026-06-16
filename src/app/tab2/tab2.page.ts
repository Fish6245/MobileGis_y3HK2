import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  totalFeatures = 1540;
  totalWards = 312;
  totalDistricts = 22;

  ionViewWillEnter() {
    // sau này thay API GIS (Flask / PostGIS / PHP)
  }
}
