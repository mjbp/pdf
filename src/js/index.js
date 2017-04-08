//import './polyfills';
import styles from '../css/app.css';
import CONSTANTS from './constants';

const onDOMContentLoadedTasks = [
];

if('addEventListener' in window)
    !!onDOMContentLoadedTasks.length && window.addEventListener('DOMContentLoaded', () => { onDOMContentLoadedTasks.forEach((fn) => fn()); });
