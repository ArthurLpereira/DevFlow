interface ConfirmModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmModal = ({ onConfirm, onCancel }: ConfirmModalProps) => {
    return (
        // Overlay escuro — clicar fora cancela
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={onCancel}
        >
            {/* Modal — stopPropagation evita fechar ao clicar dentro */}
            <div
                className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 w-80 flex flex-col gap-4 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Ícone de alerta */}
                <div className="w-11 h-11 rounded-full bg-red-500/15 flex items-center justify-center mx-auto">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </div>

                {/* Texto */}
                <div className="text-center">
                    <h3 className="text-[#e6edf3] font-semibold text-base m-0 mb-1">Excluir tarefa</h3>
                    <p className="text-[#8b949e] text-sm m-0">Essa ação não pode ser desfeita. Tem certeza?</p>
                </div>

                {/* Botões */}
                <div className="flex gap-2">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-2 rounded-lg border border-[#30363d] text-[#8b949e] text-sm hover:bg-[#21262d] transition-colors cursor-pointer"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2 rounded-lg bg-red-500/90 text-white text-sm font-medium hover:bg-red-500 transition-colors cursor-pointer"
                    >
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
