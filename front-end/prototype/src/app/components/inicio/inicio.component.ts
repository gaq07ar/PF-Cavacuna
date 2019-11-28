import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Device } from "../shared/device.model";
import { DevicesService } from "src/app/services/devices.service";
import { UserService } from "src/app/services/user.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.component.html",
  styleUrls: ["./inicio.component.css"]
})
export class InicioComponent implements OnInit, OnDestroy {
  isAdmin: boolean;
  devices: Device[] = [];
  isUserVerified = false;
  isFetching = false;
  private adminSubscription: Subscription;

  constructor(
    public auth: AuthService,
    private devicesService: DevicesService,
    private userService: UserService
  ) {}

  ngOnInit() {
    //Comment
    this.isFetching = true;
    this.getPermissionInformation();
    this.processInitialData();
  }

  private getPermissionInformation() {
    this.adminSubscription = this.userService.isAdmin.subscribe(
      adminData => {
        this.isAdmin = adminData;
      },
      err => {
        console.log(err);
      }
    );
  }

  private processInitialData() {
    this.auth.userProfile$.subscribe(userInfo => {
      if (userInfo.hasOwnProperty("email_verified")) {
        this.isUserVerified = userInfo.email_verified;
      }
      if (this.isUserVerified) {
        this.devicesService.fetchDevices(userInfo.email).subscribe(
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

  ngOnDestroy() {
    this.adminSubscription.unsubscribe();
  }
}
