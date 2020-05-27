import { fromEvent } from 'rxjs';
import { map, pluck, tap,  delay, filter, catchError } from 'rxjs/operators';

const button$ = fromEvent(document, 'keydown');

const transformed$ = button$.pipe(
    pluck("keyCode"),
    map(code => {
        const element = document.querySelector(`div[data-key='${code}']`) || {};
        const audio = document.querySelector(`audio[data-key='${code}']`) || {};
        element.classList.add('playing');
        audio.currentTime = 0;
        audio.play();
        return element;
    }),
    delay(70),
    tap(element => {
        element.classList.remove('playing');
    }),
    catchError(() => transformed$)
);

transformed$.subscribe();

