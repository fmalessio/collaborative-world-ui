import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './auth/service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  loadAPI: Promise<any>;
  isAuthenticated: boolean;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.initializeApp();
    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });
  }

  ngOnInit() {
    if (!this.authenticationService.isAuthenticated()) {
      this.router.navigate(['auth/login']);
    }
  }

  loadScript() {
    var isFound = false;
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
        isFound = true;
      }
    }
    if (!isFound) {
      var dynamicScripts = [
        `https://maps.googleapis.com/maps/api/js?region=AR&libraries=places&key=${environment.googleMapsKey}`
      ];
      for (var j = 0; j < dynamicScripts.length; j++) {
        let node = document.createElement('script');
        node.src = dynamicScripts[j];
        node.type = 'text/javascript';
        node.async = false;
        document.getElementsByTagName('head')[0].appendChild(node);
      }

    }
  }

  private initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authenticationService.getAuthState().subscribe(state => {
        console.log(`User logged: ${state}`);
        this.isAuthenticated = state;
      });
    });
  }
}
