import Overview from '../components/Overview.vue';
import Detail from '../components/Detail.vue';

export default [
    { path: '/', component: Overview, name: 'home' },
    { path: '/movie/:id', component: Detail, name: 'movie' }, //this segment of the route :id is a parameter.
    { path: '*', redirect: { name: 'home' } }
];