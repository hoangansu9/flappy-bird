import React from 'react';
import './style.scss';
import { connect } from 'react-redux';
const Bird = ({ y, r }) => {
  console.log('y :>> ', y);
  return (
    <div
      className="bird-wrapper"
      style={{ top: y, transform: `rotate(${r}deg)` }}
    ></div>
  );
};
const mapStateToProps = ({ bird }) => ({ y: bird.y, r: bird.r });
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Bird);
