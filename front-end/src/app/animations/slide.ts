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
    "search => player-tools, search => generate, search => initiative, search => grid, player-tools => generate, player-tools => initiative, player-tools => grid, generate => initiative, generate => grid, initiative => grid",
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
        query(":leave", [animate("200ms ease-out", style({ left: "-150%" }))]),
        query(":enter", [animate("300ms ease-out", style({ left: "0%" }))]),
      ]),
      query(":enter", animateChild()),
    ]
  ),
  transition(
    "player-tools => search, generate => search, initiative => search, grid => search, generate => player-tools, initiative => player-tools, player-tools => grid, initiative => generate, grid => generate, grid => initiative",
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
        query(":leave", [animate("300ms ease-out", style({ left: "150%" }))]),
        query(":enter", [animate("300ms ease-out", style({ left: "0%" }))]),
      ]),
      query(":enter", animateChild()),
    ]
  ),
]);
