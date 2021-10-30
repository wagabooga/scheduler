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
        selected={dayData.name === props.value}
        setDay={props.onChange}
      />
    );
  });

  return <ul>{dayListItems}</ul>;
}
