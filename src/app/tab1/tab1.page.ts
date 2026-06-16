import { AfterViewInit, Component } from '@angular/core';
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

  showBaseMap = true;
  showTrafficMap = true;
  showIncidentLayer = false;

  constructor() {}

  updateLayers() {
    // ===== Bản đồ nền =====
    if (this.showBaseMap) {
      if (!this.map.hasLayer(this.baseLayer)) {
        this.baseLayer.addTo(this.map);
      }
    } else {
      this.map.removeLayer(this.baseLayer);
    }

    // ===== Mật độ giao thông =====
    if (this.showTrafficMap) {
      if (!this.map.hasLayer(this.trafficLayer)) {
        this.trafficLayer.addTo(this.map);
      }
    } else {
      this.map.removeLayer(this.trafficLayer);
    }

    // ===== Sự cố giao thông =====
    if (this.showIncidentLayer) {
      if (!this.map.hasLayer(this.incidentLayer)) {
        this.incidentLayer.addTo(this.map);
      }
    } else {
      this.map.removeLayer(this.incidentLayer);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.map = L.map('map').setView([10.7769, 106.7009], 13);

      this.baseLayer = L.tileLayer(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          maxZoom: 19,
        },
      );

      this.baseLayer.addTo(this.map);
      this.trafficLayer.addTo(this.map);

      const accidentIcon = L.icon({
        iconUrl: 'assets/icon/auto-accident.png',
        iconSize: [30, 30],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });
      const trafficIcon = L.icon({
        iconUrl: 'assets/icon/warning.png',
        iconSize: [30, 30],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });
      const floodIcon = L.icon({
        iconUrl: 'assets/icon/flood.png',
        iconSize: [30, 30],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });

      L.marker([10.7308, 106.6992], {
        icon: trafficIcon,
      })
        .bindPopup('<b>Tai nạn giao thông</b><br>Nguyễn Văn Linh')
        .addTo(this.incidentLayer);

      L.marker([10.7485, 106.7028], {
        icon: accidentIcon,
      })
        .bindPopup('<b>Kẹt xe</b><br>Nguyễn Hữu Thọ')
        .addTo(this.incidentLayer);

      // Đang set cứng khi nào có backend điều chỉnh sau
      // Vàng - đông xe
      L.polyline(
        [
          [10.7308, 106.6992],
          [10.7335, 106.702],
          [10.736, 106.705],
        ],
        {
          color: 'red',
          weight: 8,
        },
      ).addTo(this.trafficLayer);

      // Vàng - đông xe
      L.polyline(
        [
          [10.7485, 106.7028],
          [10.751, 106.706],
        ],
        {
          color: 'yellow',
          weight: 8,
        },
      ).addTo(this.trafficLayer);

      // Xanh - thông thoáng
      L.polyline(
        [
          [10.7756, 106.6891],
          [10.778, 106.693],
        ],
        {
          color: 'green',
          weight: 8,
        },
      ).addTo(this.trafficLayer);

      const overlayMaps = {
        'Sự cố giao thông': this.incidentLayer,

        'Mật độ giao thông': this.trafficLayer,
      };

      L.control
        .layers(
          {
            'Bản đồ nền': this.baseLayer,
          },
          overlayMaps,
        )
        .addTo(this.map);

      this.map.invalidateSize();
    }, 500);
  }
}
