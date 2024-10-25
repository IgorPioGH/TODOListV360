CREATE TABLE users (
id_user SERIAL PRIMARY KEY,
nome VARCHAR(30)
);

CREATE TABLE listas (
id_lista SERIAL PRIMARY KEY,
id_user INTEGER REFERENCES users(id_user),
nome VARCHAR(50)
);

CREATE TABLE tarefas (
id_tarefa SERIAL PRIMARY KEY,
id_lista INTEGER REFERENCES listas(id_lista),
descricao VARCHAR(200),
status BOOLEAN DEFAULT true
);

INSERT INTO users (nome)
VALUES ('Igor');
INSERT INTO users (nome)
VALUES ('Duda');

INSERT INTO listas (id_user,nome)
VALUES (1, 'Cuidados da casa');
INSERT INTO listas(id_user, nome)
VALUES (1, 'Faculdade');
INSERT INTO listas(id_user,nome)
VALUES (2, 'SkinCare');

INSERT INTO tarefas (id_lista,descricao)
VALUES (2, 'Lavar louça');
INSERT INTO tarefas (id_lista, descricao)
VALUES (2, 'Comprar produtos de limpeza');
INSERT INTO tarefas (id_lista, descricao)
VALUES (3, 'Trabalho AED2');
INSERT INTO tarefas (id_lista, descricao)
VALUES (4, 'Esfoliação');