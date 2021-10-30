import React from "react";
import classNames from "classnames";
import "components/Button.scss";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const dayListItems = props.days.map((dayData) => {
    return (
      <DayListItem
        key={dayData.id}
        name={dayData.name}
        spots={dayData.spots}
        selected={dayData.name === props.day}
        setDay={props.setDay}
      />
    );
  });

  return <ul>{dayListItems}</ul>;
}
