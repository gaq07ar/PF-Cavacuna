import { Injectable, OnInit } from "@angular/core";
import { AuthService } from "./auth.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";
import { User } from "../components/shared/user.model";

@Injectable({
  providedIn: "root"
})
export class UserService implements OnInit {
  isAdmin = new BehaviorSubject<boolean>(false);

  constructor(public auth: AuthService, private http: HttpClient) {
    this.auth.userProfile$.subscribe(userInfo => {
      if (userInfo != null) {
        let email = userInfo.email;
        this.http
          .get<User>(
            "http://" + environment.cavacunaAPIAddress + "/api/user/" + email
          )
          .subscribe(user => {
            if (user.hasOwnProperty("is_admin")) {
              this.isAdmin.next(user.is_admin);
            }
          });
      }
    });
  }

  ngOnInit() {}

  fetchRegisteredUsersForAdmin(adminId: string) {
    return this.http.get<[[string, string]]>(
      "http://" +
        environment.cavacunaAPIAddress +
        "/api/user/getRegisteredUsersForAdmin/" +
        adminId
    );
  }

  addUserToAdmin(adminId: string, userId: string, deviceId) {
    return this.http.post(
      "http://" + environment.cavacunaAPIAddress + "/api/user/addUserToAdmin",
      {
        adminId: adminId,
        userId: userId,
        deviceId: deviceId
      }
    );
  }
}
