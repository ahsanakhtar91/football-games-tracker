import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_ENDPOINTS, authorizationHeader } from "./config/index";
import { FETCH_FOOTBALL_GAMES } from "./redux/actions/types";
import { commonThunk } from "./redux/thunk";
import { FILTER_OPTIONS, GameDetail } from "./types";
import { getFilteredResponse } from "./utils";
import Card from "./components/Card";
import FiltersContainer from "./components/FiltersContainer";
import MadeBy from "./components/MadeBy";
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
  const filterApplied = useSelector(
    (state: any) => state?.gamesReducer?.filterApplied
  );

  const [state, setState] = useState<IAppState>({
    data: null,
    loadedItems: 30,
    filterOption: FILTER_OPTIONS.SHOW_ALL,
  });

  const response: Array<GameDetail> = state?.data?.response ?? [];

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
      <FiltersContainer />

      <ul className="cards-list">
        {(
          (filterApplied
            ? getFilteredResponse(response, filterApplied)
            : response) ?? []
        )
          ?.slice(0, state?.loadedItems)
          ?.map((cardData: GameDetail, index: number) => (
            <Card
              key={`${index}_${filterApplied}`}
              cardData={cardData}
              index={index}
            />
          ))}
      </ul>

      <MadeBy />
    </div>
  );
};

export default App;
