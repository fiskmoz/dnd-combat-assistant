import { Component, OnInit } from "@angular/core";
import { MonsterService } from "src/app/services/monster.service";
import { PlayersService } from "src/app/services/players.service";
import { Monster } from "src/app/interfaces/monster";
import {
  CheckboxChangeEvent,
  RadioButtonChangeEvent,
} from "src/app/interfaces/inputs";

@Component({
  selector: "app-create-encounter",
  templateUrl: "./create-encounter.component.html",
  styleUrls: ["./create-encounter.component.scss"],
})
export class CreateEncounterComponent implements OnInit {
  constructor(
    public monsterService: MonsterService,
    private playerService: PlayersService
  ) {}

  possibleGeoLocations = ["land", "sea", "sky"];
  origins = ["SRD"];
  geolocation = "land";
  locations = ["plain"];
  monsterTotal = "1";
  difficulty = "easy";
  errorMSG = "";

  ngOnInit(): void {
    this.ReadLocalStorage();
  }
  onRandomEncounter() {
    this.monsterService
      .GenerateRandomEncounter(
        this.monsterTotal,
        this.playerService.GetEncounterDifficulty(this.difficulty),
        this.origins,
        null,
        this.locations,
        this.geolocation
      )
      .then(() => {
        this.errorMSG = "";
        if (
          parseInt(this.monsterTotal, 10) !== this.monsterService.monsterTotal
        ) {
          this.errorMSG =
            "Sorry, we could not find exactly " +
            this.monsterTotal +
            " monsters fitting these criterias. Please enable more locations to have increased chances. ";
        }
      });
  }

  refChange(event: CheckboxChangeEvent) {
    if (event.checked && this.origins.indexOf(event.name) === -1) {
      this.origins.push(event.name);
    } else {
      this.origins = this.origins.filter((o) => o !== event.name);
    }
    this.UpdateLocalStorage();
  }

  locationChange(event: CheckboxChangeEvent) {
    if (event.checked && this.locations.indexOf(event.name) === -1) {
      this.locations.push(event.name);
    } else {
      this.locations = this.locations.filter((o) => o !== event.name);
    }
    this.UpdateLocalStorage();
  }
  monsterTotalChange(event: string) {
    this.monsterTotal = event;
    this.UpdateLocalStorage();
    this.monsterService.monsterTotal = parseInt(this.monsterTotal, 10);
  }
  encounterDifficultyChange(event: string) {
    this.difficulty = event;
    this.UpdateLocalStorage();
  }

  geoLocationChange(event: RadioButtonChangeEvent) {
    this.geolocation = this.possibleGeoLocations[parseInt(event.id, 10)];
  }

  private UpdateLocalStorage() {
    localStorage.setItem(
      "encounter_data",
      JSON.stringify({
        origins: this.origins,
        locations: this.locations,
        monsterTotal: this.monsterTotal,
        difficulty: this.difficulty,
      })
    );
  }

  onMonsterDuplicate(monster: Monster) {
    this.monsterService.AddMonster(monster);
  }

  onMonsterRemove(monster: Monster) {
    this.monsterService.RemoveMonster(monster);
  }

  private ReadLocalStorage() {
    let storageJson = localStorage.getItem("encounter_data");
    if (!storageJson) {
      return;
    }
    storageJson = JSON.parse(storageJson);
    if (!!storageJson.hasOwnProperty("origins")) {
      this.origins = storageJson["origins"];
    }
    if (!!storageJson.hasOwnProperty("locations")) {
      this.locations = storageJson["locations"];
    }
    if (!!storageJson.hasOwnProperty("monsterTotal")) {
      this.monsterTotal = storageJson["monsterTotal"];
      this.monsterService.monsterTotal = parseInt(this.monsterTotal, 10);
    }
    if (!!storageJson.hasOwnProperty("difficulty")) {
      this.difficulty = storageJson["difficulty"];
    }
  }
}
