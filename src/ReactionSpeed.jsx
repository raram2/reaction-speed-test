import React, {PureComponent} from 'react';

export default class ReactionSpeed extends PureComponent {
  state = {
    sign: 'waiting',
    message: '클릭하면 시작됩니다.',
    record: 0,
    records: [],
  };
  // 값이 변화해도 렌더링에 관여하지않는 데이터들은 state에서 제외
  timeout;
  startTime;
  endTime;
  handleClick = () => {
    let {sign} = this.state;
    if (sign === 'waiting') {
      this.setState({
        sign: 'ready',
        message: '초록색이 되면 클릭하세요.',
      });
      this.timeout = setTimeout(() => {
        this.setState({
          sign: 'now',
          message: '지금 클릭!',
        });
        this.startTime = new Date();
      }, Math.round(Math.random() * 1000 + 2000)); // 2~3초 사이 랜덤
    } else if (sign === 'ready') {
      // 유저가 노란색일 때 클릭한 경우 - 이번 턴은 1000ms로 페널티 부여한다.
      clearTimeout(this.timeout);
      this.setState(prevState => {
        return {
          sign: 'waiting',
          message: '너무 성급하시군요. 클릭하면 다시 시작됩니다.',
          record: 1000,
          records: [...prevState.records, 1000],
        };
      });
    } else if (sign === 'now') {
      // 유저가 초록색일 때 클릭한 경우 - 현재 반응속도와 평균 반응속도를 계산해 표시한다.
      this.endTime = new Date();
      this.setState(prevState => {
        return {
          sign: 'waiting',
          message: '클릭하면 시작됩니다.',
          record: (this.endTime - this.startTime).toFixed(0),
          records: [...prevState.records, (this.endTime - this.startTime).toFixed(0)],
        };
      });
    }
  };
  renderReactionSpeed = () => {
    return this.state.record === 0 ? null : (
      <div>
        {this.state.record === 1000 ? <span className='penalty'>페널티</span> : '현재 반응속도'} :{' '}
        {this.state.record}ms
      </div>
    );
  };
  getAverageSpeed = () => {
    return (
      this.state.records.reduce((acc, curr) => parseInt(acc) + parseInt(curr)) /
      this.state.records.length
    ).toFixed(0);
  };
  renderAverageSpeed = () => {
    return this.state.records.length === 0 ? null : (
      <div>평균 반응속도: {this.getAverageSpeed()}ms</div>
    );
  };
  finishOrNot = () => {
    if (this.state.records.length === 5) {
      alert(`테스트가 끝났습니다. 당신의 평균 반응속도는 ${this.getAverageSpeed()}ms 입니다.`);
      this.setState({
        sign: 'waiting',
        message: '클릭하면 시작됩니다.',
        record: 0,
        records: [],
      });
    }
  };
  // Life Cycle APIs
  componentDidUpdate() {
    this.finishOrNot();
  }
  render() {
    return (
      <>
        <div id='screen' className={this.state.sign} onClick={this.handleClick}>
          {this.state.message}
        </div>
        <div>남은 횟수: {5 - this.state.records.length}</div>
        {/* 특정 조건에 따라 뷰를 렌더할지 말지 결정할 때 */}
        {this.renderReactionSpeed()}
        {this.renderAverageSpeed()}
      </>
    );
  }
}
