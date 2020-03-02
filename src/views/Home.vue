<template>
    <v-container>
        <v-layout text-center wrap>
            <v-flex>
                <v-row>
                    <v-hover>
                        <template v-slot="{ hover }">
                            <v-card tile class="col-6" :elevation="hover ? 24 : 6">
                                <router-link to="map">
                                    <v-img src="/people.jpg" class="white--text align-end"
                                           gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" max-height="80vh">
                                        <v-card-title class="text-right">Trouvez votre bonheur</v-card-title>
                                    </v-img>
                                </router-link>
                            </v-card>
                        </template>
                    </v-hover>
                    <v-hover>
                        <template v-slot="{ hover }">

                            <v-card tile class="col-6" :elevation="hover ? 24 : 6">
                                <router-link to="create">
                                    <v-img src="/toilet.jpg" class="white--text align-end"
                                           gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" max-height="80vh">
                                        <v-card-title>Proposez votre paradis</v-card-title>
                                    </v-img>
                                </router-link>
                            </v-card>

                        </template>
                    </v-hover>
                </v-row>

                <v-row class="mt-3">
                    <v-card class="col-12">
                        <v-card-text>
                            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore eaque earum eum id
                                inventore iusto
                                molestias neque reiciendis. Amet at doloremque in iste placeat rerum soluta sunt
                                suscipit vel voluptate.
                            </div>
                            <br>
                            <div>Aliquid aut beatae, blanditiis debitis dignissimos dolorum esse et explicabo fuga iste,
                                laudantium
                                nisi provident recusandae similique tempora totam voluptas! Dolore iste minima neque
                                nostrum provident
                                quidem quos tenetur. Ducimus!
                            </div>
                            <br>
                            <div>Aperiam dicta et expedita fugiat laboriosam magnam nam tenetur. Assumenda at culpa
                                doloremque,
                                incidunt iure nesciunt nihil numquam? Deleniti deserunt dolorem doloremque excepturi
                                modi, nostrum
                                obcaecati porro qui suscipit voluptate?
                            </div>
                            <br>
                            <div>Architecto deleniti ea eum, illum ipsa itaque molestias omnis optio qui repudiandae?
                                Aperiam culpa
                                deserunt expedita harum iste laudantium minus molestiae nulla provident, quo ratione
                                saepe sunt tempore
                                vero vitae!
                            </div>
                            <br>
                            <div>Aspernatur dolor et, excepturi, id molestiae necessitatibus porro praesentium quidem
                                recusandae ullam
                                vero vitae voluptates? A dolorum ex inventore itaque maxime necessitatibus, nostrum odit
                                perferendis
                                possimus recusandae rem voluptas voluptate!
                            </div>
                            <br>
                            <div>Amet blanditiis dicta error, illo perspiciatis recusandae sequi ut voluptas? Ab aperiam
                                at cupiditate
                                dicta distinctio eos eveniet ex expedita magni optio quaerat quia rem sint soluta, totam
                                ut voluptate.
                            </div>
                            <br>
                            <div>Accusamus accusantium hic laborum, non numquam officiis omnis perspiciatis qui
                                reiciendis unde. Amet
                                consequuntur, est ipsa laborum magni modi molestiae nulla numquam perferendis provident
                                rem repellendus,
                                repudiandae similique vel vero.
                            </div>
                            <br>
                            <div>Ad asperiores aut cum deleniti deserunt doloremque, dolorum ducimus error facere iste
                                iusto labore
                                laboriosam, magni modi nemo quas repellat repellendus sed veritatis vitae. Cumque dolor
                                dolorum error
                                eum reprehenderit!
                            </div>
                            <br>
                            <div>Accusantium alias aliquam molestias totam. Debitis iste nulla possimus ratione,
                                veritatis
                                voluptatibus. A, animi debitis dolore doloribus, fugit id ipsa minima nostrum omnis
                                quasi quis suscipit
                                totam! Consequuntur magnam, totam?
                            </div>
                            <br>
                            <div>Asperiores, aspernatur commodi cumque deleniti dolorem doloribus eaque explicabo,
                                facilis fugit illum
                                incidunt inventore ipsa, minima natus neque nobis nulla odio odit optio quaerat ratione
                                tempora
                                voluptates voluptatum. Commodi, ipsum?
                            </div>
                        </v-card-text>
                    </v-card>
                </v-row>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {};
  },
};
</script>
