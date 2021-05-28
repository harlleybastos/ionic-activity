/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BasedadosService } from './basedados.service';
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  constructor(private dbProvider: BasedadosService) {}

  public insert(product: Product) {
    return this.dbProvider
      .getDB()
      .then((db: SQLiteObject) => {
        const sql = `insert into products (name, price, duedate, active,
category_id) values (?, ?, ?, ?, ?)`;
        const data = [
          product.name,
          product.price,
          product.duedate,
          product.active ? 1 : 0,
          product.category_id,
        ];
        return db.executeSql(sql, data).catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public update(product: Product) {
    return this.dbProvider
      .getDB()
      .then((db: SQLiteObject) => {
        const sql = `update products set name = ?, price = ?, duedate =
?, active = ?, category_id = ? where id = ?`;
        const data = [
          product.name,
          product.price,
          product.duedate,
          product.active ? 1 : 0,
          product.category_id,
          product.id,
        ];
        return db.executeSql(sql, data).catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public remove(id: number) {
    return this.dbProvider
      .getDB()
      .then((db: SQLiteObject) => {
        const sql = `delete from products where id = ?`;
        const data = [id];
        return db.executeSql(sql, data).catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public get(id: number) {
    return this.dbProvider
      .getDB()
      .then((db: SQLiteObject) => {
        const sql = `select * from products where id = ?`;
        const data = [id];
        return db
          .executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              const item = data.rows.item(0);
              const product = new Product();
              product.id = item.id;
              product.name = item.name;
              product.price = item.price;
              product.duedate = item.duedate;
              product.active = item.active;
              product.category_id = item.category_id;
              return product;
            }
            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getAll(active: boolean, name: string = null) {
    return this.dbProvider
      .getDB()
      .then((db: SQLiteObject) => {
        let sql = `SELECT p.*, c.name as category_name FROM products p
inner join categories c on p.category_id = c.id where p.active = ?`;
        const data: any[] = [active ? 1 : 0];
        // filtrando pelo nome
        if (name) {
          sql += ` and p.name like ?`;
          data.push(`%` + name + `%`);
        }
        return db
          .executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              const products: any[] = [];
              for (let i = 0; i < data.rows.length; i++) {
                const product = data.rows.item(i);
                products.push(product);
              }
              return products;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}
export class Product {
  id: number;
  name: string;
  price: number;
  duedate: Date;
  active: boolean;
  category_id: number;
}
