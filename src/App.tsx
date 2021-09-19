import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_ENDPOINTS, authorizationHeader } from "./config/index";
import { FETCH_FOOTBALL_GAMES } from "./redux/actions/types";
import { commonThunk } from "./redux/thunk";
import { FILTER_OPTION, GameDetail } from "./types";
import Link from "./components/Link";
import Card from "./components/Card";
import "./scss/main.scss";

interface IAppState {
  data: any;
  loadedItems: number;
  filterOption: string;
}

const App = () => {
  const dispatch = useDispatch();

  const footballGamesContent = useSelector(
    (state: any) => state?.gamesReducer?.footballGamesContent
  );

  const [state, setState] = useState<IAppState>({
    data: null,
    loadedItems: 30,
    filterOption: FILTER_OPTION.SHOW_ALL,
  });

  const { response } = state?.data ?? {};

  useEffect(() => {
    dispatch(
      commonThunk({
        actionType: FETCH_FOOTBALL_GAMES,
        options: {
          url: API_ENDPOINTS.fetchFootballGames,
          headers: {
            Authorization: authorizationHeader,
          },
          method: "GET",
        },
      })
    );
  }, []);

  useEffect(() => {
    if (footballGamesContent) {
      setState((prevState: any) => ({
        ...prevState,
        data: footballGamesContent,
      }));
    }
  }, [footballGamesContent]);

  return (
    <div className="football-games-tracker">
      <ul className="cards-list">
        {(response ?? [])
          ?.slice(0, state?.loadedItems)
          ?.map((cardData: GameDetail, index: number) => (
            <Card cardData={cardData} index={index} />
          ))}
      </ul>

      <h3 className="copyrights">
        Created by <strong>Ahsan Akhtar</strong>
      </h3>
      <h3 className="copyrights-links">
        <Link
          label="LinkedIn"
          url={"https://www.linkedin.com/in/m-ahsan-akhtar-69772067"}
        />
        {" | "}
        <Link
          label="GitHub"
          url={"https://github.com/ahsanakhtar91/practice_tasks"}
        />
      </h3>
    </div>
  );
};

export default App;
