// node_modules에서 module 불러오기
import {hot} from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactionSpeed from './ReactionSpeedHooks';
const Hot = hot(ReactionSpeed);

ReactDOM.render(<Hot />, document.getElementById('root'));
