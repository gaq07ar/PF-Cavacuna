import { Component, OnInit, Input } from "@angular/core";
import { Device } from "../../shared/device.model";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";
import { DevicesService } from "src/app/services/devices.service";
import { Subject } from "rxjs";

@Component({
  selector: "app-devices",
  templateUrl: "./devices.component.html",
  styleUrls: ["./devices.component.css"]
})
export class DevicesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  isFetching = false;
  adminId: string;
  devices: Device[] = [];
  isUserVerified = false;

  constructor(
    public auth: AuthService,
    private devicesService: DevicesService
  ) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 2
    };
    this.isFetching = true;
    this.processInitialData();
    this.isFetching = false;
  }

  private processInitialData() {
    this.auth.userProfile$.subscribe(userInfo => {
      if (userInfo.hasOwnProperty("email_verified")) {
        this.isUserVerified = userInfo.email_verified;
      }
      if (this.isUserVerified) {
        this.devicesService.fetchDevices(userInfo.email).subscribe(
          devices => {
            console.log(devices);
            this.isFetching = false;
            this.devices = devices;
            this.dtTrigger.next();
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
