import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
import routes from "../navigation/routes";

export const mapScreenFilters = [
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
  { id: 23, title: "Peixes pequenos", category: "Alimentação" },
  { id: 24, title: "Cefalópodes", category: "Alimentação" },
  { id: 25, title: "Krill", category: "Alimentação" },
  { id: 26, title: "Crustáceos", category: "Alimentação" },
];

export const activityScreenFilters = [
  { id: 0, title: "Últimas 24 horas", category: "Atividade" },
  { id: 1, title: "Últimos 7 dias", category: "Atividade" },
  { id: 2, title: "Últimas 4 semanas", category: "Atividade" },
  { id: 3, title: "Últimos 12 meses", category: "Atividade" },
];

export const homeScreenShortcuts = [
  {
    id: 0,
    title: "Cetáceos favoritos",
    subTitle: "Visualiza os teus cetáceos favoritos.",
    buttonTitle: "Ir para favoritos",
    target: "Profile",
    icons: (
      <>
        <MaterialIcons
          style={{
            position: "absolute",
            top: 10,
            right: 10,
          }}
          size={120}
          name="favorite"
          color="red"
        />
        <MaterialCommunityIcons
          style={{
            position: "absolute",
            top: 60,
            right: 30,
          }}
          size={50}
          name="gesture-tap"
          color={defaultStyles.colors.white}
        />
      </>
    ),
  },
  {
    id: 1,
    title: "Funcionalidades",
    subTitle: "Descobre o que podes fazer.",
    buttonTitle: "Ir para funcionalidades",
    target: routes.FEATURE,
    icons: (
      <MaterialIcons
        style={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
        size={120}
        name="stars"
        color={defaultStyles.colors.thirdly}
      />
    ),
  },
  {
    id: 2,
    title: "Definições",
    subTitle: "Personaliza as tuas definições.",
    buttonTitle: "Ir para definições",
    target: routes.SETTINGS,
    icons: (
      <MaterialIcons
        style={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
        size={120}
        name="settings"
        color={defaultStyles.colors.medium}
      />
    ),
  },
];

export const features = [
  {
    id: 0,
    title: "Conhecimento",
    icon: "menu-book",
    description:
      "Conhece ao detalhe os animais, a sua vida, história e migração.",
  },
  {
    id: 1,
    title: "Mapa",
    icon: "map",
    description:
      "Segue o rastro dos animais com o mapa e filtra os teus resultados.",
  },
  {
    id: 2,
    title: "Animais próximos",
    icon: "map-marker-distance",
    description: "Encontra animais incríveis perto de ti.",
  },
  {
    id: 3,
    title: "Rota de migração",
    icon: "map-marker-path",
    description: "Descobre todo o caminho percorrido pelos animais.",
  },
  /* {
    id: 2,
    title: "Notificações",
    icon: "notifications",
    description:
      "Podes personalizar as tuas notificações, e definir para ser notificado se algum cetáceo estiver perto de ti ou de um local personalizado.",
  }, */
  {
    id: 4,
    title: "Ganha pontos",
    description: "Ganha 5 pontos ao estares próximo de um animal.",
  },
  {
    id: 5,
    icon: "lock-open",
    title: "Desbloqueio do perfil completo do animal",
    description: "Ganha acesso ao perfil completo do animal visitando-o.",
  },
  /*  {
    id: 4,
    icon: "list",
    title: "Obter mais cetáceos",
    description: "Tem acesso a mais 5 cetáceos por cada 20 pontos que ganha.",
  }, */
  {
    id: 6,
    icon: "stars",
    title: "Ranking",
    description:
      "Descobre os líderes do ranking e desafia os outros utilizadores.",
  },
];

export const toolTipsCetaceanDetails = [
  {
    id: 0,
    title: "Nome Científico",
    description: "Nome único que identifica a espécie de cetáceo",
  },
  {
    id: 1,
    title: "Longevidade",
    description: "Expectativa de vida média da espécie.",
  },
  {
    id: 2,
    title: "Estado de Conservação",
    description: "Nível de ameaça enfrentado pela espécie.",
  },
  {
    id: 3,
    title: "Categoria",
    description: "Classificação taxonômica da espécie.",
  },
  {
    id: 4,
    title: "Comprimento Máximo",
    description: "Tamanho máximo que a espécie pode atingir.",
  },
  {
    id: 5,
    title: "Alimentação",
    description: "Tipo de dieta seguida pela espécie.",
  },
];
