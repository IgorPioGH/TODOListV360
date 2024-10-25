// Importação de bibliotecas
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

// Inicialização do app e configuração da porta
const app = express();
const port = 3000;

// Configuração de conexão com o banco de dados
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "todolist",
    password: "HamburguerDeSiri2555#",
    port: 5432,
});

// Conexão com o banco
db.connect();

// Middleware para interpretar inputs e outputs do usuário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Configuração de visualização
app.set("view engine", "ejs");

// Função para obter todos os usuários
async function getUsuarios() {
    const result = await db.query(`SELECT * FROM users ORDER BY id_user ASC`);
    return result.rows;
}

// Função para obter tarefas ativas (não concluídas) de uma lista específica
async function getTarefasLista(id_lista) {
    const result = await db.query(`
        SELECT * FROM tarefas WHERE id_lista = $1 AND status = true
    `, [id_lista]);
    return result.rows;
}

// Função para obter tarefas concluídas de uma lista específica
async function getTarefasConcluidasLista(id_lista) {
    const result = await db.query(`
        SELECT * FROM tarefas WHERE id_lista = $1 AND status = false
    `, [id_lista]);
    return result.rows;
}

// Função para criar um novo usuário
async function criarUsuario(nome) {
    await db.query(`INSERT INTO users (nome) VALUES ($1)`, [nome]);
}

// Função para obter listas de um usuário específico
async function getListasUsuario(id) {
    const result = await db.query(`
        SELECT id_lista, nome FROM listas WHERE id_user = $1
    `, [id]);
    return result.rows;
}

// Função para obter o nome de um usuário específico
async function getNomeUsuario(id) {
    const result = await db.query(`SELECT nome FROM users WHERE id_user = $1`, [id]);
    return result.rows[0].nome;
}

// Função para criar uma nova tarefa em uma lista específica
async function criarTarefa(id_lista, descricao) {
    await db.query(`INSERT INTO tarefas (id_lista, descricao, status) VALUES ($1, $2, $3)`, [id_lista, descricao, true]);
}

// Função para criar uma nova lista para um usuário específico
async function criarLista(id_user, nome) {
    await db.query(`INSERT INTO listas (id_user, nome) VALUES ($1, $2)`, [id_user, nome]);
}

// Função para marcar uma tarefa como concluída (status = false)
async function concluirTarefa(id_tarefa) {
    await db.query(`UPDATE tarefas SET status = false WHERE id_tarefa = $1`, [id_tarefa]);
}

// Função para reabrir uma tarefa (status = true)
async function reabrirTarefa(id_tarefa) {
    await db.query(`UPDATE tarefas SET status = true WHERE id_tarefa = $1`, [id_tarefa]);
}

// Função para atualizar a descrição de uma tarefa específica
async function atualizarDescricaoTarefa(id_tarefa, novaDescricao) {
    await db.query(`UPDATE tarefas SET descricao = $1 WHERE id_tarefa = $2`, [novaDescricao, id_tarefa]);
}

// Rota inicial para exibir os botões dos usuários
app.get("/", async (req, res) => {
    const usuarios = await getUsuarios();
    res.render("index", { usuarios, listas: null, usuarioAtualNome: null });
});

// Rota para criar um novo usuário
app.post("/addUser", async (req, res) => {
    const { nome } = req.body;
    await criarUsuario(nome);
    res.redirect("/");
});

// Rota para exibir listas e tarefas de um usuário específico
app.get("/usuario/:id", async (req, res) => {
    const usuarioAtual = req.params.id;
    const usuarios = await getUsuarios();
    const listas = await getListasUsuario(usuarioAtual);
    const usuarioAtualNome = await getNomeUsuario(usuarioAtual);

    const listasComTarefas = await Promise.all(
        listas.map(async (lista) => {
            const tarefas = await getTarefasLista(lista.id_lista);
            return { ...lista, tarefas };
        })
    );

    res.render("index.ejs", {
        usuarios,
        usuarioAtual,
        usuarioAtualNome,
        listas: listasComTarefas,
    });
});

// Rota para ver tarefas concluídas de uma lista específica
app.get("/verConcluidas/:id_lista/:usuarioAtual", async (req, res) => {
    const { id_lista, usuarioAtual } = req.params;
    const usuarios = await getUsuarios();
    const listas = await getListasUsuario(usuarioAtual);
    const usuarioAtualNome = await getNomeUsuario(usuarioAtual);

    const listasComTarefas = await Promise.all(
        listas.map(async (lista) => {
            const tarefas = lista.id_lista == id_lista 
                ? await getTarefasConcluidasLista(id_lista)
                : await getTarefasLista(lista.id_lista);
            return { ...lista, tarefas };
        })
    );

    res.render("index.ejs", {
        usuarios,
        usuarioAtual,
        usuarioAtualNome,
        listas: listasComTarefas,
    });
});

// Rota para adicionar uma nova tarefa em uma lista específica
app.post("/addTask", async (req, res) => {
    const { id_lista, descricao } = req.body;
    await criarTarefa(id_lista, descricao);
    res.redirect(`/usuario/${req.body.usuarioAtualId}`);
});

// Rota para marcar uma tarefa como concluída
app.post("/concluirTarefa", async (req, res) => {
    const { id_tarefa, usuarioAtualId } = req.body;
    await concluirTarefa(id_tarefa);
    res.redirect(`/usuario/${usuarioAtualId}`);
});

// Rota para reabrir uma tarefa (marcar como não concluída)
app.post("/reabrirTarefa", async (req, res) => {
    const { id_tarefa, usuarioAtualId } = req.body;
    await reabrirTarefa(id_tarefa);
    res.redirect(`/usuario/${usuarioAtualId}`);
});

// Rota para criar uma nova lista para um usuário específico
app.post("/addList", async (req, res) => {
    const { usuarioAtual, nomeLista } = req.body;
    await criarLista(usuarioAtual, nomeLista);
    res.redirect(`/usuario/${usuarioAtual}`);
});

// Rota para atualizar a descrição de uma tarefa
app.post("/atualizarTarefa", async (req, res) => {
    const { id_tarefa, novaDescricao, usuarioAtualId } = req.body;
    await atualizarDescricaoTarefa(id_tarefa, novaDescricao);
    res.redirect(`/usuario/${usuarioAtualId}`);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
