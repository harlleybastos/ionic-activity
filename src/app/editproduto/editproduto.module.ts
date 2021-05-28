import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditprodutoPageRoutingModule } from './editproduto-routing.module';

import { EditprodutoPage } from './editproduto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditprodutoPageRoutingModule,
  ],
  declarations: [EditprodutoPage],
})
export class EditprodutoPageModule {}
