import { Component } from '@angular/core';
import { IonApp, NavController, ToastController } from '@ionic/angular';
import { ProdutosService, Product } from '../produtos.service';
import { EditprodutoPage } from '../editproduto/editproduto.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  products: any[] = [];
  onlyInactives = false;
  searchText: string = null;
  constructor(
    public navCtrl: NavController,
    private toast: ToastController,
    private productProvider: ProdutosService
  ) {}
  ionViewDidEnter() {
    this.getAllProducts();
  }
  getAllProducts() {
    this.productProvider
      .getAll(!this.onlyInactives, this.searchText)
      .then((result: any[]) => {
        this.products = result;
      });
  }
  addProduct() {
    this.navCtrl.navigateForward('editproduto');
  }
  editProduct(id: any) {
    this.navCtrl.navigateForward('editproduto', id);
  }
  removeProduct(product: Product) {
    this.productProvider.remove(product.id).then(async () => {
      // Removendo o produto do array de produtos
      const index = this.products.indexOf(product);
      this.products.splice(index, 1);
      (
        await this.toast.create({
          message: `Produto removido.`,
          duration: 3000,
          position: `bottom`,
        })
      ).present();
    });
  }
  filterProducts(ev: any) {
    this.getAllProducts();
  }
}
