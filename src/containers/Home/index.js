import React from 'react';
import { navigate } from '@reach/router';
import Loading from 'react-loading';
import PostItem from '../../components/PostItem';
import Header from '../../components/Header';
import Advertisement from '../../components/Advertisement';
import axios from '../../config/axios.js';
import './styles.css'

var home = '/';
var post = '/post/:id';

export default class Home extends React.PureComponent {

  state = {
    redirect: false,
    posts: [],
    data: {}
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.path !== this.props.path) {
      this.setState({ posts: [], data: {} });
      this.getData();
    }
  }

  getData = () => {
    const { path, id } = this.props;
    const token = localStorage.getItem('token');
    const savedThis = this;
    if (!token) {
      this.setState({ redirect: true });
    } else {
      if (path === home) {
        axios.post('/posts', {
          token: token,
        })
        .then(function (response) {
          return response.data.data;
        })
        .then(function (response) {
          savedThis.setState({ posts: response });
        })
      } else if (path === post && id) {
        axios.post('/post', {
          token: token,
          id: this.props.id
        })
        .then(function (response) {
          return response.data.data;
        })
        .then(function (response) {
          savedThis.setState({ data: response });
        })
      }
    }
  }

  render() {
    const { redirect, posts, data } = this.state;
    const { path } = this.props;
    if (redirect) {
      navigate('/login');
    }
    return (
      <div className="wrapper">
        <Header />
        <div className="container">
          {path === home &&
            <div className="posts-container">
              {posts.length > 0 &&
                posts.map((item) =>
                  <div key={item.id}><PostItem data={item}/></div>
                )}
              {posts.length === 0 &&
                <div className="loader">
                  <Loading type='spinningBubbles' color="#0073b1c9" height={100} width={100} />
                </div>}
            </div>}
          {path === post &&
            <div className="posts-container">
              {data.id && <PostItem data={data}/>}
              {!data.id &&
                <div className="loader">
                  <Loading type='spinningBubbles' color="#0073b1c9" height={100} width={100} />
                </div>}
            </div>}
          <div className="extra-container">
            <Advertisement />
          </div>
        </div>
      </div>
    )
  }
}
