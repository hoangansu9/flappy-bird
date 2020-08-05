import React from 'react';
import './style.scss';
import { connect } from 'react-redux';

const Pipe = ({ x, pipes }) => {
  return (
    <div className="pipe-wrapper">
      {pipes.map(({ topHeight }, i) => (
        <div style={{ position: 'relative' }}>
          <div
            key={`pipe-${i}`}
            className="pipe-top"
            style={{
              left: x + i * 200,
              height: topHeight,
            }}
          ></div>
          <div
            className="pipe-bottom"
            style={{
              left: x + i * 200,
              height: topHeight + 100,
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};
const mapStateToProps = ({ pipe }) => ({ x: pipe.x, pipes: pipe.pipes });
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Pipe);
