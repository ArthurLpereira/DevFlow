import type { Coluna } from "../../types";
import ItemCard from "../Card/index";

const ItemColuna = ({ titulo, tarefas }: Coluna) => {
    return (
        <div>
            <h2>{titulo}</h2>

            {tarefas.map((tarefa) => (
                <ItemCard {...tarefa} key={tarefa.id} />
            ))}
        </div>
    );
};

export default ItemColuna;