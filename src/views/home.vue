<template>
    <v-container fluid fill-height>
        <v-row>
          <v-spacer />
          <v-col class="text-center">
            <v-card dark 
                    flat 
                    color="rgba(255, 255, 255, 0.2)"
                    height="15rem"
                    class="pt-4"
            >
              <h1>{{homeTitle}}</h1>
              <v-card-subtitle class="pa-1">
                {{homeSubtitles}}
              </v-card-subtitle>
              <v-row class="my-3" cols="12">
                <v-col cols="2"></v-col>
                <v-col cols="4">
                  <v-dialog
                    persistent
                    max-width="40vw"
                    v-model="homeBtns.signIn.signInForm"
                  >
                    <template v-slot:activator="{ on, attrs}">
                      <v-btn
                        disabled
                        outlined
                        block
                        v-bind="attrs"
                        v-on="on"
                        color="blue lighten-3" 
                      >
                        {{homeBtns.signIn.text}}
                      </v-btn>
                    </template>

                    <v-form lazy-validation>
                      <v-card class="pa-4" max-width="40vw">
                        <v-row>
                          <v-spacer></v-spacer>
                          <v-btn text icon @click="homeBtns.signIn.signInForm = false">
                            <v-icon>{{homeBtns.exitFormIcon}}</v-icon>
                          </v-btn>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-text-field
                              label="Email"
                              type="email"
                              append-outer-icon="mdi-email"                        
                            ></v-text-field>
                            <v-text-field
                              label="Password"
                              type="password"
                              append-outer-icon="mdi-lock"                           
                            ></v-text-field>
                            <v-container>
                              <v-row>
                                <v-spacer />
                                  <v-btn 
                                    type="submit" 
                                    @click="validateSignin"
                                  >
                                    {{homeBtns.signinFormSubmit.text}}
                                  </v-btn>
                                <v-spacer />
                              </v-row>
                            </v-container>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-form>
                  </v-dialog>
                </v-col>
                <v-col cols="4">
                  <v-dialog
                    persistent
                    max-width="40vw"
                    v-model="homeBtns.register.registerForm"
                  >
                    <template v-slot:activator="{ on, attrs}">
                      <v-btn
                        disabled
                        outlined
                        block
                        v-bind="attrs"
                        v-on="on"
                        color="blue lighten-3" 
                      >
                        {{homeBtns.register.text}}
                      </v-btn>
                    </template>

                    <v-form lazy-validation>
                      <v-card class="pa-4" max-width="40vw">
                        <v-row>
                          <v-spacer></v-spacer>
                          <v-btn text icon @click="homeBtns.register.registerForm = false">
                            <v-icon>{{homeBtns.exitFormIcon}}</v-icon>
                          </v-btn>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-text-field
                              label="First name"
                              append-outer-icon="mdi-account"                        
                            ></v-text-field>
                            <v-text-field
                              label="Last name"
                              append-outer-icon="mdi-account"                           
                            ></v-text-field>
                            <v-text-field
                              label="email"
                              type="email"
                              append-outer-icon="mdi-email"                  
                            ></v-text-field>
                            <v-text-field
                              type="password"
                              label="Password"
                              append-outer-icon="mdi-lock"                          
                            ></v-text-field>
                            <v-container>
                              <v-row>
                                <v-spacer />
                                  <v-btn 
                                    type="submit" 
                                    @click="validateRegister"
                                  >
                                    {{homeBtns.registerFormSubmit.text}}
                                  </v-btn>
                                <v-spacer />
                              </v-row>
                            </v-container>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-form>
                  </v-dialog>
                </v-col>
                <v-col cols="2"></v-col>
              </v-row>
              <v-row no-gutters class="mt-1">
                <v-col>
                  <v-btn
                    color="blue lighten-3" 
                    @click="demoMode"
                  >
                    {{homeBtns.demoMode.text}}
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-spacer />
        </v-row>
    </v-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      homeTitle: 'Welcome to GTD',
      homeSubtitles: 'Organize projects and optimize your workflow',
      homeBtns: {
        signIn: {
          text: 'Sign In',
          signInForm: false,
        
        },
        register: {
          text: 'Register',
          registerForm: false,
          registerFormSubmit: false
        },
        demoMode: {
          text: 'Demo Mode'
        },
        exitFormIcon: 'mdi-arrow-left-circle',
        signinFormSubmit: {
          text: 'sign in',
          isSubmited: false,
        },
        registerFormSubmit: {
          text: 'register',
          isSubmited: false,
        },
      }
    }
  },
  methods: {
    validateSignin() {
      // validate
      this.login()
    },
    validateRegister() {
      // validate
      this.login()
    },
    demoMode() {
      // load demo user
      const demoMode = this.$store.getters.demoModeState
      console.log(demoMode)
      if (demoMode) {
        this.login()
      } else {
        const exampleBoard = this.$store.getters.getBoard(123)
        const labels = this.$store.getters.getLabels
        exampleBoard.lists[0].items[0].labels.push(labels[4])
        exampleBoard.lists[0].items[1].labels.push(labels[3])
        exampleBoard.lists[1].items[0].labels.push(labels[0])
        exampleBoard.lists[1].items[0].labels.push(labels[2])
        exampleBoard.lists[2].items[0].labels.push(labels[5])
        this.$store.dispatch('demoModeToggle')
        this.login()
      }
    },
    login() {
      this.$router.push({name: 'boards'})
        .then(() => console.log('resolved'))
        .catch(e => console.log('error: ', e))
    }
  }
}

</script>
