const path = require('path'); // node_modules에 있는 경로 제어 모듈
const webpack = require('webpack');
// mode, entry, module(loader), plugin, output이 핵심!
module.exports = {
  name: 'word-relay-setting', // 이 웹팩 설정 파일에 대한 명시적인 이름 설정
  mode: 'development', // 배포시에는 production으로 변경하기
  devtool: 'eval', // 배포시에는 hidden-source-map
  resolve: {
    extensions: ['.js', '.jsx'], // entry > app에 있는 파일명을 하나하나 순회하며 (디렉토리에 존재하는 파일이면) 확장자와 매칭.
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  entry: {
    app: ['./src/client'], // 확장자를 붙여줘도 되지만, entry에 들어가는 파일이 많아질 수록 더 복잡해지므로 resolve>extensions(확장자) 설정으로 웹팩이 자동으로 확장자 매칭시키게 만들기
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env', // preset은 plugin들의 모음
              {
                targets: {
                  browsers: ['> 1% in KR'], // browserslist 참고
                },
                debug: true,
              },
            ],
            '@babel/preset-react',
          ],
          plugins: ['@babel/plugin-proposal-class-properties', 'react-hot-loader/babel'], // 플러그인 === 확장프로그램 (여기서는 프리셋에 대한 확장)
        },
      },
    ],
  },
  plugins: [new webpack.LoaderOptionsPlugin({debug: true})],
  // 플러그인 === 확장프로그램 (여기서는 모듈(로더)에 대한 확장 프로그램)
  // 이 코드는 module(loader) > rules > options 내부에 {debug:true}를 넣어준다.
  output: {
    path: path.join(__dirname, 'dist'), // 현재 react-webpack-basic 디렉토리에 'dist'라는 배포용 디렉토리를 생성하고, 그곳에 결과 출력
    filename: 'app.js', // 결과물 이름
    publicPath: '/dist/', // webpack-dev-server에서는 가상경로가 필요하다. path와의 차이점은 실제 경로 vs 가상 경로
  },
};
