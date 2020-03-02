<template>
    <v-sheet  elevation="3" tile class="pa-5 mb-2">
        <v-row>
            <v-col cols="1">
                <v-avatar>
                    <v-icon>mdi-paper-roll-outline</v-icon>
                </v-avatar>
            </v-col>
            <v-col cols="8">
                <v-row>
                    <span class="title">{{ toilet.title }}</span>
                </v-row>
                <v-row>
                    <span class="body-1">{{ toilet.description }}</span>
                </v-row>
            </v-col>
            <v-col>
                <v-row>
                    <v-btn @click="handleShowReservationClick">Show reservation</v-btn>
                </v-row>
            </v-col>
        </v-row>
    </v-sheet>
</template>

<script>
export default {
  name: 'AirpnpToiletItem',
  props: {
    toilet: {
      type: Object,
      required: true,
    }
  },
  methods: {
    handleShowReservationClick() {
      this.$emit('show', { id: this.toilet.id, title: this.toilet.title });
    }
  }
};
</script>