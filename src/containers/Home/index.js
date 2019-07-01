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
    data: {},
    page: 1,
    inProgress: false
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.path !== this.props.path) {
      this.setState({ posts: [], data: {}, page: 1 });
      this.getData();
    }
  }

  getData = () => {
    const { path, id } = this.props;
    const { page } = this.state;
    const token = localStorage.getItem('token');
    const savedThis = this;
    if (!token) {
      this.setState({ redirect: true });
    } else {
      if (path === home) {
        this.setState({ inProgress: true });
        axios.post('/posts', {
          token: token,
          page: page
        })
        .then(function (response) {
          return response.data;
        })
        .then(function (response) {
          savedThis.setState({ posts: savedThis.state.posts.concat(response.data), inProgress: false, page: response.nextPage });
        })
        .catch(function (error) {
          savedThis.setState({ inProgress: false });
        });
      } else if (path === post && id) {
        axios.post('/post', {
          token: token,
          id: this.props.id
        })
        .then(function (response) {
          return response.data;
        })
        .then(function (response) {
          savedThis.setState({ data: response.data, inProgress: false });
        })
        .catch(function (error) {
          savedThis.setState({ inProgress: false });
        });
      }
    }
  }

  render() {
    const { redirect, posts, data, page, inProgress } = this.state;
    const { path } = this.props;
    if (redirect) {
      navigate('/login');
    }
    console.log(this.state);
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
              {posts.length > 0 && page &&
                <div className="loader">
                  {!inProgress && <button
                    className="button-show-more"
                    onClick={this.getData}
                  >
                    Show More
                  </button>}
                  {inProgress && <Loading type='spinningBubbles' color="#0073b1c9" height={50} width={50} />}
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
