import {Component, Input, NgModule, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {BackendStorageService} from "../../_services/backend-storage.service";
import {BackendAuthService} from "../../_services/backend-auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: BackendAuthService,
              private route:Router,
              private storageService: BackendStorageService) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.route.navigate(['/dashboard'])
        //this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
/*//backend login
 //form!: FormGroup;
 //================
 //local login
 userFormGroup!: FormGroup;
 errormessage!:string
 //=======================
 constructor(private router: Router,
             private fb: FormBuilder,
             private http: HttpClient,
             private loginservice: AuthService) { }

 invalidLogin = false

 @Input() error: string | null | undefined;

 ngOnInit(): void {
     this.userFormGroup= this.fb.group({
       username : this.fb.control(""),
       password : this.fb.control("")
     })
 }
//Backend Service authentication
/!* submit() {
   this.http.post('http://localhost:8087/login',this.form.getRawValue(),{withCredentials:true})
     .subscribe((res:any)=>{
       HttpInterceptorInterceptor.accessToken= res.token;
       this.router.navigate(['/'])
     })

 }*!/
//local authentication
 handleLogin() {
   let username= this.userFormGroup.value.username;
   let password= this.userFormGroup.value.password;
   this.loginservice.login(username,password).subscribe({
     next :(appUser)=>{
       this.loginservice.authenticateUser(appUser).subscribe({
         next: (data)=>{
           this.router.navigate(["/"])
         }
       })
     },
     error: (err)=>{
       this.errormessage=err;
     }
   });

 }*/
