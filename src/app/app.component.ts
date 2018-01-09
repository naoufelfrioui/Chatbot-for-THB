import { Component, ViewChild } from '@angular/core';
import { Config, Platform,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { User } from '../providers/user';
import {SpeechRecognition} from '@ionic-native/speech-recognition';
import { SettingsPage } from "../pages/settings/settings";
// import { Bot } from "../pages/bot/bot";
// import { SettingsPage } from "../pages/settings/settings";



declare var ApiAIPlugin: any;


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = TabsPage;
    @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any}>;

  constructor( public platform: Platform , public statusBar: StatusBar, public splashScreen: SplashScreen,
     user: User, public config: Config , public  speech :SpeechRecognition
      ) {
  
        this.initializeApp();


//  this.pages = [
//       { title: 'Bot', component: Bot },
//        { title: 'ChatPagePage', component: ChatPagePage }

   
//     ];

  

    let globalActions = function() {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    };

    platform.ready().then(() => {
      user.isAuthenticated().then(() => {
        console.log('you are authenticated!');
        this.rootPage = TabsPage;
        globalActions();
      }).catch(() => {
        console.log('you are not authenticated..'); 
        this.rootPage = LoginPage;
        globalActions();
      });
    });
  }




  async getPermission():Promise<void> {
    try{
      const permission = await this.speech.requestPermission();
      console.log(permission)
      return permission;
    }
    catch(e){
      console.log(e)
    }
  };

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      ApiAIPlugin.init(
        {
            clientAccessToken: "f12cc29f4df14e698da8aa6bceb1e557", // insert your client access key here
            lang: "de" // set lang tag from list of supported languages
        },
        function(result) { /* success processing */ },
        function(error) { /* error processing */ }
    );
    });
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
 openSettigns(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(SettingsPage);
  }

}
