import Vue from 'vue'; // Webpack knows it's in the node modules directory
import './style.scss';
import genres from './util/genres';

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
        'movie-list': {
            template: `<div id="movie-list">
                        <div v-for="movie in filteredMovies" class="movie">{{ movie.title }}</div>
                        </div>`,
            data() {
                return {
                    movies: [ //movie items
                        { title: 'Pulp Fiction', genre: genres.CRIME},
                        { title: 'Home Alone', genre: genres.COMEDY},
                        { title: 'Austin Powers', genre: genres.COMEDY}
                    ]
                }
            },
            props: [ 'genre', 'time' ],
            methods: {
                moviePassesGenreFilter(movie){
                    // console.log("genre:"+genre);
                    if(!this.genre.length){ // length is zero
                        return true;
                    }else{
                        return this.genre.find(genre => movie.genre === genre);
                    }
                }
            },
            computed: {
                filteredMovies(){
                    return this.movies.filter(this.moviePassesGenreFilter); //find that genre in each movies
                }
            }
        },
        'movie-filter': {
            data(){ //data function
                return { //return an object
                    genres
                }
            },
            template: `<div id="movie-filter">
                            <h2>Filter results</h2>
                                <div class="filter-group">
                                    <check-filter v-for="genre in genres" v-bind:title="genre" v-on:check-filter="checkFilter"></check-filter>
                                </div>
                        </div>`,
            methods: {
                checkFilter(category, title, checked) {
                    this.$emit('check-filter', category, title, checked);
                }
            },
            components: {
                'check-filter': {
                    data() {
                        return {
                            checked: false
                        }
                    },
                    props: [ 'title' ],
                    template: `<div v-bind:class="{ 'check-filter': true, active: checked }" v-on:click="checkFilter">
                                <span class="checkbox"></span>
                                <span class="check-filter-title">{{ title }}</span>
                                </div>`,
                    methods: {
                        checkFilter(){
                            this.checked = !this.checked; //checked is true, none check is false
                            this.$emit('check-filter', 'genre', this.title, this.checked);
                        }
                    }
                }
            }
        }
    }
});