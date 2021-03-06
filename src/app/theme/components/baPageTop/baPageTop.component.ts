import {
    Component,
    ViewEncapsulation,
    ViewChild,
    OnDestroy,
    OnInit,
    ElementRef
} from '@angular/core';

import { GlobalState } from '../../../global.state';
import { Router } from "@angular/router";
import { ManageService, AuthService, SeerMessageService } from '../../services';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { parseQueryString, setStorage, getStorage, hex_md5 } from '../../libs';
@Component({
    selector: 'ba-page-top',
    templateUrl: './baPageTop.html',
    styleUrls: ['./baPageTop.scss'],
})
export class BaPageTop implements OnInit {

    @ViewChild('pageTop') pageTop: ElementRef;
    @ViewChild('modal') modal: ModalDirective;
    @ViewChild('personInfo') personInfo: ModalDirective;
    @ViewChild('myForm') myForm;

    public isScrolled: boolean = false;
    isSuccess: boolean;
    loginName: string;
    errorMessage: string;
    loginImage: string;
    activePageTitle: string;
    activePageIcon: string;
    isHidden: boolean;
    _offsetTop: number;
    userStaffInfo: any = {};

    user: any = {};

    form: FormGroup;
    constructor(
        private router: Router,
        private _state: GlobalState,
        private _manageService: ManageService,
        private _authService: AuthService,
        private _messageService: SeerMessageService,
    ) {
        this._state.subscribe('menu.activeLink', (activeLink) => {
            if (!activeLink || !activeLink.route || !activeLink.route.paths) {
                this.activePageTitle = '';
                this.activePageTitle = null;

            } else {
                this.activePageTitle = activeLink.title;
                this.activePageIcon = this._getActivePageIcon(activeLink);
            }
        });


        this._state.subscribe('user.changed', () => {
            this.user = this._manageService.getUserFromLocal() || {};
        })

        let oldPassword = new FormControl('', Validators.required);
        let newPassword = new FormControl('', Validators.required);
        let certainPassword = new FormControl('', CustomValidators.equalTo(newPassword));
        this.form = new FormGroup({
            oldPassword: oldPassword,
            newPassword: newPassword,
            certainPassword: certainPassword
        });

    }
    ngOnInit(): void {
        this.user = this._manageService.getUserFromLocal() || {};
        console.log(this.user);
    }


    private _getActivePageIcon(activeLink) {
        if (!activeLink.icon && !activeLink.parent) {
            return null;
        } else if (!activeLink.icon && activeLink.parent) {
            return this._getActivePageIcon(activeLink.parent);
        } else {
            return activeLink.icon;
        }
    }
    public scrolledChanged(isScrolled) {
        this.isScrolled = isScrolled;
    }
    public handleScroll({ direction, scrollY }) {
        let { offsetTop, offsetHeight } = this.pageTop.nativeElement;
        this._offsetTop = -scrollY
        if (scrollY > offsetTop + offsetHeight) {
            scrollY = offsetTop + offsetHeight;
            this.isHidden = !!direction
        } else {
            this.isHidden = false
        }

        this._offsetTop = -scrollY
    }
    public logout($event) {
        $event.preventDefault();
        this._authService.logout().subscribe(this.redirectToLogin.bind(this));
    }

    onOpenPersonalInfo($event) {
        /* let id = this.user.userId;
        this.router.navigate([`../../../basic-info/personal-info/${id}`]); */
        $event.preventDefault();
        this._manageService.getPersonInfo(this.user.userId)
            .then(res => {
                let { empName, emCode, position, departmentName } = res.data;
                this.userStaffInfo = {
                    empName, 
                    emCode, 
                    position,
                    departmentName
                };
            })
        
        this.personInfo.show();
    }

    redirectToLogin() {
        this._authService.redirectUrl = null;
        this._authService.redirectSearch = null;
        this.router.navigate(['/login']);
    }

    showModal($event) {
        $event.preventDefault();
        this.modal.show();
    }
    handleModalShown() {
        this.user = this._manageService.getUserFromLocal() || {};
        this.form.reset()
    }
    handleModalHide() {
        this.form.reset()
    }
    savePassword() {
        if (this.form.valid) {
            const { oldPassword, newPassword } = this.form.value;
            const params = {
                username: this.user.loginName,
                old_password: hex_md5(oldPassword),
                new_password: hex_md5(newPassword),
                type: 'system',
            }
            this._manageService.changePassword(params)
                .then(res => {
                    this.showSuccess(res.message)
                        .onClose().subscribe(() => {
                            this._authService.logout().subscribe(this.redirectToLogin.bind(this));
                        })
                })
                .catch(err => {
                    console.log(err);
                    this.showError(err.msg || '修改密码失败')
                })
        }
    }
    showError(message: string) {
        return this._messageService.open({
            message,
            icon: 'fa fa-times-circle',
            autoHideDuration: 3000,
        })
    }

    showSuccess(message: string) {
        return this._messageService.open({
            message,
            icon: 'fa fa-check',
            autoHideDuration: 3000,
        })
    }
}
