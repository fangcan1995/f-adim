import { trigger, state, transition, animate, style } from '@angular/core';

export class Animations {
    public static slideInOut = trigger('slideInOut', [
        state('false', style({ height: '0px' })),
        state('true', style({ height: '*' })),
        transition('false => true', animate('300ms ease-in')),
        transition('true => false', animate('300ms ease-out'))
    ]);
}