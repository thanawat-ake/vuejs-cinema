<template>
    <div id="movie-list">
        <div v-if="filteredMovies.length">
            <movie-item v-for="movie in filteredMovies" v-bind:movie="movie.movie"></movie-item>
        </div>
        <div v-else-if="movies.length" class="no-results">
            No results.
        </div>
        <div v-else class="no-results">
            Loading..
        </div>
    </div>
</template>
<script>
    import genres from '../util/genres';
    import MovieItem from './MovieItem.vue';

    export default {
        props: [ 'genre', 'time', 'movies' ],
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
            }
        },
        computed: {
            filteredMovies(){
                return this.movies.filter(this.moviePassesGenreFilter); //find that genre in all movies
            }
        },
        components: {
            MovieItem
        }
    }
</script>