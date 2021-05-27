import React from 'react';
import {
  Row, Col,
  Tag, Button,
  Tabs, Radio,
  Input, Modal,
} from 'antd';
import { connect } from "react-redux";
import {
  setTimeAndSecs,
  setQues,
  setBookmark,
  setAnswer,
  setAnswerArray,
  submitTestQ,
} from '../../actions/test';
import { CloseOutlined, ExclamationCircleOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import {ListQuestionBox, LoadingDataModal, RedButton} from '../../components';
import '../../design/layout.css';
import './styles.css';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import {Color} from '../../services';

const { TabPane } = Tabs;
const { confirm } = Modal;

let hidden = null;
let visibilityChange = null;
if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
  hidden = 'hidden';
  visibilityChange = 'visibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
  hidden = 'msHidden';
  visibilityChange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
  hidden = 'webkitHidden';
  visibilityChange = 'webkitvisibilitychange';
}

const thickPic = require("../../Assets/brilogo.png");
const phpImg = require("../../Assets/instructions.png");

class Test extends React.Component {
  constructor(props) {
    super(props)
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.decrementSeconds = this.decrementSeconds.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    this.state = {
      subModal: false,
      actions: [],
      warnings: 3,
      forceSubmit: false
    }
  }

  componentDidMount() {
    this.startTimer()
    window.addEventListener("beforeunload", this._confirm);
    window.onbeforeunload = this._confirm;
    window.history.pushState({name: "browserBack"}, "on browser back click", window.location.href);
    window.history.pushState({name: "browserBack"}, "on browser back click", window.location.href);
    window.onpopstate = this._backConfirm;
    document.addEventListener(visibilityChange, this.handleVisibilityChange, false);
  }

  handleVisibilityChange = () => {
    if (document[hidden]) {
      if (this.state.warnings-1 === 0) {
        this.setState({
          forceSubmit: true
        })
        return this.props.submitTestQ(this.props.history)
        clearInterval(this.timer);
      }else{
        alert(`You have only ${this.state.warnings-1} warnings left`);
        this.setState({
          warnings: this.state.warnings - 1
        })
      }

    } else {
    }
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this._confirm);
    window.onpopstate = () => { }
    document.removeEventListener(visibilityChange, this.handleVisibilityChange);
  }

  _backConfirm = async () => {
    let event = window.confirm("Changes that you may not be saved.");
    if(event){
        window.history.pushState(null, "", window.location.href);
    }
    this.clearTimer();
   clearInterval(this.timer);
  }

  _confirm = (e) => {
    e.preventDefault();
    // var confirmationMessage = "\o/";
    return e.returnValue = '';
  }

  openSubmitModal = () => this.setState({subModal : true})
  closeSubmitModal = () => this.setState({subModal : false})

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  decrementSeconds() {
    if(this.props.seconds - 1 === 0){
        this.setState({
          forceSubmit: true
        })
       this.props.submitTestQ(this.props.history);
       clearInterval(this.timer);
       this.clearTimer();
    }
    this.props.setTimeAndSecs(
      this.secondsToTime(this.props.seconds - 1),
      this.props.seconds - 1,
    );
  }

  startTimer() {
    this.timer = setInterval(this.decrementSeconds, 1000);
  }

  clearTimer() {
    this.props.setTimeAndSecs(
      {
        h: 0,
        m: 0,
        s: 0,
      }, 3600
    );
    clearInterval(this.timer);
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  submitModal = () => (
    <Modal
      className='submitModal'
      centered
      visible={this.state.subModal}
      bodyStyle={{
        padding: 10,
        borderRadius: 15,
      }}
      closable={false}
      footer={null}
    >
      <div className='text-sm bold-600 text-center'>
        <QuestionCircleOutlined className='text-red text-sm m-r-10' />Are you sure you want to submit test now ?
      </div>
      <Row justify='space-around' className='m-t-20'>
        <RedButton
          onClick={() => this.closeSubmitModal()}
          shadowString='1px 1px 2px 1px #ff436577'
        >
          Cancel
        </RedButton>
        <RedButton
          loading={this.props.testLoader}
          disabled={this.props.testLoader}
          onClick={() => {
            this.clearTimer()
            localStorage.clear()
            this.props.submitTestQ(this.props.history)
          }}
          shadowString='1px 1px 2px 1px #ff436577'
        >
          Submit
        </RedButton>
      </Row>
    </Modal>
  )

  forceSubmitModal = () => (
    <Modal
      className='submitModal'
      centered
      visible={this.state.forceSubmit}
      bodyStyle={{
        padding: 10,
        borderRadius: 15,
      }}
      closable={false}
      footer={null}
    >
      <div className='text-sm bold-600 text-center'>
        <ExclamationCircleOutlined className='text-red text-sm m-r-10' />Your test is being force submitted!!
      </div>
      <Row justify='space-around' className='m-t-20'>
        <RedButton
          disabled={true}
          loading={this.props.testLoader}
          shadowString='1px 1px 2px 1px #ff436577'
        >
          Submitting ...
        </RedButton>
      </Row>
    </Modal>
  )

  render() {
    const {
      history,
      testLoader,
      questions,
      testDetails,
      qindex,
      setBookmark,
      setAnswer,
      setAnswerArray,
      setQues,
      solutions,
      seconds,
      time,
      submitTestQ,
      name
    } = this.props;
    if(!questions) {
      return (
        <div className='full-width full-height mainGreyBack'>
          <Row
            className='testTopBack p-b-10 text-center'
            justify='space-between'
            align='middle'
          >
            <Col xs={6} className='text-white text-md bold-600'>
              Brigosha Hackathon
            </Col>
            <Col xs={12} className='colockBox text-white text-xlg bold-600'>
              {time.h} : {time.m < 10 ? '0' + time.m : time.m} : {time.s < 10 ? '0' + time.s : time.s}
            </Col>
            <Col xs={6} />
          </Row>
          <LoadingDataModal />
        </div>
      )
    }
    return (
      <div
        className='full-width full-height mainGreyBack'
      >
        <Row
          className='testTopBack p-b-10 text-center'
          justify='space-between'
          align='middle'
        >
          <Col span={6} className='text-white text-md bold-600'>
            <div style={{display: 'flex', justifyContent: 'flex-start', marginLeft: 10}}>
              Brigosha Hackathon
            </div>
          </Col>
          <Col span={10} className='colockBox text-white text-xlg bold-600'>
            {time.h} : {time.m < 10 ? '0' + time.m : time.m} : {time.s < 10 ? '0' + time.s : time.s}
          </Col>
          <Col span={8} style={{}}>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: 10}}>
              <Button
                onClick={() => this.openSubmitModal()}
                style={{
                  border: 'none',
                  fontWeight: 500,
                  backgroundColor: '#FF4365',
                  color: 'white',
                  borderRadius: 5,
                }}
              >
                End Test
              </Button>
              <div style={{color: "white", fontSize: 22, marginLeft: 10, fontWeight: 600}}><UserOutlined style={{marginRight: 10}}/>{name}</div>

            </div>
          </Col>
        </Row>
        <Tabs className='m-l-20'>
          <TabPane
            tab={<div className='text-xmd'>Aptitude Section</div>}
            key="1"
          >
            <Row>
              <Col xs={8}>
                <div className='listQBox m-10 hideScroll'>
                  <div className='p-10 divider topQListBar r-c-sb text-lightGrey'>
                    <div>
                      {questions.length} Questions
                    </div>
                    <div>
                      Total Points:20
                    </div>
                  </div>
                  {questions.map((data, index) =>
                    <div style={index === qindex ? {backgroundColor: Color.lightprimary, margin: 1, borderRadius: 5} : {}}>
                    <ListQuestionBox
                      onPressBookmark={() => setBookmark(index)}
                      onPressQues={() => setQues(index)}
                      data={data}
                      index={index}
                      isSet={solutions[index].answer !== ''}
                    />
                    </div>
                  )}
                </div>
              </Col>
              <Col xs={16}>
                <div className='listQBox hideScroll m-10'>
                  <div className='p-10 divider-dark topQListBar r-c-sb text-lightGrey'>
                    <div>
                      Question {qindex + 1}
                    </div>
                    <div>
                      Points:{questions[qindex].positive}  Negative:{-1*questions[qindex].negative}
                    </div>
                  </div>
                  <div className='r-jsb-c flex-1 m-b-10'>
                    <div className='p-10 flex-1'>
                      {ReactHtmlParser(questions[qindex].question)}
                    </div>
                    <div className='m-t-10 flex-1'>
                      {questions[qindex].type === "Short" ?
                        <div className='full-width p-10'>
                          <Input
                            className='optionBox'
                            size='large'
                            value={questions[qindex].answer}
                            onChange={(e) => setAnswer(e.target.value)}
                          />
                        </div>
                      : null}
                      {questions[qindex].options && questions[qindex].options.length ? questions[qindex].options.map((data, index) =>
                        <Radio
                          onClick={() => setAnswer(index.toString())}
                          checked={index.toString() === questions[qindex].answer}
                          style={{
                            border: index.toString() === questions[qindex].answer ? '1px solid transparent' : '1px solid #A5AAB5',
                            borderRadius: 15,
                            backgroundColor: index.toString() === questions[qindex].answer ? '#FAFAFA' : 'white'
                          }}
                          className='p-10 r-c-fs m-10'
                        >
                          {data}
                        </Radio>
                      ) : null}
                      <div className='r-fe-fe m-r-10'>
                        {questions.length !== (qindex + 1) ?
                          <Button
                            onClick={() => {
                              setAnswerArray()
                              setQues(qindex + 1)
                            }}
                            size='large'
                            type={questions[qindex].answer === solutions[qindex].answer ? 'default' : 'primary'}
                            style={{
                              paddingLeft: 25,
                              paddingRight: 25,
                              color: questions[qindex].answer !== solutions[qindex].answer ? 'white' : '#A5AAB5',
                              marginTop: 15,
                              borderRadius: 10,
                              border: questions[qindex].answer !== solutions[qindex].answer ? 'none' : '1px solid #A5AAB5',
                            }}>
                            {questions[qindex].answer !== solutions[qindex].answer ?
                              'Save and Next'
                              :
                              'Skip and Next'
                            }
                          </Button>
                        :
                        <Button
                          onClick={() => {
                            setAnswerArray()
                            this.openSubmitModal()
                          }}
                          size='large'
                          type={questions[qindex].answer !== '' ? 'primary' : 'default'}
                          style={{
                            paddingLeft: 25,
                            paddingRight: 25,
                            color: questions[qindex].answer !== solutions[qindex].answer ? 'white' : '#A5AAB5',
                            marginTop: 15,
                            borderRadius: 10,
                            border: questions[qindex].answer !== solutions[qindex].answer ? 'none' : '1px solid #A5AAB5',
                          }}>
                          {questions[qindex].answer !== '' ?
                            'Save and Submit'
                            :
                            'Skip and Submit'
                          }
                        </Button>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
        {this.submitModal()}
        {this.forceSubmitModal()}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    testLoader,
    questions,
    testDetails,
    qindex,
    seconds,
    time,
    solutions,
  } = state.test;
  const {name} = state.session.user
  return {
    testLoader,
    questions,
    testDetails,
    qindex,
    seconds,
    time,
    solutions,
    name
  }
};

const mapDispatchToProps = dispatch => ({
  setBookmark: (index) => dispatch(setBookmark(index)),
  setQues: (index) => dispatch(setQues(index)),
  setTimeAndSecs: (time, sec) => dispatch(setTimeAndSecs(time, sec)),
  setAnswer: (value) => dispatch(setAnswer(value)),
  submitTestQ: (history) => dispatch(submitTestQ(history)),
  setAnswerArray: () => dispatch(setAnswerArray()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Test);
