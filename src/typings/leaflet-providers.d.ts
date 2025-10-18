// src/typings/leaflet-providers.d.ts
import * as L from 'leaflet';

declare module 'leaflet' {
  namespace tileLayer {
    function provider(providerName: string, options?: any): L.TileLayer;
  }
}

declare module 'leaflet-providers' {
  const providers: any;
  export default providers;
}
