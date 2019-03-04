import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs/operators";

import { config } from "../config";

@Injectable()
export class LoginService {
  private loginUrl = "login"; // URL to web api

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    console.log("login fired in service");
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post(config.apiUrl + this.loginUrl, {
        username: username,
        password: password
      })
      .toPromise()
      .then(data => {
        console.log(data);
      });
  }
}
