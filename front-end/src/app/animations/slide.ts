import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from "@angular/animations";

export const routeChangeAnimation = trigger("routeTransitionAnimations", [
  transition(
    "search => dice, search => manage, search => generate, search => initiative, search => grid, \
    dice => manage, dice => generate, dice => initiative, dice => grid, \
    manage => generate, manage => initiative, manage => grid, \
    generate => initiative, generate => grid, initiative => grid",
    [
      style({ position: "relative" }),
      query(":enter, :leave", [
        style({
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
        }),
      ]),
      query(":enter", [style({ left: "100%" })]),
      query(":leave", animateChild()),
      group([
        query(":leave", [animate("250ms ease-out", style({ left: "-150%" }))]),
        query(":enter", [animate("250ms ease-out", style({ left: "0%" }))]),
      ]),
      query(":enter", animateChild()),
    ]
  ),
  transition(
    "dice => search, manage => search, generate => search, initiative => search, grid => search, \
    manage => dice, generate => dice, initiative => dice, grid => dice, \
    generate => manage, initiative => manage, grid => manage, \
    initiative => generate, grid => generate, grid => initiative",
    [
      style({ position: "relative" }),
      query(":enter, :leave", [
        style({
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
        }),
      ]),
      query(":enter", [style({ left: "-100%" })]),
      query(":leave", animateChild()),
      group([
        query(":leave", [animate("250ms ease-out", style({ left: "150%" }))]),
        query(":enter", [animate("250ms ease-out", style({ left: "0%" }))]),
      ]),
      query(":enter", animateChild()),
    ]
  ),
]);
