<template>
    <div id="movie-list">
        <div v-for="movie in filteredMovies" class="movie">{{ movie.title }}</div>
    </div>
</template>
<script>
    import genres from '../util/genres';

    export default {
        data() {
            return {
                movies: [ //movie items (dummy data)
                    { title: 'Kill Bill', genre: genres.CRIME},
                    { title: 'Home Alone', genre: genres.COMEDY},
                    { title: 'Austin Powers 2', genre: genres.COMEDY}
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
    }
</script>