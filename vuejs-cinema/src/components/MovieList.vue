<template>
    <div id="movie-list">
        <div v-if="filteredMovies.length">
            <movie-item v-for="movie in filteredMovies"
                        v-bind:movie="movie.movie"
                        v-bind:sessions="movie.sessions"
                        v-bind:day="day"
                        v-bind:time="time">
            </movie-item>
        </div>
        <div v-else-if="movies.length" class="no-results">
            {{ noResults }}
        </div>
        <div v-else class="no-results">
            Loading..
        </div>
    </div>
</template>
<script>
    import genres from '../util/genres';
    import times from '../util/times';
    import MovieItem from './MovieItem.vue';

    export default {
        props: [ 'genre', 'time', 'movies', 'day' ],
        methods: {
            moviePassesGenreFilter(movie){
                if(!this.genre.length){ // length is zero or no any genre selected
                    return true;
                }else{
                    let movieGenres = movie.movie.Genre.split(", "); //Animation, Comedy, Fantasy
                    let matched = true;
                    this.genre.forEach(genre => {
                        if (movieGenres.indexOf(genre) === -1) { //indexOf it returns -1 if it's not there otherwise it returns its position.
                            matched = false;
                        }
                    });
                    return matched;
                }
            },
            sessionPassesTimeFilter(session){
                if(!this.day.isSame(this.$moment(session.time), 'day')){
                    return false;
                } else if(this.time.length === 0 || this.time.length === 2) {
                    return true;
                } else if (this.time[0] === times.AFTER_6PM) {
                    return this.$moment(session.time).hour() >= 18;
                } else {
                    return this.$moment(session.time).hour() < 18;
                }
            }
        },
        computed: { //computed properties
            filteredMovies(){
                return this.movies
                    .filter(this.moviePassesGenreFilter) //find that genre in all movies
                    .filter(movie => movie.sessions.find(this.sessionPassesTimeFilter));
            },
            noResults(){
                let times = this.time.join(', ');
                let genres = this.genre.join(', ');
                //If times has length basically and genres has length then we want to do a comma space otherwise an empty string.
                return `No results for ${times}${times.length && genres.length ? ', ' : ''}${genres}.`;
            }
        },
        components: {
            MovieItem
        }
    }
</script>