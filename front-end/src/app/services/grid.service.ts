import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class GridService {
  public isAuthenticated = false;
  public password: string;
  public gridid: string;
  public status: string;

  constructor(private firestore: AngularFirestore, private http: HttpClient) {
    let localData = null;
    try {
      localData = JSON.parse(localStorage.getItem("AuthenticatedGrid"));
    } catch (e) {}
    if (localData == null) {
      this.isAuthenticated = false;
      localStorage.removeItem("AuthenticatedGrid");
      return;
    }
    this.gridid = localData.gridid;
    this.isAuthenticated = !!this.gridid;
  }

  UpdateGrid(data: string) {
    const apiUrl =
      "/api/grids/update?password=" + this.password + "&gridid=" + this.gridid;
    this.http.post(apiUrl, data).subscribe((data: JSON) => {
      this.isAuthenticated = (data as any).response === "success";
    });
  }
  Authentivate() {
    const apiUrl =
      "/api/grids/authenticate?password=" +
      this.password +
      "&gridid=" +
      this.gridid;
    this.http.get(apiUrl).subscribe(
      (data: JSON) => {
        this.isAuthenticated = (data as any).response === "success";
        localStorage.setItem(
          "AuthenticatedGrid",
          JSON.stringify({ gridid: this.gridid, password: this.password })
        );
      },
      (err: Error) => {
        this.status = (err as any).error;
        localStorage.removeItem("AuthenticatedGrid");
      }
    );
  }

  Leave() {
    this.isAuthenticated = false;
    localStorage.removeItem("AuthenticatedGrid");
  }

  GetGridChanges() {
    if (!this.isAuthenticated) {
      return;
    }
    return this.firestore
      .collection("Grids")
      .doc(this.gridid)
      .snapshotChanges();
  }
}
