import { AfterViewInit, Component } from '@angular/core';
import { IncidentService } from '../services/incident.service';
import { TrafficService } from '../services/traffic.service';
import * as L from 'leaflet';
import 'leaflet.heat';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements AfterViewInit {
  map!: L.Map;
  baseLayer!: L.TileLayer;

  incidentLayer = L.layerGroup();
  trafficLayer = L.layerGroup();

  recentIncidents: any[] = [];

  showBaseMap = true;
  showTrafficMap = true;
  showIncidentLayer = true;

  constructor(
    private incidentService: IncidentService,
    private trafficService: TrafficService,
  ) {}

  // =========================
  // INIT MAP
  // =========================
  ngAfterViewInit() {
    setTimeout(() => {
      this.map = L.map('map').setView([10.7769, 106.7009], 13);

      this.baseLayer = L.tileLayer(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        { maxZoom: 19 },
      );

      this.baseLayer.addTo(this.map);

      this.incidentLayer.addTo(this.map);
      this.trafficLayer.addTo(this.map);

      this.loadIncidents();
      this.loadTraffic();

      L.control
        .layers(
          { 'Bản đồ nền': this.baseLayer },
          {
            'Sự cố giao thông': this.incidentLayer,
            'Mật độ giao thông': this.trafficLayer,
          },
        )
        .addTo(this.map);

      this.map.invalidateSize();
    }, 500);
  }

  // =========================
  // INCIDENTS
  // =========================
  loadIncidents() {
    this.incidentService.getAll().subscribe((data) => {
      this.recentIncidents = data;

      this.incidentLayer.clearLayers();

      data.forEach((item) => {
        const lat = item.lat;
        const lng = item.lng;

        if (lat == null || lng == null) return; // 👈 chặn undefined
        const icon = this.getIcon(item.type);
        L.marker([lat, lng], { icon })
          .bindPopup(`<b>${item.title}</b><br>${item.description}`)
          .addTo(this.incidentLayer);
      });
    });
  }

  // =========================
  // TRAFFIC
  // =========================
  loadTraffic() {
    this.trafficService.getAll().subscribe((roads) => {
      this.trafficLayer.clearLayers();

      roads.forEach((road) => {
        L.polyline(
          road.coordinates.map(
            (c: number[]) => [c[0], c[1]] as [number, number],
          ),
          {
            color: road.color,
            weight: 8,
          },
        ).addTo(this.trafficLayer);
      });
    });
  }

  // =========================
  // GPS LOCATION
  // =========================
  locateUser() {
    this.map.locate({
      setView: true,
      maxZoom: 16,
      enableHighAccuracy: true,
    });

    this.map.on('locationfound', (e: L.LocationEvent) => {
      const userLat = e.latlng.lat;
      const userLng = e.latlng.lng;

      L.marker([userLat, userLng])
        .addTo(this.map)
        .bindPopup('📍 Vị trí của bạn')
        .openPopup();

      this.loadNearbyIncidents(userLat, userLng);
    });
  }

  // =========================
  // 5KM NEARBY INCIDENTS
  // =========================
  loadNearbyIncidents(lat: number, lng: number) {
    this.incidentService.getNearby(lat, lng).subscribe((data: any[]) => {
      this.incidentLayer.clearLayers();

      data.forEach((item) => {
        const icon = this.getIcon(item.type);

        L.marker([item.lat, item.lng], { icon })
          .bindPopup(`<b>${item.title}</b><br>${item.description}`)
          .addTo(this.incidentLayer);
      });
    });
  }

  // =========================
  // ICON FACTORY
  // =========================
  getIcon(type: string | undefined) {
    const t = type ?? 'unknown';

    const base = {
      iconSize: [30, 30] as [number, number],
      iconAnchor: [20, 40] as [number, number],
      popupAnchor: [0, -40] as [number, number],
    };

    if (t === 'accident') {
      return L.icon({ ...base, iconUrl: 'assets/icon/auto-accident.png' });
    }

    if (t === 'flood') {
      return L.icon({ ...base, iconUrl: 'assets/icon/flood.png' });
    }

    return L.icon({ ...base, iconUrl: 'assets/icon/warning.png' });
  }
}
