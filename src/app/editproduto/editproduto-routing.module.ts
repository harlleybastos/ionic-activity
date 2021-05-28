import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditprodutoPage } from './editproduto.page';

const routes: Routes = [
  {
    path: '',
    component: EditprodutoPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditprodutoPageRoutingModule {}
