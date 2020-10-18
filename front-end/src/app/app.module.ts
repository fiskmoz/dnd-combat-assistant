import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AppRoutingModule } from "../module-imports/app-routing.module";
import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HomePageComponent } from "./components/layout/home-page/home-page.component";
import { ButtonComponent } from "./components/inputs/button/button.component";
import { RadioButtonsComponent } from "./components/inputs/radio-buttons/radio-buttons.component";
import { CheckboxComponent } from "./components/inputs/checkbox/checkbox.component";
import { DropdownComponent } from "./components/inputs/dropdown/dropdown.component";
import { TextboxComponent } from "./components/inputs/textbox/textbox.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { PlayersService } from "./services/players.service";
import { RouterModule } from "@angular/router";
import { CreatePlayerWrapperComponent } from "./components/create-player-wrapper/create-player-wrapper.component";
import { CreatePlayerComponent } from "./components/create-player/create-player.component";
import { MonsterService } from "./services/monster.service";
import { CreateEncounterComponent } from "./components/create-encounter/create-encounter.component";
import { FloorPipe } from "./pipes/floor.pipe";
import { TypeaheadComponent } from "./components/inputs/typeahead/typeahead.component";
import { HeaderComponent } from "./components/layout/header/header.component";
import { InitiativeComponent } from "./components/initiative/initiative.component";
import { AdjustComponent } from "./components/inputs/adjust/adjust.component";
import { InitiativeEntityComponent } from "./components/initiative-entity/initiative-entity.component";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { GridControllerComponent } from "./components/grid-controller/grid-controller.component";
import { GridComponent } from "./components/grid/grid.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { InitiativeMonsterComponent } from "./components/initiative-monster/initiative-monster.component";
import { PlayerToolsControllerComponent } from "./components/player-tools-controller/player-tools-controller.component";
import { PlayerDicesComponent } from "./components/player-dices/player-dices.component";
import { DiceComponent } from "./components/inputs/dice/dice.component";
import { SpellSearchComponent } from "./components/search/spell-search/spell-search.component";
import { SpellCardComponent } from "./components/cards/spell-card/spell-card.component";
import { MonsterCardComponent } from "./components/cards/monster-card/monster-card.component";
import { MonsterSearchComponent } from "./components/search/monster-search/monster-search.component";
import { SearchViewComponent } from './components/search/search-view/search-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
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
    InitiativeComponent,
    AdjustComponent,
    InitiativeEntityComponent,
    GridControllerComponent,
    GridComponent,
    InitiativeMonsterComponent,
    PlayerToolsControllerComponent,
    PlayerDicesComponent,
    DiceComponent,
    SpellSearchComponent,
    SpellCardComponent,
    SearchViewComponent,
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
