import type { Tarefa, TarefasStatus, TarefaEditData } from "../../types";
import { getCategoryColor } from "../../utils/categoryColors";

const priorityConfig = {
    urgente: { label: "Urgente", className: "bg-red-500/20 text-red-400"       },
    alta:    { label: "Alta",    className: "bg-orange-500/20 text-orange-400" },
    media:   { label: "Média",   className: "bg-yellow-500/20 text-yellow-400" },
    baixa:   { label: "Baixa",   className: "bg-green-500/20 text-green-400"   },
};

const statusLabels: Record<TarefasStatus, string> = {
    a_fazer:      "A Fazer",
    em_andamento: "Em Andamento",
    fazendo:      "Revisão",
    pronto:       "Pronto",
};

interface ItemCardProps extends Tarefa {
    onStatusChange: (id: number, novoStatus: TarefasStatus) => void;
    onDelete: (id: number) => void;
    onEdit: (dados: TarefaEditData) => void;
}

const ItemCard = ({ id, nome, descricao, prioridade, status, estimativa, categoriaId, categoria, onStatusChange, onDelete, onEdit }: ItemCardProps) => {
    const priority   = priorityConfig[prioridade];
    const catColor   = categoria ? getCategoryColor(categoria.id) : null;

    return (
        <div className="
            group relative
            bg-[#21262d] border border-[#30363d] rounded-lg p-3
            flex flex-col gap-2 cursor-pointer
            transition-all duration-200
            hover:bg-[#292e36] hover:border-[#484f58]
            hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30
        ">
            {/* Ações — aparecem ao hover */}
            <div className="absolute top-2 right-2 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                <button
                    onClick={(e) => { e.stopPropagation(); onEdit({ id, nome, descricao, prioridade, categoriaId }); }}
                    className="p-1 rounded text-[#6e7681] hover:text-indigo-400 hover:bg-indigo-500/10 transition-all duration-150 cursor-pointer"
                    title="Editar tarefa"
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(id); }}
                    className="p-1 rounded text-[#6e7681] hover:text-red-400 hover:bg-red-500/10 transition-all duration-150 cursor-pointer"
                    title="Excluir tarefa"
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>

            {/* Prioridade + Categoria */}
            <div className="flex items-center gap-1.5 flex-wrap pr-14">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${priority.className}`}>
                    {priority.label}
                </span>
                {categoria && catColor && (
                    <span
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                        style={{ background: catColor.bg, color: catColor.color }}
                    >
                        {categoria.nome}
                    </span>
                )}
            </div>

            {/* Título */}
            <h3 className="text-[#e6edf3] font-medium text-sm leading-snug m-0">
                {nome}
            </h3>

            {/* Descrição */}
            {descricao && (
                <p className="text-[#8b949e] text-xs leading-relaxed m-0 line-clamp-2">
                    {descricao}
                </p>
            )}

            {/* Estimativa */}
            {estimativa && (
                <p className="text-[#484f58] text-[10px] m-0">
                    📅 {new Date(estimativa).toLocaleDateString("pt-BR")}
                </p>
            )}

            {/* Seletor de status */}
            <select
                value={status}
                onChange={(e) => onStatusChange(id, e.target.value as TarefasStatus)}
                onClick={(e) => e.stopPropagation()}
                className="
                    mt-1 w-full bg-[#0d1117] border border-[#30363d] text-[#8b949e]
                    text-[11px] rounded-md px-2 py-1 cursor-pointer
                    hover:border-[#484f58] focus:outline-none focus:border-indigo-500
                    transition-colors
                "
            >
                {(Object.keys(statusLabels) as TarefasStatus[]).map((s) => (
                    <option key={s} value={s}>{statusLabels[s]}</option>
                ))}
            </select>
        </div>
    );
}

export default ItemCard;