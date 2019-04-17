import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginService } from './_services/login.service';
import { FileStorageService } from './_services/file-storage.service';
import { GroupsService } from './_services/groups.service'
import { config } from './app.firebaseconfig';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { ImagePopoverComponent } from './_components/image-popover/image-popover.component';

@NgModule({
  declarations: [AppComponent, ImagePopoverComponent],
  entryComponents: [AppComponent, ImagePopoverComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule,                          
    ReactiveFormsModule,
    AngularFireModule.initializeApp(config)
    //Events
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LoginService,
    FileStorageService,
    Chooser,
    QuillModule,
    FileTransfer,
    FileTransferObject,
    AngularFireAuth,
    GroupsService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  
}
