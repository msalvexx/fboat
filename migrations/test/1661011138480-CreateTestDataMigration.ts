import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTestDataMigration1661011138480 implements MigrationInterface {
  private readonly createUsers: string = `
  INSERT INTO usuarios
    (id_usuario, email, senha, funcoes )
  VALUES
    ('0265bf42-67b2-46cb-933b-6c11400a22eb', 'admin@mail.com', '$2b$14$OHGCUZgJEQJjSISRzhvjTeJnOgY26Ctq0i8qVqJuW38Xez6GBzbEe', 'administrador'), 
    ('5d4eae2e-38f7-442a-9490-a1cff7cc4189', 'writer@mail.com', '$2b$14$xrnNcfGmsll2g3AuEaK9ruMwIRdk.Uhhdn8MPtaPLxqQ/P8vCbJku', 'escritor,leitor-veleiro');
  `
  private readonly createAccounts: string = `
  INSERT INTO contas
    (id_conta, id_usuario, nome, sobrenome, profissao, foto, data_nascimento)
  VALUES
    ('c77f7d99-c956-4dd2-a63f-b7a1ca6f28aa', '0265bf42-67b2-46cb-933b-6c11400a22eb', 'Danilo', 'Borba da Conceição', 'Professor Universitário', 'https://ui-avatars.com/api/?name=Danilo+Borba', '1978-07-05 00:00:00'),
    ('8f5aaf39-d388-4e00-8bd4-440f6c5d2e85', '5d4eae2e-38f7-442a-9490-a1cff7cc4189', 'Paula', 'Passos Menezes', 'Engenheira Elétrica', 'https://ui-avatars.com/api/?name=Paula+Passos', '1988-12-23 00:00:00');
  `
  private readonly createArticles: string = `
  INSERT INTO artigos
    (id_artigo, id_conta, slug, titulo, foto, resumo, conteudo, publicado, revisado_em, criado_em, publicado_em)
  VALUES
    ('6b1eec7e-ac93-4fb6-8924-0327a750b1e6', '8f5aaf39-d388-4e00-8bd4-440f6c5d2e85', 'artigo-1', 'Artigo 1', 'foto 1', 'resumo qualquer', 'PGh0bWw+PGRpdj5URVNURSAxPC9kaXY+PC9odG1sPg==', 1, '2022-12-23 00:00:00', '2022-12-23 00:00:00', '2022-12-23 00:00:00'),
    ('74ed31a1-2877-4763-8c53-9956645e5f2c', '8f5aaf39-d388-4e00-8bd4-440f6c5d2e85', 'artigo-2', 'Artigo 2', 'foto 2', 'resumo qualquer', 'PGh0bWw+PGRpdj5URVNURSAyPC9kaXY+PC9odG1sPg==', 0, '2022-12-23 00:00:00', '2022-12-23 00:00:00', '2022-12-23 00:00:00');
  `

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(this.createUsers)
    await queryRunner.query(this.createAccounts)
    await queryRunner.query(this.createArticles)
  }

  public async down (_: QueryRunner): Promise<void> {}
}
