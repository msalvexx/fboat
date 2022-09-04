import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUserTableMigration1660074324941 implements MigrationInterface {
  private readonly createDb: string = `
  CREATE TABLE usuarios (
    id_usuario varchar(255) UNIQUE NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
    senha varchar(255) NOT NULL,
    funcoes varchar(255) NOT NULL DEFAULT '',
    PRIMARY KEY (id_usuario)
  )`
  private readonly createIndex: string = 'CREATE UNIQUE INDEX email_idx ON usuarios(email)'
  private readonly dropDb: string = 'DROP TABLE usuarios'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(this.createDb)
    await queryRunner.query(this.createIndex)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(this.dropDb)
  }
}
