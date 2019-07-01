var axios = require('axios');
axios.defaults.baseURL = 'https://huvnrjqzr7.execute-api.us-east-1.amazonaws.com/dev';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default axios;
