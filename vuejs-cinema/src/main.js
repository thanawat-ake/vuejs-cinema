import Vue from 'vue'; // Webpack knows it's in the node modules directory
import './style.scss';

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

import VueResource from 'vue-resource';
Vue.use(VueResource); // use API method

import moment from 'moment-timezone';
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } }); //data property of the root instance

new Vue({ // Vue instance
    el: '#app',
    data: {
      genre: [],
      time: [],
      movies: [],
      moment,
      day: moment()
    },
    methods: {
        checkFilter(category, title, checked){
            if(checked){
                this[category].push(title);
            }else{
                let index = this[category].indexOf(title);
                if(index > -1){
                    this[category].splice(index, 1); //cut 1 item at position index.
                }
            }
        }
    },
    components: { // register 2 custom components
        MovieList,
        MovieFilter
    },
    created() {
        this.$http.get('/api').then(response => {
           this.movies = response.data;
        });
    }
});