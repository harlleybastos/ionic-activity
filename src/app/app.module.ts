import {
  ErrorHandler,
  NgModule,
  LOCALE_ID,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule, IonApp } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AppComponent } from './app.component';
import { HomePage } from './home/home.page';
import { EditprodutoPage } from './editproduto/editproduto.page';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { BasedadosService } from './basedados.service';
import { ProdutosService } from './produtos.service';
import { CategoriasService } from './categorias.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AppComponent, HomePage, EditprodutoPage],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    IonicModule,
    RouterModule.forRoot([]),
  ],
  bootstrap: [AppComponent],
  entryComponents: [AppComponent, HomePage, EditprodutoPage],
  providers: [
    StatusBar,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: ErrorHandler, useClass: ErrorHandler },
    SQLite,
    BasedadosService,
    ProdutosService,
    CategoriasService,
    SplashScreen,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
