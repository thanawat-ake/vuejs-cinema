import { addClass, removeClass} from "./helpers";

let mouseOverHandler = function(event) {//an argument event
    let span = event.target.parentNode.getElementsByTagName('SPAN')[0];
    addClass(span, 'tooltip-show');
};

let mouseOutHandler = function(event) {
    let span = event.target.parentNode.getElementsByTagName('SPAN')[0];
    removeClass(span, 'tooltip-show');
};

export default {
    install(Vue){ //Vue instance
        Vue.directive('tooltip', {
            bind(el, bindings){ //This is hook event, bindings are any values that you pass to your tooltip
                let span = document.createElement('SPAN');
                let text = document.createTextNode(`Seats available: ${bindings.value.seats}`);
                span.appendChild(text);
                addClass(span, 'tooltip');
                el.appendChild(span);
                let div = el.getElementsByTagName('DIV')[0]; //the child of this div tooltip-wrapper
                div.addEventListener('mouseover', mouseOverHandler);
                div.addEventListener('mouseout', mouseOutHandler);
                div.addEventListener('touchstart', mouseOverHandler); //for mobile view
                div.addEventListener('touchend', mouseOutHandler); //for mobile view
            },
            unbind(el){
                let div = el.getElementsByTagName('DIV')[0]; //the child of this div tooltip-wrapper
                div.removeEventListener('mouseover', mouseOverHandler);
                div.removeEventListener('mouseout', mouseOutHandler);
                div.removeEventListener('touchstart', mouseOverHandler); //for mobile view
                div.removeEventListener('touchend', mouseOutHandler); //for mobile view
            }
        });
    }
}