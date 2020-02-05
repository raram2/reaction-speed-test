// node_modules에서 module 불러오기
const {hot} = require('react-hot-loader/root');
const React = require('react');
const ReactDOM = require('react-dom');
const WordRelay = require('./WordRelay');
const Hot = hot(WordRelay);

ReactDOM.render(<Hot />, document.getElementById('root'));
