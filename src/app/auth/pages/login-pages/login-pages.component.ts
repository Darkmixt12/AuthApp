import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login-pages',
  templateUrl: './login-pages.component.html',
  styleUrls: ['./login-pages.component.css']
})
export class LoginPagesComponent {

  private fb          = inject(FormBuilder);
  private authService = inject(AuthService);
  private router      = inject(Router)

  public errorMessage: string  = ''
  public myForm: FormGroup = this.fb.group({
      email: ['steven@hotmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
  })





  login(){
    const {email , password } = this.myForm.value


    this.authService.login(email, password)
    .subscribe({
      next: () => this.router.navigateByUrl('/dashboard'),
      error: (errorMessage) => {
        console.log({ loginerror: errorMessage})
        //Swal.fire('Error', errorMessage, 'error')
        this.errorMessage = errorMessage
      }
    } )
  }
    
}
