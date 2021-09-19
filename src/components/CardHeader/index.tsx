import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Fixture, League } from "src/types";

interface ICardHeaderProps {
  fixture: Fixture;
  league: League;
}

const CardHeader = (props: ICardHeaderProps) => {
  const { fixture, league } = props;

//   console.log(fixture, league);

  return (
    <div className="card-header">
      <div className="status">
        {!fixture?.status?.elapsed || fixture?.status?.elapsed === 90 ? (
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
          <img src={league?.logo} />
        </div>
        <div className="label" title={league?.name ?? ""}>
          {league?.name ?? ""}
        </div>
      </div>

      <div className="fav">
        <FontAwesomeIcon color="#ccc" icon={faStar} />
      </div>
    </div>
  );
};

export default CardHeader;
