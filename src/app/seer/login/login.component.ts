import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import  * as _ from 'lodash';
import { GlobalState } from '../../global.state';
import { parseQueryString, setStorage, getStorage } from '../../theme/libs';

import { AuthService, ManageService, SeerMessageService } from '../../theme/services';

import { DynamicComponentLoader } from '../../theme/directives/dynamicComponent/dynamic-component.directive';
import { VersionInfoComponent } from './component/version-info.component';

@Component({
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ],
})
export class LoginComponent {

  @ViewChild(DynamicComponentLoader)
  dynamicComponentLoader: DynamicComponentLoader;

  public form: FormGroup;
  public account: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;
  errorMessage: string;
  loginInfo: Object;
  success: boolean;

  showError(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-times-circle',
      autoHideDuration: 3000,
    })
  }

  constructor(
    fb: FormBuilder,
    private _router: Router,
    private _state: GlobalState,
    private _authService: AuthService,
    private _manageService: ManageService,
    private _messageService: SeerMessageService,
    ) {
    this.form = fb.group({
      'account': ['admin', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['123456', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.account = this.form.controls['account'];
    this.password = this.form.controls['password'];

  }


  public onSubmit(values: Object): void {
    this.submitted = true;
    if ( this.form.valid ) {
      this.login(values['account'], values['password'])
    }
  }
  
  login(account, password) {
    this._authService.login(account, password)
    .mergeMap(res => {
      if ( res && !res.error ) {
        setStorage({
          key: 'token',
          value: res,
        }, false)
      }
      return Observable.fromPromise(this._manageService.refreshLocalDataAndNotify())
    })
    .subscribe(res => {
      if ( this._authService.isLoggedIn ) {
        let resources = getStorage({ key: 'resources' });
        let fullPaths = _.map(resources, r => r['fullPath']);
        let reg = new RegExp('^(' + fullPaths.join('|') + ')', 'g');

        let redirectUrl = this._authService.redirectUrl && this._authService.redirectUrl != '/login' ? this._authService.redirectUrl : reg.test('/workspace') ? '/workspace' : _.find(fullPaths, t => t.split('\/').length > 2 );
        let redirectSearch = this._authService.redirectSearch;
        let loginSearch = parseQueryString(location.search);

        let navigationExtras: NavigationExtras = {
          queryParams: Object.assign({}, redirectSearch, loginSearch),
          //preserveQueryParams: true,
          preserveFragment: true
        };

        this._router.navigate([redirectUrl], navigationExtras);
      }
    }, err => {
      this.showError(err.msg)
    })

  }
  versionShow() {
    this.dynamicComponentLoader.loadComponent(VersionInfoComponent, null);
  }

  
}
