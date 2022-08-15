import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTestDataMigration1660588408599 implements MigrationInterface {
  private readonly createUsers: string = `
  INSERT INTO usuarios
    ( id_int, id_usuario, email, senha, funcoes )
  VALUES
    (1, '0265bf42-67b2-46cb-933b-6c11400a22eb', 'admin@mail.com', '$2b$14$OHGCUZgJEQJjSISRzhvjTeJnOgY26Ctq0i8qVqJuW38Xez6GBzbEe', 'administrador'), 
    (2, '5d4eae2e-38f7-442a-9490-a1cff7cc4189', 'writer@mail.com', '$2b$14$xrnNcfGmsll2g3AuEaK9ruMwIRdk.Uhhdn8MPtaPLxqQ/P8vCbJku', 'escritor,leitor-veleiro');
  `
  private readonly createAccounts: string = `
  INSERT INTO contas
    (id_int, id_conta, id_int_usuario, nome, sobrenome, profissao, data_nascimento)
  VALUES
    (1, 'c77f7d99-c956-4dd2-a63f-b7a1ca6f28aa', 1, 'Danilo', 'Borba da Conceição', 'Professor Universitário', '1978-07-05 00:00:00'),
    (2, '8f5aaf39-d388-4e00-8bd4-440f6c5d2e85', 2, 'Paula', 'Passos Menezes', 'Engenheira Elétrica', '1988-12-23 00:00:00');
  `

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(this.createUsers)
    await queryRunner.query(this.createAccounts)
  }

  public async down (_: QueryRunner): Promise<void> {}
}
