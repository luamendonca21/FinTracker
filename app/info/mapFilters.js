const cetaceanFilters = [
  { id: 0, title: "Golfinho", category: "Categoria" },
  { id: 1, title: "Baleia", category: "Categoria" },
  { id: 2, title: "Orca", category: "Categoria" },
  { id: 3, title: "Menos de 1 ano", category: "Longevidade" },
  { id: 4, title: "1 - 5 anos", category: "Longevidade" },
  { id: 5, title: "6 - 10 anos", category: "Longevidade" },
  { id: 6, title: "11 - 20 anos", category: "Longevidade" },
  { id: 7, title: "21 - 30 anos", category: "Longevidade" },
  { id: 8, title: "31 - 40 anos", category: "Longevidade" },
  { id: 9, title: "41 - 50 anos", category: "Longevidade" },
  { id: 10, title: "Mais de 50 anos", category: "Longevidade" },
  { id: 11, title: "Preocupação menor", category: "Estado de conservação" },
  { id: 12, title: "Vulnerável", category: "Estado de conservação" },
  { id: 13, title: "Dados insuficientes", category: "Estado de conservação" },
  { id: 14, title: "Menos de 0,1 m", category: "Comprimento máximo" },
  { id: 15, title: "0,1 - 0,3 m", category: "Comprimento máximo" },
  { id: 16, title: "0,31 - 0,50 m", category: "Comprimento máximo" },
  { id: 17, title: "0,51 - 1 m", category: "Comprimento máximo" },
  { id: 18, title: "1,01 - 2 m", category: "Comprimento máximo" },
  { id: 19, title: "2,01 - 5 m", category: "Comprimento máximo" },
  { id: 20, title: "Mais de 5 m", category: "Comprimento máximo" },
  { id: 21, title: "Peixes", category: "Alimentação" },
  { id: 22, title: "Peixes de grande porte", category: "Alimentação" },
  { id: 23, title: "Polvos", category: "Alimentação" },
  { id: 24, title: "Crustáceos", category: "Alimentação" },
  { id: 25, title: "Lulas", category: "Alimentação" },
  { id: 26, title: "Tubarões", category: "Alimentação" },
];

const activityFilters = [
  { id: 0, title: "Últimas 24 horas", category: "Atividade" },
  { id: 1, title: "Últimos 7 dias", category: "Atividade" },
  { id: 2, title: "Últimas 4 semanas", category: "Atividade" },
  { id: 3, title: "Últimos 12 meses", category: "Atividade" },
];

export { cetaceanFilters, activityFilters };
