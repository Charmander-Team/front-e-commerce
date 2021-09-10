<template>
    <v-main>
    <v-container>
        <v-row justify="center">
            <v-col id="header" cols="12" lg="12" md="12" xs="10"> 
               <div class="justify-start">
                   <router-link to="/">
                        <v-img max-width="200" height="auto" src="../assets/logo-pokeshop.svg"></v-img>
                   </router-link>
               </div>
            </v-col>
            <v-col cols="12" lg="12" md="12">
               <v-card class="mb-lg-5 mb-md-5" elevation="20" color="rgba(204, 204, 204, 0.9)" rounded="xl">
                   <v-row>
                       <v-col class="position-relative jutify-content-center" cols="2" lg="2" md="2">
                            <Menu/>
                       </v-col>
                       <v-col cols="10" lg="10">
                           <v-row>
                               <v-col cols="12" lg="12"> 
                                   <!-- Shop -->
                                   <v-layout class="jutify-content-end pr-4" min-height="auto">
                                        <Panier/>
                                        <Connexion/>
                                   </v-layout>
                               </v-col>
                               <v-col cols="12" lg="12" md="12"> 
                                   <!-- Carrousel -->
                                   <v-card rounded="xl" class="mx-6" color="#ffffff">
                                       <v-card-title class="justify-center text-h4">Règles du Jeu de Cartes à Collectionner</v-card-title>
                                       <v-card-subtitle class="text-h6" style="text-align:center;">Les concepts de base du JCC Pokémon <br>Comment gagner ?</v-card-subtitle>
                                       <v-card-text>
                                        Dans le JCC Pokémon, vos Pokémon affrontent les Pokémon de votre adversaire.
                                        Le premier joueur qui récupère toutes ses cartes Récompense gagne. Vous pouvez
                                        également remporter la partie si votre adversaire n’a plus aucun Pokémon en jeu,
                                        ou s’il ne lui reste aucune carte à piocher au début de son tour.
                                       </v-card-text>
                                       <v-card-subtitle class="text-decoration-underline">Les types d’Énergies</v-card-subtitle>
                                       <v-card-text>
                                            Un Pokémon met son adversaire K.O. en utilisant des attaques ou des talents. Pour pouvoir lancer leurs attaques, les Pokémon ont
                                            besoin de cartes Énergie. Dans le JCC Pokémon, il existe onze types d’Énergies correspondant aux types des Pokémon. (Veuillez noter
                                            que la série Épée et Bouclier ne contient pas de cartes Pokémon de type Fée ; vous trouverez celles-ci dans les extensions plus anciennes.)
                                            Chaque type d’Énergie permet de lancer différentes attaques. Découvrez les types correspondant à votre personnalité ! Voici les types d’Énergies :
                                            <v-container>
                                                <v-row>
                                                    <v-col v-for="(item,i) in carteEnergie" :key="i" cols="12" md="4" lg="4">
                                                        <div class="d-flex">
                                                            <img :src="item.img" height="100px">
                                                            <div class="pl-4" style="font-size:12px;line-height:12px;">
                                                                <span class="text-decoration-underline">{{item.titre}}</span> :<br><br>
                                                                {{item.desc}}
                                                            </div>
                                                        </div>
                                                    </v-col>
                                                </v-row>
                                            </v-container>
                                       </v-card-text>
                                       <v-card-subtitle class="text-decoration-underline">Les Pokémon :</v-card-subtitle>
                                       <v-card-text>
                                           <div class="d-flex">
                                                <img src="@/assets/pokemon-type-carte.jpg" height="150px" alt="">
                                                <div class="pl-4">
                                                    Bien entendu, les cartes les plus importantes sont les Pokémon ! La plupart de ces cartes sont des Pokémon de base, de Niveau 1 ou de
                                                    Niveau 2. Les Pokémon de Niveau 1 et de Niveau 2 sont également appelés cartes Évolution. Dans le coin supérieur gauche vous verrez
                                                    le niveau d’Évolution du Pokémon, ainsi que le Pokémon dont il est l’Évolution (le cas échéant).
                                                </div>
                                           </div>
                                       </v-card-text>
                                       <v-card-subtitle class="text-decoration-underline">Les cartes Dresseur :</v-card-subtitle>
                                       <v-card-text>
                                           <div class="d-flex">
                                               <img src="@/assets/pokemon-type-dresseur.jpg" height="150px" alt="">
                                                <div class="pl-4">
                                                        Les cartes Dresseur représentent les Objets,
                                                        les Supporters et les Stades qu’un Dresseur peut
                                                        utiliser en combat. La sous-catégorie de Dresseur
                                                        est indiquée dans le coin supérieur droit, et toute
                                                        règle spéciale à cette sous-catégorie se trouve
                                                        en bas de la carte.
                                                </div>
                                           </div>
                                       </v-card-text>
                                   </v-card>
                               </v-col>
                           </v-row>
                       </v-col>
                   </v-row>
               </v-card>
            </v-col>
            <CreerCompte/>
        </v-row>
        <ScrollDown/>
    </v-container>
     <Footer/>
    </v-main>
</template>
<script>

import Menu from '../components/Menu'
import Connexion from '../components/Connexion'
import Panier from '../components/Panier'
import CreerCompte from '../components/CreerCompte'
import Footer from '../components/Footer'
import ScrollDown from '../components/ScrollDown'

export default {
    components:{
      Menu,
      Connexion,
      Panier,
      CreerCompte,
      Footer,
      ScrollDown,
      },
      data:()=>{
          return {
            carteEnergie:[
                {
                    img:require("@/assets/pokemon-energie-plante.jpg"),
                    titre:"Plante",
                    desc:`Les Pokémon de type Plante possèdent souvent des attaques leur permettant de se soigner ou d’empoisonner leurs adversaires.`
                },
                {
                    img:require("@/assets/pokemon-energie-feu.jpg"),
                    titre:"Feu",
                    desc:`Les attaques des Pokémon de type Feu sont puissantes ! Elles peuvent brûler l’adversaire, mais ont besoin de temps pour se recharger.`
                },
                {
                    img:require("@/assets/pokemon-energie-eau.jpg"),
                    titre:"Eau",
                    desc:`Les Pokémon de type Eau peuvent manipuler l’Énergie et déplacer les Pokémon de l’équipe adverse.`
                },
                {
                    img:require("@/assets/pokemon-energie-electrique.jpg"),
                    titre:"Electrique",
                    desc:`Les Pokémon de type Électrique peuvent remettre en jeu de l’Énergie depuis la pile de défausse, et peuvent également paralyser leurs adversaires.`
                },
                {
                    img:require("@/assets/pokemon-energie-spy.jpg"),
                    titre:"Spy",
                    desc:`Les Pokémon de type Psy ont de formidables pouvoirs spéciaux ! Leurs adversaires se retrouvent souvent Endormis, Confus ou Empoisonnés.`
                },
                {
                    img:require("@/assets/pokemon-energie-combat.jpg"),
                    titre:"Combat",
                    desc:`Les Pokémon de type Combat peuvent prendre plus de risques pour causer plus de dégâts et peuvent profiter du lancer de pièce pour enchaîner les dégâts.`
                },
                {
                    img:require("@/assets/pokemon-energie-obscurite.jpg"),
                    titre:"Obscurité",
                    desc:`Les Pokémon de type Obscurité, avec leurs attaques sournoises, obligent souvent l’adversaire à défausser des cartes. Ils peuvent aussi empoisonner les Pokémon de l’adversaire.`
                },
                {
                    img:require("@/assets/pokemon-energie-metal.jpg"),
                    titre:"Métal",
                    desc:`Les Pokémon de type Métal peuvent résister aux attaques plus longtemps que la plupart des autres Pokémon.`
                },
                {
                    img:require("@/assets/pokemon-energie-fee.jpg"),
                    titre:"Fée",
                    desc:`Grâce à des astuces qui leur sont propres, les Pokémon de type Fée sont capables d’affaiblir les attaques des Pokémon adverses. Avec la sortie d’Épée et Bouclier, vous verrez que des Pokémon qui étaient de type Fée jusqu’alors sont maintenant des Pokémon de type Psy.`
                },
                {
                    img:require("@/assets/pokemon-energie-dragon.jpg"),
                    titre:"Dragon",
                    desc:`Les Pokémon de type Dragon disposent d’attaques très puissantes mais ont souvent besoin de deux types d’Énergies pour les utiliser.`
                },
                {
                    img:require("@/assets/pokemon-energie-incolore.jpg"),
                    titre:"Incolore",
                    desc:`Les Pokémon de type Incolore disposent d’attaques variées et peuvent être utilisés dans n’importe quel deck.`
                },
            ]
          }
      }
    }
</script>