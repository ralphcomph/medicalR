import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
        var config = {
            apiKey: "AIzaSyCzYA7AcgcjKsGkCD4E8uzES9PeXG7Eds4",
            authDomain: "medicalr-73720.firebaseapp.com",
            databaseURL: "https://medicalr-73720.firebaseio.com",
            projectId: "medicalr-73720",
            storageBucket: "medicalr-73720.appspot.com",
            messagingSenderId: "420025868265"
        };
        firebase.initializeApp(config);
    }
}
