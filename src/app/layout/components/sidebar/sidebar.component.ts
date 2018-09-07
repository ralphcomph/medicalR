import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { AutenticacaoService } from '../../../shared/services/autenticacao.service'
import { AngularFireDatabase } from 'angularfire2/database'

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    isActive: boolean = false;
    showMenu: string = '';
    pushRightClass: string = 'push-right';       

    private UsuarioRole: boolean = false;
    private AtendenteRole: boolean = false;
    private PacienteRole: boolean = false;
    private MedicoRole: boolean = false;
    private RemedioRole: boolean = false;
    private ConsultaRole: boolean = false;

    constructor(
        private translate: TranslateService,
        public router: Router,
        private firebase: AngularFireDatabase,
        private autenticacaoService: AutenticacaoService) {
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {  
        this.autenticacaoService.getAuth().subscribe(auth => {
            if (auth) {               
                let subscribe = this.firebase.object(`usuarios_info/${btoa(auth.email)}`).valueChanges().subscribe(
                    data => {     
                        switch (data["perfil"]) {
                            case "Administrador": {
                                this.UsuarioRole = true;
                                this.AtendenteRole = true;
                                this.PacienteRole = true;
                                this.MedicoRole = true;
                                this.RemedioRole = true;
                                this.ConsultaRole = true;
                                break;
                            }
                            case "Atendente": {
                                this.PacienteRole = true;
                                this.ConsultaRole = true;
                                break;
                            }
                            case "Paciente": {
                                this.ConsultaRole = true;
                                break;
                            }
                            case "Médico": {
                                this.RemedioRole = true;
                                this.ConsultaRole = true;
                                break;
                            }
                            default: {
                                break;
                            }
                        }  
                    }
                );
            } else {
            }
        });       
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }
}
