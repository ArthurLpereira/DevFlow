import { useState } from "react";
import type { Categoria, TarefaEditData, TarefasPrioridade } from "../../types";
import { getCategoryColor } from "../../utils/categoryColors";

interface EditModalProps extends TarefaEditData {
    categorias: Categoria[];
    onSave: (id: number, dados: { nome: string; descricao?: string; prioridade: TarefasPrioridade; categoriaId: number | null }) => void;
    onCancel: () => void;
}

const prioridades: { value: TarefasPrioridade; label: string }[] = [
    { value: "urgente", label: "🔴 Urgente" },
    { value: "alta",    label: "🟠 Alta"    },
    { value: "media",   label: "🟡 Média"   },
    { value: "baixa",   label: "🟢 Baixa"   },
];

const EditModal = ({ id, nome, descricao, prioridade, categoriaId, categorias, onSave, onCancel }: EditModalProps) => {
    const [nomeVal, setNomeVal]           = useState(nome);
    const [descricaoVal, setDescricaoVal] = useState(descricao ?? "");
    const [prioridadeVal, setPrioridadeVal] = useState<TarefasPrioridade>(prioridade);
    const [categoriaVal, setCategoriaVal] = useState<number | null>(categoriaId);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!nomeVal.trim()) return;
        onSave(id, {
            nome: nomeVal.trim(),
            descricao: descricaoVal.trim() || undefined,
            prioridade: prioridadeVal,
            categoriaId: categoriaVal,
        });
    }

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={onCancel}
        >
            <div
                className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 w-96 flex flex-col gap-5 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-[#e6edf3] font-semibold text-base m-0">Editar tarefa</h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* Nome */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[#8b949e] text-xs font-medium">Nome</label>
                        <input
                            type="text"
                            value={nomeVal}
                            onChange={(e) => setNomeVal(e.target.value)}
                            className="
                                bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2
                                text-[#e6edf3] text-sm placeholder:text-[#484f58]
                                focus:outline-none focus:border-indigo-500 transition-colors
                            "
                            placeholder="Nome da tarefa"
                            required
                        />
                    </div>

                    {/* Descrição */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[#8b949e] text-xs font-medium">Descrição</label>
                        <textarea
                            value={descricaoVal}
                            onChange={(e) => setDescricaoVal(e.target.value)}
                            rows={3}
                            className="
                                bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2
                                text-[#e6edf3] text-sm placeholder:text-[#484f58]
                                focus:outline-none focus:border-indigo-500 transition-colors resize-none
                            "
                            placeholder="Descrição (opcional)"
                        />
                    </div>

                    {/* Prioridade + Categoria lado a lado */}
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-1.5 flex-1">
                            <label className="text-[#8b949e] text-xs font-medium">Prioridade</label>
                            <select
                                value={prioridadeVal}
                                onChange={(e) => setPrioridadeVal(e.target.value as TarefasPrioridade)}
                                className="bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-[#e6edf3] text-sm cursor-pointer focus:outline-none focus:border-indigo-500 transition-colors"
                            >
                                {prioridades.map((p) => (
                                    <option key={p.value} value={p.value}>{p.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5 flex-1">
                            <label className="text-[#8b949e] text-xs font-medium">Categoria</label>
                            <select
                                value={categoriaVal ?? ""}
                                onChange={(e) => setCategoriaVal(e.target.value ? Number(e.target.value) : null)}
                                className="bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-[#e6edf3] text-sm cursor-pointer focus:outline-none focus:border-indigo-500 transition-colors"
                            >
                                <option value="">Sem categoria</option>
                                {categorias.map((c) => {
                                    const cor = getCategoryColor(c.id);
                                    return (
                                        <option key={c.id} value={c.id} style={{ color: cor.color }}>
                                            {c.nome}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>

                    {/* Botões */}
                    <div className="flex gap-2 pt-1">
                        <button type="button" onClick={onCancel}
                            className="flex-1 px-4 py-2 rounded-lg border border-[#30363d] text-[#8b949e] text-sm hover:bg-[#21262d] transition-colors cursor-pointer">
                            Cancelar
                        </button>
                        <button type="submit"
                            className="flex-1 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors cursor-pointer">
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;
