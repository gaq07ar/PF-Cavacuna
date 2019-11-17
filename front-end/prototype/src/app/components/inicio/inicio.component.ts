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

  //hardcodeado
  admin = true;

  devices: Device[] = [];
  isUserVerified: boolean;

  constructor(public auth: AuthService, private http: HttpClient) {}

  ngOnInit() {
    // console.log(this.auth.userProfile$);
    this.isVerified();
    this.fetchDevices();
    if (!this.isUserVerified) {
      document.getElementById("modalVerification").click();
    }
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

  private isVerified() {
    this.auth.userProfile$.subscribe(userInfo => {
      if (userInfo.hasOwnProperty("email_verified")) {
        this.isUserVerified = userInfo.email_verified;
      }
    });
  }
}
