import axios from 'axios';
import { BichoGame, Command, DiscordUser, WeeklyHuntersTopDated } from './api.types';

const fetch = async <R>(route: string): Promise<R> => {
  const res = await axios.get<R>(process.env.NEXT_PUBLIC_API_URL + route).catch((err) => {
    console.error(`Error fetching data for route '${route}': ${err.message ?? err.reason}`);
    console.error(JSON.stringify(err));
    throw err;
  });

  return res.data;
};

export const fetchGithub = async (): Promise<string> => {
  const res = await axios.get(
    'https://raw.githubusercontent.com/MenheraBot/MenheraBot/master/CHANGELOG',
  );

  return res.data;
};

export const fetchCommands = (): Promise<Command[]> => fetch('/commands');

export const fetchWeeklyHunters = (): Promise<WeeklyHuntersTopDated> => fetch('/hunts');

export const getBichoGames = (page: number): Promise<BichoGame[]> => fetch(`/bicho?page=${page}`);

export const getUsers = async (users: string[]): Promise<DiscordUser[]> => {
  const res = await axios.get(`${process.env.PRIVATE_API_URL}/users`, {
    headers: {
      Authorization: process.env.PRIVATE_API_TOKEN,
    },
    params: {
      users,
    },
  });

  return res.data;
};
