import React from "react";
import { Fixture, Goals, League, Status, Teams } from "src/types";

interface ICardBodyProps {
  teams: Teams;
  fixture: Fixture;
  goals: Goals;
}

const CardBody = (props: ICardBodyProps) => {
  const { teams, fixture, goals } = props;

  //   console.log(teams, fixture);

  return (
    <div className="card-body">
      <div className="team-home">
        <div className="logo">
          <img alt="Team Logo" src={teams?.home?.logo} />
        </div>
        <div className="name">{teams?.home?.name}</div>
      </div>
      <div className="score-section">
        <div className="date-time">
          <span className="date">8</span>
          {" at "}
          <span className="time">7</span>
        </div>
        <div className="score">
          {goals?.home && goals?.away ? (
            <>
              <div className={`score-home ${goals?.home ? "" : "score-zero"}`}>
                {goals?.home}
              </div>
              <span>{":"}</span>
              <div className={`score-away ${goals?.away ? "" : "score-zero"}`}>
                {goals?.away}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="time-elapsed">
          {fixture?.status?.elapsed ? (
            <>
              <span>{fixture?.status?.elapsed}</span>
              {"'"}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="team-away">
        <div className="logo">
          <img alt="Team Logo" src={teams?.away?.logo} />
        </div>
        <div className="name">{teams?.away?.name}</div>
      </div>
    </div>
  );
};

export default CardBody;
