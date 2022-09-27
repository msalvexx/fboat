import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTestDataMigration1661011138480 implements MigrationInterface {
  private readonly article: string = `
  <p>I have been a self-taught programmer since I was 12 years old and sice then I’ve learned a ton of computer related stuff. I am definitely not a beginner anymore, but when exactly was the moment this has changed? Then it all clicked and I knew that <b>THERE IS ONE IMPORTANT THING</b> that separates the early-learners from the experienced coders.</p>
  <h4>Tough first steps</h4>
  <p>When you first start learning about programming, most people don’t know where to start. And I understand that. There are so many programming languages, specializations, platforms, code editors, you name it. It is overwhelming, at least it has been for me.</p>
  <p>So then you reach out to the community and ask. <b>“What to learn first? Which programming language is the best? Should I buy this book? Should I attend a bootcamp?”</b> Well, from my experience, you don’t get an answer, that would satisfy you, nor should it, because the replies usually look something along the lines of “It depends…” And I still think, that is the absolutely right answer. But as a noobie you don’t understand that.</p>
  <p>The things start really rolling when you finally make that first step and pick a programming language and finally start learning.</p>
  <h4>I want MORE!</h4>
  <p>You may find after a while, that the language does not actually suit all your needs. In my opinion (which many experienced software developers share), <b>there is no one language to rule them all,</b> not a single one can do everything better than others. There is JavaScript for Web, Swift for iOS Development, Python for Machine learning, C++ for Game Dev, and so on.</p>
  <p>So after stumbling through the basics you may be curious to try a different language. And this is again the part, where you start asking on Reddit or your more experienced programming buddies. “Which programming language should I learn?”</p>
  <h4>The breaking point</h4>
  <p>After a while you realize the truth. There is no “best programming language”. You simply start picking the languages which best suit your needs. And this is what I consider THE MOMENT you are not a beginner programmer anymore.</p>
  <p>As you grasp the fundamentals and learn the basic paradigms of coding, you no longer have a problem with simply looking up what a while-loop looks like in Rust or how to declare a function in C#.</p>
  <p>Yes, there are some concepts which are distinct for some languages but the basics are still the same. It is no longer about “what is the syntax to do this”, but rather “how to solve this problem and make it run efficiently”.</p>
  <p>I have recently started learning C and it has been a like a whole new exciting world for me. As I said, many things I knew from other languages, however, stuff like memory allocation or pointers completely blew my mind. Finally, I could understand how it all works on a deeper level.</p>
  <p>And this is always fascinating when I look into something that used to be like a black box for me.</p>
  <p>It has been a pleasure to share this idea with you and I hope you enjoyed my first post here on Medium</p>
  `
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
    (id_artigo, id_conta, slug, titulo, foto, resumo, conteudo, destacado, publicado, revisado_em, criado_em, publicado_em)
  VALUES
    ('6b1eec7e-ac93-4fb6-8924-0327a750b1e6', '8f5aaf39-d388-4e00-8bd4-440f6c5d2e85', 'artigo-1', 'Artigo 1', 'foto 1', 'resumo qualquer', 'PGh0bWw+PGRpdj5URVNURSAxPC9kaXY+PC9odG1sPg==', 0, 1, '2022-12-23 00:00:00', '2022-12-23 00:00:00', '2022-12-23 00:00:00'),
    ('74ed31a1-2877-4763-8c53-9956645e5f2c', '8f5aaf39-d388-4e00-8bd4-440f6c5d2e85', 'artigo-2', 'Artigo 2', 'foto 2', 'resumo qualquer', 'PGh0bWw+PGRpdj5URVNURSAyPC9kaXY+PC9odG1sPg==', 0, 1, '2022-12-23 00:00:00', '2022-12-23 00:00:00', '2022-12-23 00:00:00'),
    ('3e8081e9-93be-4ab4-9a36-4165c563035e', '8f5aaf39-d388-4e00-8bd4-440f6c5d2e85', 'a-sign-you-are-not-a-beginner-programmer-anymore', 'A Sign You Are Not A Beginner Programmer Anymore', 'https://miro.medium.com/max/2400/1*KRvhEGacBHexmoaBlbzKpQ.jpeg', 'And the single moment it all changed for me', '${this.article}', 0, 1, '2022-12-23 00:00:00', '2022-12-23 00:00:00', '2022-12-23 00:00:00');
  `

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(this.createUsers)
    await queryRunner.query(this.createAccounts)
    await queryRunner.query(this.createArticles)
  }

  public async down (_: QueryRunner): Promise<void> {}
}
