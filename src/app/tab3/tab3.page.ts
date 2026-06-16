import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  incidents: any[] = [];

  title: string = '';
  description: string = '';

  constructor() {}

  addIncident() {
    if (this.title.trim() === '') {
      return;
    }

    this.incidents.unshift({
      title: this.title,
      description: this.description,
    });

    // reset form
    this.title = '';
    this.description = '';
  }

  deleteIncident(index: number) {
    this.incidents.splice(index, 1);
  }
}
