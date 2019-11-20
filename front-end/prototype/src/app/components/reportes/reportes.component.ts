import { Component, OnInit } from "@angular/core";
import { Device } from "../shared/device.model";
import { AuthService } from "src/app/services/auth.service";
import { DevicesService } from "src/app/services/devices.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-reportes",
  templateUrl: "./reportes.component.html",
  styleUrls: ["./reportes.component.css"]
})
export class ReportesComponent implements OnInit {
  devices: Device[] = [];
  isUserVerified = false;
  isFetching = false;
  selectedDevice: Device;
  // minDate: string;
  // maxDate: string;

  constructor(
    public auth: AuthService,
    private devicesService: DevicesService,
    public sanitizer: DomSanitizer
  ) {
    this.selectedDevice = null;
    // this.minDate = null;
    // this.maxDate = null;
  }

  ngOnInit() {
    this.isFetching = true;
    this.processInitialData();
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
      }
    });
  }

  bindDevice(device: Device) {
    console.log(JSON.stringify(device));
    if (device !== null) {
      this.selectedDevice = device;
    }
  }

  getFirstGraph(deviceId: string): string {
    return (
      "https://thingspeak.com/channels/" +
      this.selectedDevice.id +
      "/charts/1?bgcolor=%23ffffff&color=%239fe1fd&dynamic=true&results=60&title=Hist%C3%B3rico+de+Temperaturas&type=line&xaxis=Minutos&yaxis=Grados"
    );
  }

  getSecondGraph(deviceId: string): string {
    return (
      "https://thingspeak.com/channels/" +
      this.selectedDevice.id +
      "/widgets/120776"
    );
  }

  getCSVFile(deviceId: string, deviceDescription: string): string {
    return (
      "https://thingspeak.com/channels/" +
      this.selectedDevice.id +
      "/field/" +
      this.selectedDevice.description +
      ".csv"
    );
  }

  // showValue() {
  //   console.log(this.minDate);
  //   console.log(this.maxDate);
  // }
}
