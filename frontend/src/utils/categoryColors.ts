// Paleta de cores para categorias — atribuída pelo id da categoria
const PALETTE = [
    { bg: 'rgba(59,  130, 246, 0.18)', color: '#60a5fa' }, // blue
    { bg: 'rgba(139,  92, 246, 0.18)', color: '#a78bfa' }, // violet
    { bg: 'rgba(236,  72, 153, 0.18)', color: '#f472b6' }, // pink
    { bg: 'rgba(20,  184, 166, 0.18)', color: '#2dd4bf' }, // teal
    { bg: 'rgba(249, 115,  22, 0.18)', color: '#fb923c' }, // orange
    { bg: 'rgba(132, 204,  22, 0.18)', color: '#a3e635' }, // lime
    { bg: 'rgba(234, 179,   8, 0.18)', color: '#fbbf24' }, // yellow
    { bg: 'rgba(239,  68,  68, 0.18)', color: '#f87171' }, // red
];

export function getCategoryColor(id: number) {
    return PALETTE[id % PALETTE.length];
}
