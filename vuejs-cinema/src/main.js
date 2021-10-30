import Vue from 'vue'; // Webpack knows it's in the node modules directory
import './style.scss';

new Vue({
    el: '#app',
    data: {
        msg: "Hello World"
    }
});