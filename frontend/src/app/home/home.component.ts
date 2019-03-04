import { Component } from "@angular/core";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent {
  title = "app";
  username = "";
  password = "";
  things = ["red", "blue", "green"];
  constructor() {}

  handleClick(thing) {
    console.log("clicked" + thing);
  }
}
