import Vue from 'vue'; // Webpack knows it's in the node modules directory
import './style.scss';

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

import VueResource from 'vue-resource';
Vue.use(VueResource); // use API method

import moment from 'moment-timezone';
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } }); //data property of the root instance

import { checkFilter } from "./util/bus"; //check filter is a variable in the scope of this whole file.
const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus } });
new Vue({ // Vue instance
    el: '#app',
    data: { //data properties
      genre: [],
      time: [],
      movies: [],
      moment,
      day: moment(),
      bus //any component can access that bus
    },
    components: { // register 2 custom components
        MovieList,
        MovieFilter
    },
    created() {
        this.$http.get('/api').then(response => {
           this.movies = response.data;
        });
        this.$bus.$on('check-filter', checkFilter.bind(this)); //it's no longer this. it's just check filter because the this has access to that scope.
    }
});