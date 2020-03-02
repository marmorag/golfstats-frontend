<template>
    <v-container class="fullHeight" fluid>
        <v-row class="fullHeight">
            <v-col class="fullHeight" cols="12">
                <v-row class="justify-lg-space-around flex-column align-content-lg-space-around fullHeight"
                       :align=center>
                    <form>
                        <h1>Mise à disposition d'un nouveau toilette</h1>
                        <v-text-field label="Enter the toilet name"
                                      required
                                      name="title"
                                      v-model="title"
                        ></v-text-field>
                        <v-textarea required
                                    name="description"
                                    label="Enter the toilet description"
                                    v-model="description"
                        ></v-textarea>
                        <label class="ma-2">
                            <GmapAutocomplete @place_changed="setGoogleSearchPlace">
                            </GmapAutocomplete>
                        </label>
                        <v-btn color="blue" type="button" v-on:click="validateCreation()">Register my toilet</v-btn>
                    </form>
                    <GmapMap class="ma-2" id="googleMap" :zoom="zoom" :center="{lat: lat, lng: lng}">
                        <GmapMarker :position="{lat, lng}" ref="marks"/>
                    </GmapMap>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import HttpClientMixin from '../mixins/HttpClientMixin';
import MessageBus from '../services/messageBus';
import ToiletsApi from '../services/api/Toilets';

export default {
  name: 'CreationToilet',
  mixins: [HttpClientMixin],
  data() {
    return {
      center: 'center',
      title: '',
      description: '',
      lat: 0,
      lng: 0,
      zoom: 10,
    };
  },
  created() {
    this.toiletsApi = new ToiletsApi(this.httpClient);
    this.checkGeolocalization();
  },
  methods: {
    async setPlace(pos) {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
    },
    checkGeolocalization() {
      if (!navigator.geolocation) {
        // eslint-disable-next-line no-alert
        alert('Geolocation is not supported by this browser.');
        this.lat = 48.866667; // Paris
        this.lng = 2.333333;
      } else {
        navigator.geolocation.getCurrentPosition((pos) => this.setPlace(pos));
      }
    },
    async setGoogleSearchPlace(place) {
      this.lat = place.geometry.location.lat();
      this.lng = place.geometry.location.lng();
    },
    async validateCreation() {
      this.toiletsApi.createToilet({
        type: 'Point',
        coordinates: [this.lat, this.lng]
      }, this.description, this.title).then((result) => {
        if (result.status) {
          MessageBus.$emit('toast', { color: 'green', message: 'Toilet created !' });
          this.$router.push({ name: 'map' });
        } else {
          MessageBus.$emit('toast', { color: 'danger', message: 'Failed to create your toilets.' });
        }
      });
    }
  },
};
</script>

<style scoped>
    #googleMap {
        width: 100%;
        height: 600px;
    }

    .fullHeight {
        height: 100%;
    }
</style>
