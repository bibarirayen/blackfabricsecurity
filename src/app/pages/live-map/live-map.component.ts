import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import L from 'leaflet';
import 'leaflet-providers';

@Component({
  selector: 'app-live-map',
  standalone: true,
  imports: [CommonModule],

  templateUrl: './live-map.component.html',
  styleUrls: ['./live-map.component.css']
})
export class LiveMapComponent implements AfterViewInit {
  private map!: L.Map;
  private markers: L.Marker[] = [];

  guards = [
    { name: 'Honolulu', lat: 21.3069, lng: -157.8583, status: 'On patrol' },
    { name: 'Kailua', lat: 21.4022, lng: -157.7394, status: 'At base' },
    { name: 'Pearl City', lat: 21.3972, lng: -157.9750, status: 'On duty' },
    { name: 'Kaneohe', lat: 21.4095, lng: -157.7990, status: 'Responding' },
    { name: 'Hilo', lat: 19.7070, lng: -155.0816, status: 'Monitoring' },
    { name: 'Lahaina', lat: 20.8783, lng: -156.6825, status: 'On patrol' },
    { name: 'Maui', lat: 20.7984, lng: -156.3319, status: 'On break' },
    { name: 'Kahului', lat: 20.8895, lng: -156.4729, status: 'At checkpoint' },
    { name: 'Waimea', lat: 20.0234, lng: -155.6718, status: 'Reporting' },
    { name: 'Kona', lat: 19.6400, lng: -155.9950, status: 'Responding' },
    { name: 'Pahoa', lat: 19.5036, lng: -154.9524, status: 'Patrolling' },
    { name: 'Lihue', lat: 21.9811, lng: -159.3711, status: 'On standby' },
  ];

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [20.8, -156.3],
      zoom: 7,
      zoomControl: true
    });

    const streetMap = L.tileLayer.provider('CartoDB.Voyager');
    const satelliteMap = L.tileLayer.provider('Esri.WorldImagery');
    streetMap.addTo(this.map);

    L.control.layers({ 'Street': streetMap, 'Satellite': satelliteMap }).addTo(this.map);

    const icon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/484/484167.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -28]
    });

    this.guards.forEach(g => {
      const marker = L.marker([g.lat, g.lng], { icon })
        .addTo(this.map)
        .bindPopup(`<b>${g.name}</b><br>Status: ${g.status}`);
      this.markers.push(marker);
    });
  }

  focusOnGuard(guard: any): void {
    // Fly to guard with full zoom and popup
    this.map.flyTo([guard.lat, guard.lng], 17, { duration: 1.5 });
    const marker = this.markers.find(
      m => m.getLatLng().lat === guard.lat && m.getLatLng().lng === guard.lng
    );
    if (marker) {
      setTimeout(() => marker.openPopup(), 1500); // Wait until zoom animation finishes
    }
  }
}
