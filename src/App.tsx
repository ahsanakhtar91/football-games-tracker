import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_ENDPOINTS, authorizationHeader } from "./config/index";
import { FETCH_FOOTBALL_GAMES } from "./redux/actions/types";
import { commonThunk } from "./redux/thunk";
import { GameDetail } from "./types";
import Link from "./components/Link";
import Card from "./components/Card";
import "./scss/main.scss";

const App = () => {
  const dispatch = useDispatch();

  const footballGamesContent = useSelector(
    (state: any) => state?.gamesReducer?.footballGamesContent
  );

  const [state, setState] = useState<any>({
    data: null,
  });

  const { response, parameters, paging } = state?.data ?? {};
  console.log(state); // ahsan

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

  console.log(state?.data); // ahsan

  return (
    <div className="football-games-tracker">
      <ul className="cards-list">
        {response?.map((cardData: GameDetail, index: number) => (
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
