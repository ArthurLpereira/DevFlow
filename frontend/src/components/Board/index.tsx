import type { BoardProps } from "../../types";
import ItemColuna from "../Column";

const ItemBoard = ({ colunas, onStatusChange, onDelete, onEdit }: BoardProps) => {
    return (
        <div className="flex gap-4 overflow-x-auto p-6 h-full items-start justify-center">
            {colunas.map((coluna) => (
                <ItemColuna
                    {...coluna}
                    key={coluna.id}
                    onStatusChange={onStatusChange}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
}

export default ItemBoard;