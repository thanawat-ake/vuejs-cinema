import Vue from 'vue'; // Webpack knows it's in the node modules directory
import './style.scss';
import genres from './util/genres';

new Vue({ // Vue instance
    el: '#app',
    components: { // register 2 custom components
        'movie-list': {
            template: `<div id="movie-list">
                        <div v-for="movie in movies" class="movie">{{ movie.title }}</div>
                        </div>`,
            data() {
                return {
                    movies: [ //movie items
                        { title: 'Pulp Fiction'},
                        { title: 'Home Alone'},
                        { title: 'Austin Powers'}
                    ]
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
                                    <check-filter v-for="genre in genres"></check-filter>
                                </div>
                        </div>`,
            components: {
                'check-filter': {
                    template: `<div>Filter</div>`
                }
            }
        }
    }
});