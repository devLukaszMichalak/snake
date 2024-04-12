import { group, query, style, transition, trigger, useAnimation } from '@angular/animations';
import { bounceInLeft, bounceOutRight } from 'ng-animate';

export const provideBounceRouteAnimation = (styleOptions: CSS) => trigger('bounceRouteAnimation', [
  transition('* <=> *', [
    query(':enter, :leave', style(styleOptions), {optional: true}),
    group([
      query(':enter', [
        useAnimation(bounceInLeft, {params: {timing: 1}})], {optional: true}),
      query(':leave', [
        useAnimation(bounceOutRight, {params: {timing: 0.5}})], {optional: true})
    ])
  ])
]);

type CSS = { [key: string]: string | number; }
