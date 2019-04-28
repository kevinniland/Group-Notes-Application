import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthProvider } from './_services/auth.service';
import { UtilitiesService } from './_services/utilities.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  // Defines the pages that can be navigated to from the side menu
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Login', url: '/login', icon: 'log-in' },
    { title: 'Register', url: '/register', icon: 'log-out' },
    { title: 'Groups', url: '/allgroups', icon: 'people' },
    { title: 'Users', url: '/users', icon: 'people'}
  ];

  constructor(private platform: Platform, private splashScreen: SplashScreen, 
    private statusBar: StatusBar, private authService: AuthProvider, private router: Router,
    private utilitiesService: UtilitiesService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // Logs user out of the current session
  onLogout() {
    this.authService.logOut();
    localStorage.clear();
  }

  // Gets the user's username from localstorage and displays in the top right corner
  get user(): any {
    return localStorage.getItem("username");
  }

  // Gets the user's profile image and displays it in the top right corner, alongside the username
  get profileImage(): any {
    let profileImage: String = localStorage.getItem("profileImage");
    if (profileImage != null){
      return profileImage;
    }
    else {
      return "https://www.searchpng.com/wp-content/uploads/2019/02/Men-Profile-Image-PNG-715x657.png";
    }
  }
}
