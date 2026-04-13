import type { Tarefa } from "../../types";

const ItemCard = ({ nome, descricao, status, prioridade, estimativa, CategoriaId, categoria }: Tarefa) => {
    return (
        <div>
            <h2>{nome}</h2>
            <p>{descricao}</p>
            <p>{status}</p>
            <p>{prioridade}</p>
            <p>{estimativa?.toLocaleDateString()}</p>
            <p>{CategoriaId}</p>
            <p>{categoria?.nome}</p>
        </div>
    )
}

export default ItemCard;