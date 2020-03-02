<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div id="mapContainer">
        <v-row>
            <label>
                <GmapAutocomplete @place_changed="setGoogleSearchPlace"></GmapAutocomplete>
            </label>

            <label>Nombre de toilettes</label>
            <v-select class="inputSelect" @change="maxMarkerChange" :items="items" dense></v-select>
        </v-row>
        <GmapMap @click="closePopups" id="googleMap" :zoom="zoom" :center="position">
            <GmapMarker v-for="(marker, index) in markers" :key="index" :position="{lat: marker.lat, lng: marker.lng}"
                        @click="openWindow(marker)" ref="marks"/>
            <GmapInfoWindow :position="{lat: popUp.lat, lng: popUp.lng}" :opened="isPopupOpen"
                            @closeclick="isPopupOpen=false">
                <h2>{{ popUp.title }}</h2><br>
                <p>{{ popUp.description }}</p>
                <v-bottom-sheet v-model="sheet" inset>
                    <template v-slot:activator="{ on }">
                        <v-btn color="green" dark v-on="on">Book toilet</v-btn>
                    </template>
                    <v-sheet class="text-center d-flex flex-column" height="650px">
                        <v-btn class="mt-6" text color="error" @click="sheet = !sheet">close</v-btn>
                        <div class="flex-row align-center flex">
                            <v-text-field class="messageBox" v-model="message"
                                          label="Petit message pour le propriétaire :)"></v-text-field>
                            <v-time-picker class="timeBox" v-model="heure"></v-time-picker>
                        </div>
                        <v-btn @click="validateBook(popUp)">Reserver !</v-btn>
                    </v-sheet>
                </v-bottom-sheet>
            </GmapInfoWindow>
        </GmapMap>
    </div>
</template>

<script>
import HttpClientMixin from '../mixins/HttpClientMixin';
import MessageBus from '../services/messageBus';
import RequestsApi from '../services/api/Requests';
import ToiletsApi from '../services/api/Toilets';

export default {
  mixins: [HttpClientMixin],
  data() {
    return {
      markers: [],
      position: { lat: 0, lng: 0 },
      zoom: 16,
      popUp: {
        lat: 0, lng: 0, title: '', description: ''
      },
      isPopupOpen: false,
      maxMarker: 5,
      items: [5, 10, 15, 20, 25, 50, 100, 200, 500, 1000, 5000, 10000],
      sheet: false,
      message: '',
      timeBook: '',
      heure: ''
    };
  },
  created() {
    this.requestsApi = new RequestsApi(this.httpClient);
    this.toiletsApi = new ToiletsApi(this.httpClient);
    this.checkGeolocalization();
  },
  methods: {
    checkGeolocalization() {
      if (!navigator.geolocation) {
        MessageBus.$emit('toast', { color: 'red', message: 'Geolocalisation not allowed :/' });
        this.position = { lat: 48.866667, lng: 2.333333 }; // Paris
        this.zoom = 10;
      } else {
        navigator.geolocation.getCurrentPosition((pos) => this.setPlace(pos));
      }
    },
    async setGoogleSearchPlace(place) {
      this.position = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
      this.zoom = 18;
      this.updateMarkers();
    },
    async setPlace(pos) {
      this.position = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      this.zoom = 16;
      this.updateMarkers();
    },
    async updateMarkers() {
      this.markers = [];
      const markersTab = await this.toiletsApi.getNToilets(this.position.lat, this.position.lng, this.maxMarker);
      markersTab.data.items.forEach((marker) => this.markers.push({
        lat: marker.coordinates.coordinates[0],
        lng: marker.coordinates.coordinates[1],
        title: marker.title,
        description: marker.description,
        id: marker.id,
      }));
    },
    async validateBook() {
      const result = await this.requestsApi.book(this.message, this.heure, this.popUp.id);
      if (result.status) {
        MessageBus.$emit('toast', { color: 'success', message: 'Toilet booked !' });
      } else {
        MessageBus.$emit('toast', { color: 'success', message: 'Couldn\'t book the toilet :/' });
      }
    },
    openWindow(marker) {
      this.isPopupOpen = true;
      this.popUp = marker;
    },
    closePopups() {
      this.isPopupOpen = false;
    },
    maxMarkerChange(maxMarker) {
      this.maxMarker = maxMarker;
      this.updateMarkers();
    }
  }
};
</script>
<style>
    #googleMap, #mapContainer {
        width: 100%;
        height: 100%;
    }

    .messageBox, .timeBox {
        width: 30%;
    }

    .inputSelect {
        width: 30px;
    }
</style>
