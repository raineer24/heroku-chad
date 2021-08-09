import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../../../core/services/user.service";
import { Store, select, ActionsSubject } from "@ngrx/store";
import { ofType } from "@ngrx/effects";
//import * as fromRoot from "../../../store/reducers";
import { Router, ActivatedRoute } from "@angular/router";
import * as DevActions from "../../state/dev.action";
import { Subscription, Observable, of, Subject } from "rxjs";
import { skipWhile, skip, take, filter, takeUntil } from "rxjs/operators";
import { UserFetch, Experience, User } from "../../../core/models/";
@Component({
  selector: "app-devs-list",
  templateUrl: "./developers-list.component.html",
  styleUrls: ["./developers-list.component.scss"],
})
export class DevelopersListComponent implements OnInit {
  destroyed$ = new Subject<boolean>();

  developers$: Observable<User[]>;
  developers: any;
  constructor(
    private authenticationService: AuthService,
    //private store: Store<fromRoot.AppState>,
    private router: Router,
    private actionsSubj: ActionsSubject
  ) {
    // this.actionsSubj
    //   .pipe(
    //     ofType(DevActions.DevActionTypes.LOAD_DEVELOPERS_SUCCESS),
    //     takeUntil(this.destroyed$)
    //   )
    //   .subscribe((data: any) => {
    //     /* hooray, success, show notification alert etc.. */
    //     console.log("DATA", data);
    //     // this.noData = data["payload"];
    //     // console.log("thisnodata", this.noData);
    //     // this.initializeData(data["payload"]);
    //     //  this.dataSource = new MatTableDataSource(this.noData);
    //     //   console.log("this.datasource", this.dataSource);
    //   });
  }

  ngOnInit() {
    // this.store.dispatch(new DevActions.loadDevelopersAction());
    //  this.developers = this.store.pipe(select(fromRoot.selectUserListState$));
    //console.log("dev", this.developers);
    // this.developers.subscribe((data) => {
    //   console.log("data dev", data);
    //   this.developers$ = data["users"];
    //   console.log("devs", this.developers$);
    // });
  }
}
