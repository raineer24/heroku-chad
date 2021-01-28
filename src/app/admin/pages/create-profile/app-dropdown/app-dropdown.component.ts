import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Status } from "../../../../../app/core/models/positions";
import { AuthService } from "../../../../core/services/user.service";
import { FormBuilder, FormGroup } from "@angular/forms";
export interface Positions {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-dropdown",
  templateUrl: "./app-dropdown.component.html",
  styleUrls: ["./app-dropdown.component.scss"],
})
export class AppDropdownComponent implements OnInit {
  @Output() jobSelected: EventEmitter<any> = new EventEmitter();
  @Input() selected: string;
  jobTitle: Positions[];
  @Input() isDisabled: any;
  constructor(
    private authenticationService: AuthService,
    private fb: FormBuilder
  ) {}
  allStatus: Status[];
  @Input() basicForm: FormGroup;

  @Input() set status(positions: string) {
    this.jobTitle = this.getPositions();
    console.log("jobTitle", this.jobTitle);
  }

  ngOnInit() {
    this.allStatus = this.authenticationService.getAllPositions();
  }

  getPositions(): Positions[] {
    return [
      { value: "senior developer", viewValue: "senior Developer" },
      { value: "junior developer", viewValue: "junior Developer" },
      { value: "manager", viewValue: "manager" },
      { value: "instructor", viewValue: "instructor" },
      { value: "intern", viewValue: "intern" },
      { value: "student", viewValue: "student" },
      { value: "Other", viewValue: "Other" },
    ];
  }

  onChangeJob(value) {
    this.jobSelected.emit(value);
    //let jobValue = this.jobSelected.emit(value);
    //console.log("clicked", jobValue);
  }
}
