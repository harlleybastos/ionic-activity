import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { HomePage } from './home/home.page';
import { BasedadosService } from './basedados.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  rootPage: any = null;
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    dbProvider: BasedadosService
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      //Criando o banco de dados
      dbProvider
        .createDatabase()
        .then(() => {
          // fechando a SplashScreen somente quando o banco for criado
          this.openHomePage(splashScreen);
          alert('Banco populado !');
        })
        .catch(() => {
          // Caso ocorrer erro na criação do banco
          this.openHomePage(splashScreen);
          alert('Erro!');
        });
    });
  }
  ngOnInit() {}
  private openHomePage(splashScreen: SplashScreen) {
    splashScreen.hide();
    this.rootPage = HomePage;
  }
}
