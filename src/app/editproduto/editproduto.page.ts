import { Component, OnInit } from '@angular/core';
import {
  IonApp,
  NavController,
  ToastController,
  NavParams,
} from '@ionic/angular';
import { ProdutosService, Product } from '../produtos.service';
import { CategoriasService } from '../categorias.service';

@Component({
  selector: 'app-editproduto',
  templateUrl: './editproduto.page.html',
  styleUrls: ['./editproduto.page.scss'],
})
export class EditprodutoPage implements OnInit {
  model: Product;
  categories: any[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private productProvider: ProdutosService,
    private categoryProvider: CategoriasService
  ) {
    this.model = new Product();
    if (this.navParams.data.id) {
      this.productProvider.get(this.navParams.data.id).then((result: any) => {
        this.model = result;
      });
    }
  }

  ngOnInit() {
    this.categoryProvider
      .getAll()
      .then((result: any[]) => {
        this.categories = result;
      })
      .catch(async () => {
        (
          await this.toast.create({
            message: `Erro ao carregar as
categorias.`,
            duration: 3000,
            position: `bottom`,
          })
        ).present();
      });
  }
  save() {
    this.saveProduct()
      .then(async () => {
        (
          await this.toast.create({
            message: `Produto salvo.`,
            duration: 3000,
            position: `bottom`,
          })
        ).present();
        this.navCtrl.pop();
      })
      .catch(async () => {
        (
          await this.toast.create({
            message: `Erro ao salvar o produto.`,
            duration: 3000,
            position: `bottom`,
          })
        ).present();
      });
  }

  private saveProduct() {
    if (this.model.id) {
      return this.productProvider.update(this.model);
    } else {
      return this.productProvider.insert(this.model);
    }
  }
}
