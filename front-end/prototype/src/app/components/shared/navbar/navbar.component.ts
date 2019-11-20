import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Subscription } from "rxjs";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  isAdmin: boolean;
  isFetching = false;
  private adminSubscription: Subscription;

  constructor(public auth: AuthService, private userService: UserService) {}

  ngOnInit() {
    this.auth.handleAuthCallback();
    this.isFetching = true;
    this.getPermissionInformation();
    this.isFetching = false;
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
}
