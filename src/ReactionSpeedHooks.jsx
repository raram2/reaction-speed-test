import React, {useState, useEffect} from 'react';

const ReactionSpeed = () => {
  const [sign, setSign] = useState('waiting');
  const [message, setMessage] = useState('클릭하면 시작됩니다.');
  const [record, setRecord] = useState(0);
  const [records, setRecords] = useState([]);
  let timeout, startTime, endTime; // states not for rendering
  const handleClick = () => {
    if (sign === 'waiting') {
      // when red light, then to yellow light, then to green light
      setSign('ready');
      setMessage('초록색이 되면 클릭하세요.');
      timeout = setTimeout(() => {
        setSign('now');
        setMessage('지금 클릭!');
        startTime = new Date();
      }, Math.round(Math.random() * 1000 + 2000));
    } else if (sign === 'ready') {
      // assign penalty
      clearTimeout(timeout);
      setSign('waiting');
      setMessage('너무 성급하시군요. 클릭하면 다시 시작됩니다.');
      setRecord(1000);
      setRecords(prevRecords => prevRecords.concat(1000));
    } else if (sign === 'now') {
      endTime = new Date();
      setSign('waiting');
      setMessage('클릭하면 시작됩니다.');
      setRecord((endTime - startTime).toFixed(0));
      setRecords(prevRecords => prevRecords.concat((endTime - startTime).toFixed(0)));
    }
  };
  const getAverageSpeed = () => {
    return (records.reduce((acc, curr) => parseInt(acc) + parseInt(curr)) / records.length).toFixed(
      0,
    );
  };
  const finishOrNot = () => {
    if (records.length === 5) {
      alert(`테스트가 끝났습니다. 당신의 평균 반응속도는 ${getAverageSpeed()}ms 입니다.`);
      setSign('waiting');
      setMessage('클릭하면 시작됩니다.');
      setRecord(0);
      setRecords([]);
    }
  };
  const renderReactionSpeed = () => {
    return record === 0 ? null : (
      <div>{record === 1000 ? <span className='penalty'>페널티</span> : record}ms</div>
    );
  };
  const renderAverageSpeed = () => {
    return records.length === 0 ? null : <div>평균 반응속도: {getAverageSpeed()}ms</div>;
  };
  useEffect(() => finishOrNot(), [records]);
  return (
    <>
      <div id='screen' className={sign} onClick={handleClick}>
        {message}
      </div>
      <div>남은 횟수: {5 - records.length}</div>
      {/* 특정 조건에 따라 뷰를 렌더할지 말지 결정할 때 */}
      {renderReactionSpeed()}
      {renderAverageSpeed()}
    </>
  );
};

export default ReactionSpeed;
