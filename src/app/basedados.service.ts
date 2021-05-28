import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root',
})
export class BasedadosService {
  constructor(private sqlite: SQLite) {}
  public getDB() {
    return this.sqlite.create({
      name: 'products.db',
      location: 'default',
    });
  }

  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
        // Criando as tabelas
        this.createTables(db);
        // Inserindo dados de categorias
        this.insertDefaultItems(db);
      })
      .catch((e) => console.log(e));
  }

  private createTables(db: SQLiteObject) {
    db.sqlBatch([
      [
        `CREATE TABLE IF NOT EXISTS categories (id integer primary key
AUTOINCREMENT NOT NULL, name TEXT)`,
      ],
      [
        `CREATE TABLE IF NOT EXISTS products (id integer primary
key AUTOINCREMENT NOT NULL, name TEXT, price REAL, duedate DATE, active
integer, category_id integer, FOREIGN KEY(category_id) REFERENCES
   categories(id))`,
      ],
    ])
      .then(() => console.log('Tabelas criadas'))
      .catch((e) => console.error('Erro ao criar as tabelas', e));
  }

  private insertDefaultItems(db: SQLiteObject) {
    db.executeSql(`select COUNT(id) as qtd from categories`, [])
      .then(async (data: any) => {
        //Se não existe nenhum registro
        if (data.rows.item(0).qtd === 0) {
          //Registra categorias iniciais
          await db
            .sqlBatch([
              [`insert into categories (name) values (?)`, [`Computadores`]],
              [`insert into categories (name) values (?)`, [`Acessórios`]],
              [`insert into categories (name) values (?)`, [`Impressoras`]],
            ])
            .then(() => console.log(`Dados de categorias incluídos`))
            .catch((e) =>
              console.error(
                `Erro ao incluir dados de
categorias`,
                e
              )
            );
        }
      })
      .catch((e) => console.error(`Erro ao consultar a tabela categorias`, e));
  }
}
