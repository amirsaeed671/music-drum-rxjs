import { fromEvent } from 'rxjs';
import { map, pluck, tap,  delay, filter } from 'rxjs/operators';

const button$ = fromEvent(document, 'keydown');

const transformed$ = button$.pipe(
    pluck("keyCode"),
    map(code => {
        try {
            const element = document.querySelector(`div[data-key='${code}']`) || {};
            const audio = document.querySelector(`audio[data-key='${code}']`) || {};
            element.classList.add('playing');
            audio.currentTime = 0;
            audio.play();
            return element;
        } catch(error) {
            return null;
        }
    }),
    delay(70),
    filter(element => !!element),
    tap(element => {
        element.classList.remove('playing');
    }),
);

transformed$.subscribe();

