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
// Função para obter tarefas de uma lista específica
async function getTarefasLista(id_lista) {
    const result = await db.query(`
        SELECT * FROM tarefas WHERE id_lista = $1
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
    return result.rows[0].nome;  // Retorna apenas o nome do usuário
}

// Função para criar uma nova tarefa em uma lista específica
async function criarTarefa(id_lista, descricao) {
    await db.query(`INSERT INTO tarefas (id_lista, descricao, status) VALUES ($1, $2, $3)`, [id_lista, descricao, false]);
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
    res.redirect("/");  // Redireciona de volta para a página inicial
});

// Rota para exibir listas e tarefas de um usuário específico
app.get("/usuario/:id", async (req, res) => {
    const usuarioAtual = req.params.id;
    const usuarios = await getUsuarios();
    const listas = await getListasUsuario(usuarioAtual);
    const usuarioAtualNome = await getNomeUsuario(usuarioAtual);

    // Carrega tarefas para cada lista e inclui o nome da lista
    const listasComTarefas = await Promise.all(
        listas.map(async (lista) => {
            const tarefas = await getTarefasLista(lista.id_lista);
            return { ...lista, tarefas };  // Inclui o nome e as tarefas da lista
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
    res.redirect(`/usuario/${req.body.usuarioAtualId}`);  // Redireciona para o usuário atual
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
