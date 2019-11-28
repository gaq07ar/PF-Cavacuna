import { Component, OnInit } from "@angular/core";
import { Device } from "../shared/device.model";
import { AuthService } from "src/app/services/auth.service";
import { DevicesService } from "src/app/services/devices.service";
import { DomSanitizer } from "@angular/platform-browser";
import { UserService } from "src/app/services/user.service";

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
  // firstGraph: string =
  //   "https://thingspeak.com/channels/" +
  //   this.selectedDevice.id +
  //   "/charts/1?bgcolor=%23ffffff&color=%239fe1fd&dynamic=true&results=60&title=Hist%C3%B3rico+de+Temperaturas&type=line&xaxis=Minutos&yaxis=Grados";
  // secondGraph: string =
  //   "https://thingspeak.com/channels/" +
  //   this.selectedDevice.id +
  //   "/widgets/121575";

  // minDate: string;
  // maxDate: string;
  // firstGraph: String =
  //   "https://thingspeak.com/channels/" +
  //   this.selectedDevice.id +
  //   "/charts/1?bgcolor=%23ffffff&color=%239fe1fd&dynamic=true&results=60&title=Hist%C3%B3rico+de+Temperaturas&type=line&xaxis=Minutos&yaxis=Grados";

  constructor(
    public auth: AuthService,
    private userService: UserService,
    public sanitizer: DomSanitizer
  ) {
    this.selectedDevice = null;
    // this.minDate = null;
    // this.maxDate = null;
  }

  ngOnInit() {
    this.isFetching = true;
    this.processInitialInformation();
  }

  private async processInitialInformation() {
    const userInfo = await this.userService.getUserInformation();
    this.isUserVerified = userInfo.email_verified;
    const username = userInfo.email;
    if (this.isUserVerified) {
      this.devices = await this.userService.getDevicesForUser(username);
    }
    // else {
    //   this.isFetching = false;
    //   document.getElementById("modalVerification").click();
    // }
    this.isFetching = false;
  }

  onUpdateDevice(event: any) {
    console.log(event);
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
      "/widgets/121575"
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
