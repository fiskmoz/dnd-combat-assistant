import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GridViewComponent } from "src/app/components/views/grid-view/grid-view.component";
import { InitiativeViewComponent } from "src/app/components/views/initiative-view/initiative-view.component";
import { SearchViewComponent } from "src/app/components/views/search-view/search-view.component";
import { CreateEncounterComponent } from "../components/views/create-encounter/create-encounter.component";
import { DiceViewComponent } from "../components/views/dice-view/dice-view.component";
import { ManageComponent } from "../components/views/manage/manage.component";

const routes: Routes = [
  {
    path: "generate",
    component: CreateEncounterComponent,
    data: { animationState: "generate" },
  },
  {
    path: "manage",
    component: ManageComponent,
    data: { animationState: "manage" },
  },
  {
    path: "search",
    component: SearchViewComponent,
    data: { animationState: "search" },
  },
  {
    path: "initiative",
    component: InitiativeViewComponent,
    data: { animationState: "initiative" },
  },
  {
    path: "grid",
    component: GridViewComponent,
    data: { animationState: "grid" },
  },
  {
    path: "dice",
    component: DiceViewComponent,
    data: { animationState: "dice" },
  },
  {
    path: "**",
    redirectTo: "search",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
