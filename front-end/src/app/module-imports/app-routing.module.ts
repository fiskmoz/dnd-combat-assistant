import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GenerateEncounterViewComponent } from "src/app/components/views/generate-encounter-view/generate-encounter-view.component";
import { GridViewComponent } from "src/app/components/views/grid-view/grid-view.component";
import { InitiativeViewComponent } from "src/app/components/views/initiative-view/initiative-view.component";
import { PlayerToolsViewComponent } from "src/app/components/views/player-tools-view/player-tools-view.component";
import { SearchViewComponent } from "src/app/components/views/search-view/search-view.component";

const routes: Routes = [
  {
    path: "generate",
    component: GenerateEncounterViewComponent,
  },
  {
    path: "search",
    component: SearchViewComponent,
  },
  {
    path: "initiative",
    component: InitiativeViewComponent,
  },
  {
    path: "grid",
    component: GridViewComponent,
  },
  {
    path: "player-tools",
    component: PlayerToolsViewComponent,
  },
  {
    path: "**",
    component: SearchViewComponent,
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
