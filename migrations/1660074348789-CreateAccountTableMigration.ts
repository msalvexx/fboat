import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateAccountTableMigration1660074348789 implements MigrationInterface {
  private readonly create: string = `
  CREATE TABLE contas (
    id_int int NOT NULL AUTO_INCREMENT,
    id_conta varchar(255) UNIQUE NOT NULL,
    id_int_usuario int NOT NULL,
    nome varchar(255) NOT NULL,
    sobrenome varchar(255) NOT NULL,
    profissao varchar(100) NOT NULL,
    data_nascimento DATETIME NOT NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP(),
    atualizado_em DATETIME DEFAULT CURRENT_TIMESTAMP(),
    ativo tinyint(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (id_int),
    FOREIGN KEY (id_int_usuario) REFERENCES usuarios(id_int)
  )`
  private readonly drop: string = 'DROP table contas'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(this.create)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(this.drop)
  }
}
