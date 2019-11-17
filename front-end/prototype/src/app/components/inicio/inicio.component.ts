import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { HttpClient } from "@angular/common/http";
import { Device } from "../shared/device.model";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { DevicesService } from "src/app/services/devices.service";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.component.html",
  styleUrls: ["./inicio.component.css"]
})
export class InicioComponent implements OnInit {
  //hardcodeado
  admin = false;
  devices: Device[] = [];
  isUserVerified = false;
  isFetching = false;

  constructor(
    public auth: AuthService,
    private http: HttpClient,
    private devicesService: DevicesService
  ) {}

  ngOnInit() {
    // console.log(this.auth.userProfile$);
    this.isFetching = true;
    this.auth.userProfile$.subscribe(userInfo => {
      if (userInfo.hasOwnProperty("email_verified")) {
        this.isUserVerified = userInfo.email_verified;
      }
      if (this.isUserVerified) {
        this.devicesService.fetchDevices().subscribe(
          devices => {
            this.isFetching = false;
            this.devices = devices;
          },
          error => {
            this.isFetching = false;
          }
        );
      } else {
        this.isFetching = false;
        document.getElementById("modalVerification").click();
      }
    });
  }
}
