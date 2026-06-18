import { Component } from '@angular/core';
import { IncidentService, Incident } from '../services/incident.service';

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

  constructor(private incidentService: IncidentService) {}

  ngOnInit() {
    this.loadIncidents();
  }

  loadIncidents() {
    this.incidentService.getAll().subscribe((res) => {
      this.incidents = res;
    });
  }

  addIncident() {
    if (!this.title.trim()) return;

    const newIncident: Incident = {
      title: this.title,
      description: this.description,
    };

    this.incidentService.create(newIncident).subscribe(() => {
      this.loadIncidents(); // reload từ backend
    });

    this.title = '';
    this.description = '';
  }

  deleteIncident(id: number | undefined) {
    if (!id) return;

    this.incidentService.delete(id).subscribe(() => {
      this.loadIncidents();
    });
  }
}
