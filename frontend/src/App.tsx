import type { Tarefa, Coluna } from "./types";
import BoardComponente from "./components/Board/index";
// Exemplo genérico com todos os campos obrigatórios preenchidos:
// Tarefa[] → lista de tarefas
// Coluna[] → lista de colunas, onde cada coluna TEM suas tarefas dentro

// Estrutura correta do mock:
const colunasFalsas: Coluna[] = [
  {
    id: 1,
    titulo: "A Fazer",       // campo de Coluna
    tarefas: [               // array de Tarefa dentro da Coluna
      {
        id: 1,
        nome: "Criar tela de login",
        status: "a_fazer",
        prioridade: "alta",
        CategoriaId: 1,
      }
    ]
  },
  {
    id: 2,
    titulo: "Em Andamento",
    tarefas: [{
      id: 1,
      nome: "Criar aaaaaaaaaaaaaaaa de login",
      status: "a_fazer",
      prioridade: "alta",
      CategoriaId: 1,
    }]              // coluna vazia também é válido
  }
]


// Exemplo genérico comentado:

function App() {
  return (
    <div>
      {/* Passe os dados mockados como prop */}
      <BoardComponente colunas={colunasFalsas} />
      {/* No seu caso: <ItemBoard colunas={seuArrayDeColunas} /> */}
    </div>
  );
}

export default App;