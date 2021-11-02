import Vue from 'vue'; // Webpack knows it's in the node modules directory
import './style.scss';

import MovieList from "./components/MovieList.vue";
import MovieFilter from "./components/MovieFilter.vue";

new Vue({ // Vue instance
    el: '#app',
    data: {
      genre: [],
      time: []
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
    }
});