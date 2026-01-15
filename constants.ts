import { Team } from './types';

export const ADMIN_PASSWORD = "admin888";

export const INITIAL_TEAMS: Team[] = [
  { id: 1, name: "穿山甲隊", icon: "fa-paw", color: "bg-amber-700", pin: "1001", totalScore: 0, history: [] },
  { id: 2, name: "台灣黑熊隊", icon: "special-bear", color: "bg-gray-900", pin: "1002", totalScore: 0, history: [] },
  { id: 3, name: "藍腹鷴隊", icon: "fa-feather-pointed", color: "bg-blue-700", pin: "1003", totalScore: 0, history: [] },
  { id: 4, name: "石虎隊", icon: "fa-cat", color: "bg-orange-600", pin: "1004", totalScore: 0, history: [] },
  { id: 5, name: "台灣獼猴隊", icon: "special-macaque", color: "bg-stone-600", pin: "1005", totalScore: 0, history: [] },
  { id: 6, name: "櫻花鉤吻鮭隊", icon: "fa-fish-fins", color: "bg-rose-500", pin: "1006", totalScore: 0, history: [] },
  { id: 7, name: "諸羅樹蛙隊", icon: "fa-frog", color: "bg-lime-600", pin: "1007", totalScore: 0, history: [] },
  { id: 8, name: "寬尾鳳蝶隊", icon: "fa-bug", color: "bg-purple-600", pin: "1008", totalScore: 0, history: [] },
  { id: 9, name: "台灣水鹿隊", icon: "special-sambar", color: "bg-stone-700", pin: "1009", totalScore: 0, history: [] },
  { id: 10, name: "帝雉隊", icon: "fa-crown", color: "bg-indigo-800", pin: "1010", totalScore: 0, history: [] },
];

export const STORAGE_KEY = 'mountain_exploration_v2';