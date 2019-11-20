import { Component, OnInit, Input } from "@angular/core";
import { Device } from "../device.model";
import { Slot } from "../slot.model";

@Component({
  selector: "app-cavacuna",
  templateUrl: "./cavacuna.component.html",
  styleUrls: ["./cavacuna.component.css"]
})
export class CavacunaComponent implements OnInit {
  @Input() device: Device;
  @Input() i: number;

  slots: Slot[] = [
    new Slot(1, "Hepatitis B", false),
    new Slot(2, "Neumococo conjugado", false),
    new Slot(3, "Probando", false),
    new Slot(4, "Probando aplicada", true)
  ];

  vacunas = ["vacu1", "vacu2", "vacu3","vacu4", "vacu5"];

  constructor() {}

  ngOnInit() {}
}
