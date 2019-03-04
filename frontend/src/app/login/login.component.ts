import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LoginService } from "./login.service";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  private loginUsername: string;
  private loginPassword: string;
  constructor(private loginService: LoginService) {}

  ngOnInit() {
    console.log("initialized");
  }
  login() {
    console.log("login fired", this.loginUsername, this.loginPassword);
    console.log("service", this.loginService);
    const result = this.loginService.login(
      this.loginUsername,
      this.loginPassword
    );
    console.log("result", result);
  }
}
