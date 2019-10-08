import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Device } from "./device.model";
import { Response } from "./response.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  device: Device = {};
  //https://api.thingspeak.com/channels/415950/feeds/last.json

  constructor(private http: HttpClient) {}

  ngOnInit() {
    setInterval(() => this.fetchPosts(), 5000);
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http
      .post(
        "https://ng-complete-guide-c56d3.firebaseio.com/posts.json",
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.http
      .get("https://api.thingspeak.com/channels/415950/feeds/last.json")
      .pipe(
        map((responseData: Response) => {
          let device: Device = {};
          device.id = responseData.entry_id;
          device.temperature = responseData.field1;
          this.device = device;
          console.log(device);
          return device;
        })
      )
      .subscribe(lastEntry => {
        console.log("Succesfull");
      });
  }
}
