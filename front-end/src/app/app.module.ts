import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HomePageComponent } from "./components/pages/home-page/home-page.component";
import { ButtonComponent } from "./components/inputs/button/button.component";
import { ConfirmationModalComponent } from "./components/inputs/confirmation-modal/confirmation-modal.component";
import { RadioButtonsComponent } from "./components/inputs/radio-buttons/radio-buttons.component";
import { CheckboxComponent } from "./components/inputs/checkbox/checkbox.component";
import { DropdownComponent } from "./components/inputs/dropdown/dropdown.component";
import { TextboxComponent } from "./components/inputs/textbox/textbox.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ButtonComponent,
    ConfirmationModalComponent,
    RadioButtonsComponent,
    CheckboxComponent,
    DropdownComponent,
    TextboxComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
