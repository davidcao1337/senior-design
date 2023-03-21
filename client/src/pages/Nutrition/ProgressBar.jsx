import React from "react";

const ProgressBar = (props) => {
    const caloriesEaten = props.props.caloriesEaten
    const macroEaten = props.props.macroCals
    var completed
    if( caloriesEaten !== 0 && macroEaten !== 0){
        completed = ((macroEaten / caloriesEaten ) * 100).toFixed(0)
    }
    else {
        completed = 0
    }

    const bgcolor = props.props.color

  const containerStyles = {
    height: 20,
    width: '90%',
    backgroundColor: "#e0e0de",
    borderRadius: 50
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right'
  }

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;