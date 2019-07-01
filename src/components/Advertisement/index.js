import React from 'react';
import links from './links.json';
import './styles.css'

export default function Advertisement() {
  return (
    <div className="wrapper">
      <div className="advert-one">
        <img src={links.bride} alt="advertisement" />
        <div className="hover-title">Bridal</div>
        <button className="hover-button">
          Click Here!
        </button>
        <div className="ad-info">Ad</div>
        <div className="disclaimer">This is a mock ad</div>
      </div>
    </div>
  );
}
