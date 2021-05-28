import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BasedadosService } from './basedados.service';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  constructor(private dbProvider: BasedadosService) {}

  public getAll() {
    return this.dbProvider
      .getDB()
      .then((db: SQLiteObject) =>
        db
          .executeSql(`select * from categories`, [])
          .then((data: any) => {
            if (data.rows.length > 0) {
              const categories: any[] = [];
              for (let i = 0; i < data.rows.length; i++) {
                const category = data.rows.item(i);
                categories.push(category);
              }
              return categories;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e))
      )
      .catch((e) => console.error(e));
  }
}
