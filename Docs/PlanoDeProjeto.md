# Plano de Projeto - TO DO LIST
**Igor Ferronato Fonseca Pio**
# 1. Escopo
### Funções do Software
- O usuário deve ser capaz de criar uma lista de tarefas;
- O usuário deve ser capaz de adicionar uma tarefa a uma lista;
- O usuário deve ser capaz de editar uma tarefa;
- O usuário deve ser capaz de marcar uma tarefa como concluída;
- O usuário deve ser capaz de deletar uma tarefa que não precisa mais;
- O usuário pode ter mais de uma lista de tarefas;
- O usuário pode dar nomes as listas;
- O usuário pode filtrar as tarefas entre concluídas/não concluídas
### Desempenho do Software
- Software deve ser almost in real time;
- Software deve ser agradável e intuitivo;
### Restrições
- Rodar em uma página no navegador
- Localmente conectado ao postgres
### Interfaces
- Interface para um usuário
- Permitir a criação de novos usuários
- Permitir troca de usuário
- Permitir adição, edição e remoção de tarefas
### Confiabilidade
- Serviço estável sem queda por concorrência
# 2. Medidas e Métricas
### Métricas de Qualidade
- Corretitude:
    - Quão bem o software executa sua função?
- Manutenibilidade:
    - Facilidade com que os erros podem ser corrigidos
- Usabilidade:
    - Quantificação da facilidade de uso
# 3. Estimativas
### Planejamento
- Projeto Pequeno, um dia para o planejamento
### Modelagem e construção
- Projeto simples, com muita referência, dois dias para modelagem e construção
### Finalização e testes
- Seguindo os passos corretos e com boas práticas, apenas algumas horas serão necessárias

# 4. Requisitos do Sistema
- *Requisitos Funcionais:*
    - Sistema deve permitir adição, edição e exclusão de tarefas
    - O usuário deve conseguir visualizar todas as tarefas de uma lista
    - O usuário deve conseguir manipular listas de listas
- *Requisitos Não Funcionais:*
    - Design Intuitivo
    - Performático
    - Simples e agradável de usar

# 5. Tecnologias Utilizadas
- Frontend $\large\to$ EJS (HTML), CSS;
- Backend $\large\to$ Node.js(gerenciamento e comunicação com banco de dados) / Express (MVC)
- Banco de Dados: PostgreSQL
- Versionamento e monitoramento: Git/GitHub

# 6. Arquitetura do Sistema
- O projeto utilizará **Arquitetura MVC** para separar as responsabilidades da aplicação e melhorar a **modularização**
    - Para garantir melhor organização e facilidade de manutenção e correção de erros
- Modelo (M) $\large\to$ Responsável por gerenciar a lógica de dados, interação com o banco de dados
- Visão (V) $\large\to$ Responsável pela interface com o usuário, receber interações do usuário
- Controlador (C) $\large\to$ O intermediário entre Modelo e Visão, responsável por gerenciar as requisições do usuário, manipulando dados pelo Modelo e os atualizando na Visão.

# 7. Cronograma
- **Fase 1** $\large\to$ Planejamento (1 dia): Definição do Escopo, requisitos, plano de projeto
- **Fase 2** $\large\to$  Modelagem e Desenvolvimento (2 dias): Esboços das interfaces, backend, frontend
- **Fase 3** $\large\to$ Testes e Documentação do projeto (1 dia)

| Fase |Tempo (dias)| Descrição |
| --- |:---:| --- |
| `Planejamento` |1 | Definição do Escop, requisitos e plano de projeto |
| `Modelagem e Desenvolvimento` |2| Esboços das interfaces, backend, frontend |
|`Testes e Documentação`|1|Correção de erros e gerar documentação do projeto|

# 8. Riscos e Desafios
- Garantir responsividade no tempo exigido
- Integração ótima com banco de dados pode levar tempo
- Querer arrumar detalhes antes das funionalidades principais pode atrapalhar

# 9. Critério de Aceitação
- Estar com todos os requisitos completos

# 10. Conclusão
- Este projeto é importante, pois me deu a oportunidade de tirar um tempo para um projeto que já planejava fazer a tempos. Utilizando tecnologias parecidas com as utilizadas na V360 e também praticar conceitos e boas práticas de Engenharia de Software, que normalmente são ignoradas em projetos pessoais.
