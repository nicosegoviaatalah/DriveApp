import { Component, AfterViewInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { AlertController } from '@ionic/angular';

declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements AfterViewInit {
  map: any;
  marker: any;
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  autocompleteService: any;
  predictions: any[] = [];
  searchQuery: string = '';
  origen: any;
  destino: any;
  tiempoEstimado: string = '';
  costoEstimado: number = 0;

  constructor(private alertController: AlertController) {}

  ngAfterViewInit() {
    this.loadMap();
    this.autocompleteService = new google.maps.places.AutocompleteService();
  }

  logout() {
    console.log('Desconectado');
  }

  async loadMap() {
    const position = await Geolocation.getCurrentPosition();
    const latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    const mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    this.directionsRenderer.setMap(this.map);

    this.marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: 'Mi ubicación',
      draggable: true,
    });

    this.origen = latLng;
  }

  buscarLugar(event: any) {
    const input = event.target.value;
  
    if (input && input.length > 3) {
      this.autocompleteService.getPlacePredictions(
        { input, types: ['geocode'] },
        (predictions: any, status: string) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
            this.predictions = predictions;
          } else {
            console.error('Error al obtener predicciones:', status);
          }
        }
      );
    } else {
      this.predictions = [];
    }
  }
  
  seleccionarLugar(prediction: any) {
    const placesService = new google.maps.places.PlacesService(this.map);

    placesService.getDetails({ placeId: prediction.place_id }, (place: any, status: string) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place.geometry) {
        const latLng = place.geometry.location;
        this.destino = latLng;
        this.predictions = [];
        this.trazarRuta(this.origen, this.destino);
      }
    });
  }

  trazarRuta(origen: any, destino: any) {
    const request = {
      origin: origen,
      destination: destino,
      travelMode: google.maps.TravelMode.DRIVING, 
    };

    this.directionsService.route(request, async (result: any, status: string) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsRenderer.setDirections(result);

     
        const route = result.routes[0].legs[0];
        this.tiempoEstimado = route.duration.text; 
        const distanciaKm = route.distance.value / 1000; 
        this.costoEstimado = distanciaKm * 2; 

   
        const alert = await this.alertController.create({
          header: 'Viaje Aceptado',
          message: `
            <p><strong>Distancia:</strong> ${route.distance.text}</p>
            <p><strong>Tiempo estimado:</strong> ${this.tiempoEstimado}</p>
            <p><strong>Costo estimado:</strong> $${this.costoEstimado.toFixed(2)}</p>
          `,
          buttons: ['OK'],
        });
        await alert.present();
      } else {
        console.error('Error al trazar la ruta:', status);
      }
    });
  }

  async centrarUbicacion() {
    const position = await Geolocation.getCurrentPosition();
    const latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    this.map.setCenter(latLng);
    this.marker.setPosition(latLng);
    this.origen = latLng;
  }
}
