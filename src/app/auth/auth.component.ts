import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error = null;

  constructor(private authService: AuthService){}

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    const { email, password } = form.value;

    this.isLoading = true;
    if(this.isLoginMode){
      //...
    }else{
      this.authService.signUp(email, password)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.isLoading = false;
        },
        error: (error) => {
          this.error = error;
          this.isLoading = false;
        }
      });
    }
    form.reset();
  }
}
