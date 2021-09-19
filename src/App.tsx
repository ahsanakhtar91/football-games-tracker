import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_ENDPOINTS, authorizationHeader } from "./config/index";
import { FETCH_FOOTBALL_GAMES } from "./redux/actions/types";
import { commonThunk } from "./redux/thunk";
import "./scss/main.scss";
import { Fixture } from "./types";

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
        {response?.map((card: any, index: number) => {
          console.log(card);
          const fixture: Fixture = card?.fixture;
          console.log(fixture);
          return (
            <li key={index} className="card-container">
              <div className="card">
                <div className="card-header">
                  <div className="status">
                    {!fixture?.status?.elapsed ||
                    fixture?.status?.elapsed === 90 ? (
                      <div className="status-green">{"TBD"}</div>
                    ) : (
                      <div className="status-red">
                        <span>.</span>
                        {"Live"}
                      </div>
                    )}
                  </div>

                  <div className="title">
                    <div className="image">
                      <img src={card?.league?.logo} />
                    </div>
                    <div className="label">{card?.league?.name ?? ""}</div>
                  </div>

                  <div className="fav">d</div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <h3 className="copyrights">
        Created by <strong>Ahsan Akhtar</strong>
      </h3>
      <h3 className="copyrights-links">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.linkedin.com/in/m-ahsan-akhtar-69772067"
        >
          LinkedIn
        </a>
        {" | "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/ahsanakhtar91/practice_tasks"
        >
          GitHub
        </a>
      </h3>
    </div>
  );
};

export default App;
