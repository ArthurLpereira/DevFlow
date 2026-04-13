import type { BoardProps } from "../../types";
import ItemColuna from "../Column";

const ItemBoard = ({ colunas }: BoardProps) => {
    return (
        <div>
            {colunas.map((coluna) => (
                <ItemColuna {...coluna} key={coluna.id} />
            ))}
        </div>
    )
}

export default ItemBoard;