import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';

import { AutenticacaoService } from '../shared/services/autenticacao.service'

@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule
  ],
  declarations: [SignupComponent],
  providers: [AutenticacaoService]
})
export class SignupModule { }
