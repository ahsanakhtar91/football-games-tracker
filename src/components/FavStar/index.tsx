import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Fixture } from "src/types";

interface IFavStarProps {
  fixture: Fixture;
}

const FavStar = (props: IFavStarProps) => {
  const { fixture } = props;

  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  useEffect(() => {
    const favouriteFixtureIDs =
      localStorage.getItem("favourite_fixture_ids") ?? "[]";
    const favouriteFixtureIDsArr: Array<number> =
      JSON.parse(favouriteFixtureIDs);

    if (favouriteFixtureIDsArr.indexOf(fixture?.id) >= 0) {
      setIsFavourite(true);
    }
  }, []);

  const onMarkedAsFavourite = (fixture: Fixture) => {
    setIsFavourite(!isFavourite);
    updateLocalStorage(fixture);
  };

  const updateLocalStorage = (fixture: Fixture) => {
    const favouriteFixtureIDs =
      localStorage.getItem("favourite_fixture_ids") ?? "[]";
    const favouriteFixtureIDsArr: Array<number> =
      JSON.parse(favouriteFixtureIDs);

    const existingIndex = favouriteFixtureIDsArr.indexOf(fixture?.id);
    if (existingIndex === -1) {
      favouriteFixtureIDsArr.push(fixture?.id);
    } else {
      favouriteFixtureIDsArr.splice(existingIndex, 1);
    }

    localStorage.setItem(
      "favourite_fixture_ids",
      JSON.stringify(favouriteFixtureIDsArr)
    );
  };

  return (
    <div className="fav-star" onClick={() => onMarkedAsFavourite(fixture)}>
      <FontAwesomeIcon color={isFavourite ? "#7359be" : "#bbb"} icon={faStar} />
    </div>
  );
};

export default FavStar;
