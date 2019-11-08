import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { HttpClient } from "@angular/common/http";
import { Device } from "../shared/device.model";
import { map } from "rxjs/operators";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.component.html",
  styleUrls: ["./inicio.component.css"]
})
export class InicioComponent implements OnInit {
  devices: Device[] = [
    new Device(1234, 4, true, "Testing", 2, 8),
    new Device(5768, 4, true, "Testing", 2, 8),
    new Device(9923, 4, true, "Testing", 2, 8),
    new Device(9921, 4, true, "Testing", 2, 8)
  ];

  constructor(public auth: AuthService, private http: HttpClient) {}

  ngOnInit() {
    //console.log(this.auth.userProfile$);
    this.fetchDevices();
  }

  private fetchDevices() {
    this.http.get("http://localhost:3000/api/device").subscribe(posts => {
      console.log(posts);
    });
  }
}
