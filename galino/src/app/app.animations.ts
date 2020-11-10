import {
  animate,
  query,
  state,
  style,
  transition,
  trigger
} from '@angular/animations'

const routeAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        height: '100%',
        width: '100%',
        opacity: 0,
      })
    ]),
    query(':enter', [
      animate('1s ease', style({
        position: 'absolute',
        height: '100%',
        width: '100%',
        opacity: 1,
      }))
    ])
  ])
])

const expandHeader = trigger('expandHeader', [
  state('true', style({
    transform: 'translateX(0)'
  })),
  state('false', style({
    transform: 'translateX(-100%)'
  })),
  transition('* => *', animate('225ms cubic-bezier(0.65, 0, 0.35, 1)'))
])

export {routeAnimations, expandHeader}