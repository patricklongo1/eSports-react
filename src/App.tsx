import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import "./styles/main.css";
import logoImage from "./assets/logo-nlw-esports.svg";
import GameBanner from "./components/GameBanner";
import CreateAdBanner from "./components/CreateAdBanner";

import api from "./services/api";
import { GameController } from "phosphor-react";
import Input from "./components/Form/Input";

interface Game {
  id: string;
  bannerUrl: string;
  title: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    async function loadGameList() {
      try {
        const response = await api.get("/games");

        setGames(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    loadGameList();
  }, []);

  const weekDaysOptions = [
    { day: "Domingo", initial: "D" },
    { day: "Segunda", initial: "S" },
    { day: "Terça", initial: "T" },
    { day: "Quarta", initial: "Q" },
    { day: "Quinta", initial: "Q" },
    { day: "Sexta", initial: "S" },
    { day: "Sábado", initial: "S" },
  ];

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImage} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.length &&
          games.map((game) => (
            <GameBanner
              key={game.id}
              adsCount={game._count.ads}
              bannerUrl={game.bannerUrl}
              title={game.title}
            />
          ))}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
            <Dialog.Title className="text-3xl font-black">
              Publique um anúncio
            </Dialog.Title>
            <form action="" className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">
                  Qual o game?
                </label>
                <Input
                  id="game"
                  placeholder="Selecione o game que deseja jogar"
                  className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input id="name" placeholder="Como te chamam dentro do game?" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <Input
                    id="yearsPlaying"
                    type="number"
                    placeholder="Tudo bem ser zero"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="discord">Qual seu discord</label>
                  <Input id="discord" placeholder="Usuário#0000" />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="weekDays">Quando costuma jogar?</label>

                  <div className="grid grid-cols-4 gap-2">
                    {weekDaysOptions.map((item) => (
                      <button
                        key={item.day}
                        type="button"
                        className="mt-[0.8] w-8 h-11 rounded bg-zinc-900 hover:bg-zinc-800 transition-colors"
                        title={item.day}
                      >
                        {item.initial}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="discord">Qual horário do dia?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input id="hourStart" type="time" placeholder="De" />
                    <Input id="hourEnd" type="time" placeholder="Até" />
                  </div>
                </div>
              </div>

              <div className="mt-2 flex gap-2 text-sm">
                <Input type="checkbox" />
                Costume me conectar ao chat de voz
              </div>

              <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close type="button" className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 transition-colors">
                  Cancelar
                </Dialog.Close>
                <button
                  type="submit"
                  className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600 transition-colors"
                >
                  <GameController size={24} /> Encontrar duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default App;
