import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  totalFeatures = 0;
  totalWards = 0;
  totalDistricts = 0;

  warnings: any[] = [];

  constructor(private http: HttpClient) {}

  ionViewWillEnter() {
    this.loadGISReport();
  }

  loadGISReport() {
    this.http.get<any>('assets/mock-gis.json').subscribe((data) => {
      this.totalFeatures = data.totalFeatures;
      this.totalWards = data.totalWards;
      this.totalDistricts = data.totalDistricts;
      this.warnings = data.warnings;
    });
  }
}
