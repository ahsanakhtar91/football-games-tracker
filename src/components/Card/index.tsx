import React from "react";
import { GameDetail } from "src/types";
import CardHeader from "../CardHeader";
import CardBody from "../CardBody";

interface ICardProps {
  cardData: GameDetail;
  index: number;
}

const Card = (props: ICardProps) => {
  const { cardData, index } = props;

  console.log(cardData);

  return (
    <li key={index} className="card-container">
      <div className="card">
        <CardHeader fixture={cardData?.fixture} league={cardData?.league} />
        <hr color="#ccc" />
        <CardBody
          teams={cardData?.teams}
          fixture={cardData?.fixture}
          goals={cardData?.goals}
        />
      </div>
    </li>
  );
};

export default Card;
