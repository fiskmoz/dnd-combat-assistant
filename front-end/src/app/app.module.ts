import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HomePageComponent } from "./components/pages/home-page/home-page.component";
import { ButtonComponent } from "./components/inputs/button/button.component";
import { RadioButtonsComponent } from "./components/inputs/radio-buttons/radio-buttons.component";
import { CheckboxComponent } from "./components/inputs/checkbox/checkbox.component";
import { DropdownComponent } from "./components/inputs/dropdown/dropdown.component";
import { TextboxComponent } from "./components/inputs/textbox/textbox.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { PlayersService } from "./services/players.service";
import { RouterModule } from "@angular/router";
import { CreatePlayerWrapperComponent } from './components/player-creation/create-player-wrapper/create-player-wrapper.component';
import { CreatePlayerComponent } from './components/player-creation/create-player/create-player.component';

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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
  ],
  providers: [PlayersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
