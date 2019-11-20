import { Component, OnInit, Input } from "@angular/core";
import { Device } from "../device.model";
import { Slot } from "../slot.model";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Component({
  selector: "app-cavacuna",
  templateUrl: "./cavacuna.component.html",
  styleUrls: ["./cavacuna.component.css"]
})
export class CavacunaComponent implements OnInit {
  @Input() device: Device;
  @Input() i: number;
  actualTemperature: number;
  isFetching = false;
  acceptedRange: number[] = [];
  minTemp: number;
  maxTemp: number;

  slots: Slot[] = [
    new Slot(1, "Hepatitis B", false),
    new Slot(2, "Neumococo conjugado", false),
    new Slot(3, "Probando", false),
    new Slot(4, "Probando aplicada", true)
  ];

  vacunas = ["vacu1", "vacu2", "vacu3", "vacu4", "vacu5"];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.minTemp = Number(this.device.min_temp);
    this.maxTemp = Number(this.device.max_temp);
    let avg: number = (this.minTemp + this.maxTemp) / 2;
    this.acceptedRange.push(avg - avg * 0.35);
    this.acceptedRange.push(avg + avg * 0.35);
    this.isFetching = true;
    setInterval(() => this.fetchPosts(), 5000);
  }

  checkWarningValidation(incomingTemperature: number): boolean {
    return (
      (incomingTemperature >= this.minTemp &&
        incomingTemperature <= this.acceptedRange[0]) ||
      (incomingTemperature >= this.acceptedRange[1] &&
        incomingTemperature <= this.maxTemp)
    );
  }

  checkColdDangerValidation(incomingTemperature: number): boolean {
    return incomingTemperature < this.minTemp;
  }

  checkHotDangerValidation(incomingTemperature: number): boolean {
    return incomingTemperature > this.maxTemp;
  }

  private fetchPosts() {
    this.http
      .get(
        "https://api.thingspeak.com/channels/" +
          this.device.id +
          "/fields/1/last.json?timezone=America%2FArgentina%2FBuenos_Aires"
      )
      .pipe(
        map(
          (responseData: {
            created_at: string;
            entry_id: string;
            field1: number;
          }) => {
            return responseData.field1;
          }
        )
      )
      .subscribe(lastEntry => {
        console.log(lastEntry);
        this.actualTemperature = lastEntry;
        this.isFetching = false;
      });
  }
}
