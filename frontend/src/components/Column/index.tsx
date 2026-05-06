import type { Coluna, TarefasStatus, TarefaEditData } from "../../types";
import ItemCard from "../Card/index";

interface ItemColunaProps extends Coluna {
    onStatusChange: (id: number, novoStatus: TarefasStatus) => void;
    onDelete: (id: number) => void;
    onEdit: (dados: TarefaEditData) => void;
}

const ItemColuna = ({ titulo, tarefas, status, onStatusChange, onDelete, onEdit }: ItemColunaProps) => {
    return (
        <div
            className="flex-shrink-0 w-72 bg-[#161b22] rounded-xl border border-[#30363d] flex flex-col"
            style={{ maxHeight: 'calc(100vh - 140px)' }}
        >
            {/* Cabeçalho */}
            <div className="px-4 pt-4 pb-3 border-b border-[#30363d]">
                <div className={`h-0.5 w-full rounded-full mb-3 col-accent-${status}`} />
                <div className="flex items-center justify-between">
                    <h2 className="text-[#e6edf3] font-semibold text-sm m-0">{titulo}</h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium col-count-${status}`}>
                        {tarefas.length}
                    </span>
                </div>
            </div>

            {/* Lista de cards */}
            <div className="column-cards flex flex-col gap-2 p-3 overflow-y-auto flex-1">
                {tarefas.length === 0 ? (
                    <p className="text-[#484f58] text-xs text-center py-8 m-0">
                        Nenhuma tarefa
                    </p>
                ) : (
                    tarefas.map((tarefa) => (
                        <ItemCard
                            {...tarefa}
                            key={tarefa.id}
                            onStatusChange={onStatusChange}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default ItemColuna;