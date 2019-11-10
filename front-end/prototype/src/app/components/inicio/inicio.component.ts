import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { HttpClient } from "@angular/common/http";
import { Device } from "../shared/device.model";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.component.html",
  styleUrls: ["./inicio.component.css"]
})
export class InicioComponent implements OnInit {
  devices: Device[] = [];

  constructor(public auth: AuthService, private http: HttpClient) {}

  ngOnInit() {
    //console.log(this.auth.userProfile$);
    this.fetchDevices();
  }

  private fetchDevices() {
    this.http
      .get<Device[]>("http://" + environment.cavacunaAPIAddress + "/api/device")
      .pipe(
        map(responseData => {
          const deviceArray: Device[] = [];
          for (const element of responseData) {
            deviceArray.push(element);
          }
          return deviceArray;
        })
      )
      .subscribe(devices => {
        this.devices = devices;
      });
  }
}
