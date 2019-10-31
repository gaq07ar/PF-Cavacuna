import { Component, OnInit } from "@angular/core";
import { AuthService } from "./services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  name = "proyecto Cavacuna";
  temp1 = "17°";
  temp2 = "8°";
  temp3 = "12°";

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.localAuthSetup();
    this.auth.handleAuthCallback();
  }
}
