import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AppRoutingModule } from "../module-imports/app-routing.module";
import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ButtonComponent } from "./components/inputs/button/button.component";
import { RadioButtonsComponent } from "./components/inputs/radio-buttons/radio-buttons.component";
import { CheckboxComponent } from "./components/inputs/checkbox/checkbox.component";
import { DropdownComponent } from "./components/inputs/dropdown/dropdown.component";
import { TextboxComponent } from "./components/inputs/textbox/textbox.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { PlayersService } from "./services/players.service";
import { RouterModule } from "@angular/router";
import { MonsterService } from "./services/monster.service";
import { FloorPipe } from "./pipes/floor.pipe";
import { TypeaheadComponent } from "./components/inputs/typeahead/typeahead.component";
import { HeaderComponent } from "./components/layout/header/header.component";
import { AdjustComponent } from "./components/inputs/adjust/adjust.component";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { DiceComponent } from "./components/inputs/dice/dice.component";
import { CreatePlayerWrapperComponent } from "./components/layout/create-player-wrapper/create-player-wrapper.component";
import { CreatePlayerComponent } from "./components/layout/create-player/create-player.component";
import { CreateEncounterComponent } from "./components/layout/create-encounter/create-encounter.component";
import { MonsterCardComponent } from "./components/layout/monster-card/monster-card.component";
import { MonsterSearchComponent } from "./components/layout/monster-search/monster-search.component";
import { InitiativeViewComponent } from "./components/views/initiative-view/initiative-view.component";
import { InitiativeEntityComponent } from "./components/layout/initiative-entity/initiative-entity.component";
import { GridViewComponent } from "./components/views/grid-view/grid-view.component";
import { GridComponent } from "./components/layout/grid/grid.component";
import { InitiativeMonsterComponent } from "./components/layout/initiative-monster/initiative-monster.component";
import { PlayerToolsViewComponent } from "./components/views/player-tools-view/player-tools-view.component";
import { PlayerDicesComponent } from "./components/layout/player-dices/player-dices.component";
import { SpellCardComponent } from "./components/layout/spell-card/spell-card.component";
import { SearchViewComponent } from "./components/views/search-view/search-view.component";
import { GenerateEncounterViewComponent } from "./components/views/generate-encounter-view/generate-encounter-view.component";
import { SpellSearchComponent } from "./components/layout/spell-search/spell-search.component";

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    RadioButtonsComponent,
    CheckboxComponent,
    DropdownComponent,
    TextboxComponent,
    CreatePlayerWrapperComponent,
    CreatePlayerComponent,
    CreateEncounterComponent,
    MonsterCardComponent,
    FloorPipe,
    MonsterSearchComponent,
    TypeaheadComponent,
    HeaderComponent,
    InitiativeViewComponent,
    AdjustComponent,
    InitiativeEntityComponent,
    GridViewComponent,
    GridComponent,
    InitiativeMonsterComponent,
    PlayerToolsViewComponent,
    PlayerDicesComponent,
    DiceComponent,
    MonsterSearchComponent,
    SpellCardComponent,
    SearchViewComponent,
    GenerateEncounterViewComponent,
    SpellSearchComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    DragDropModule,
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
  ],
  providers: [PlayersService, MonsterService],
  bootstrap: [AppComponent],
})
export class AppModule {}
