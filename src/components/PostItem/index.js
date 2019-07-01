import React from 'react';
import { navigate } from '@reach/router';
import './styles.css';

export default class PostItem extends React.PureComponent {
  render() {
    const { data } = this.props;
    return (
      <div className="post-item" onClick={() => navigate(`/post/${data.id}`)}>
        <div className="user-details">
          <div className="user-details-wrapper">
            <div className="user-image"><img src={data.avatar} alt="avatar" /></div>
            <div className="user-other-details">
              <div className="user-name">{data.username}</div>
              <div className="status">
                {data.online && <div className="status-icon" />}
                {!data.online && <div className="status-icon offline" />}
                <div className="status-text">{data.online ? 'Available' : 'Offline'}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="post-body">{data.message}</div>
        <div className="post-feedback">
          <hr />
          <div className="icons">
            <span>{data.up}</span>
            <i className="fa fa-thumbs-up icon"></i>
            <span>{data.right}</span>
            <i className="fa fa-check-circle icon"></i>
            <span>{data.heart}</span>
            <i className="fa fa-heart icon"></i>
            <span>{data.down}</span>
            <i className="fa fa-thumbs-down icon"></i>
          </div>
        </div>
      </div>
    );
  }
}
