// node_modules에서 리액트 module 불러오기
const React = require('react');
// React 모듈 내부의 Component 클래스 추출하기
// const {Component, Fragment} = require('React'); // 이렇게 쓰면 'react' - 'React' 인식 문제로 충돌 일어남

class WordRelay extends React.Component {
  state = {
    word: '손흥민',
    answer: '',
    alert: '',
    alreadyWords: {},
  };

  isNotAlreadyWord = newAnswer => {
    if (newAnswer[0] in this.state.alreadyWords) {
      let correspondingWordList = this.state.alreadyWords[newAnswer[0]];
      for (let word of correspondingWordList) {
        if (word === newAnswer) {
          return false;
        }
      }
      return true;
    }
    return true;
  };
  onSubmitForm = e => {
    e.preventDefault();
    if (
      this.state.word[this.state.word.length - 1] === this.state.answer[0] &&
      this.state.answer.length === 3 &&
      this.isNotAlreadyWord(this.state.answer)
    ) {
      // 성공
      if (this.state.answer[0] in this.state.alreadyWords) {
        this.state.alreadyWords[this.state.answer[0]].push(this.state.answer);
      } else {
        this.state.alreadyWords[this.state.answer[0]] = [];
        this.state.alreadyWords[this.state.answer[0]].push(this.state.answer);
      }
      this.setState({
        word: this.state.answer,
        alert: `"${this.state.answer[2]}"(으)로 시작하는 3자리 단어는?`,
        answer: '',
      });
    } else {
      // 실패
      this.setState({
        alert: '다시 시도하세요.',
        answer: '',
      });
    }
    this.input.focus();
  };
  onChangeInput = e => {
    this.setState({
      answer: e.target.value,
    });
  };
  onRefInput = c => {
    this.input = c; // 이렇게 미리 선언해주어야 렌더마다 새로 생성되지 않고 참조만 해올 수 있다.
  };
  render() {
    return (
      <>
        <h1>끝말잇기 게임</h1>
        <div>단어: {this.state.word}</div>
        <form onSubmit={this.onSubmitForm} autoComplete='off'>
          <input
            type='text'
            ref={this.onRefInput}
            value={this.state.answer}
            onChange={this.onChangeInput}
          />
          <button type='submit'>입력</button>
        </form>
        <div>{this.state.alert}</div>
      </>
    );
  }
}

// WordRelay 객체 내보내기 (module.exports에 할당)
module.exports = WordRelay;
