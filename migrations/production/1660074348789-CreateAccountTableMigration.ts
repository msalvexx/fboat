import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateAccountTableMigration1660074348789 implements MigrationInterface {
  private readonly create: string = `
  CREATE TABLE contas (
    id_conta varchar(255) UNIQUE NOT NULL,
    id_usuario varchar(255) NOT NULL,
    nome varchar(255) NOT NULL,
    sobrenome varchar(255) NOT NULL,
    profissao varchar(100) NOT NULL,
    foto varchar(255),
    data_nascimento DATETIME NOT NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP(),
    atualizado_em DATETIME DEFAULT CURRENT_TIMESTAMP(),
    ativo tinyint(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (id_conta),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
  )`
  private readonly drop: string = 'DROP table contas'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(this.create)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(this.drop)
  }
}
