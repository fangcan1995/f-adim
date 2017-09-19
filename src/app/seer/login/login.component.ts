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
import { GlobalState } from '../../global.state';
import { parseQueryString } from '../../theme/libs/utils';

import { AuthService } from '../../theme/services/auth.service';
import { SeerMessageService } from '../../theme/services/seer-message.service';


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
    private _messageService: SeerMessageService,
    ) {
    this.form = fb.group({
      'account': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
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
    .subscribe(() => {
      if ( this._authService.isLoggedIn ) {
        
        let redirectUrl = this._authService.redirectUrl ? this._authService.redirectUrl : '/home';
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
