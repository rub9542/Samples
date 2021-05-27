import React from 'react';
import {
  Row, Col,
  Button, Empty, Modal, Input,
  Select, DatePicker, TimePicker
} from 'antd';
import { LoadingOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import moment from 'moment';
import {
  TestBox,
  LoginInputs,
  RedButton,
  LoadingDataModal
} from '../../components';
import '../../design/layout.css';
import './styles.css';
import {Api} from '../../services';
import {
  deleteTest,
  getAdminTestQ,
  addAdminTest,
  getTest,
  toggleTestLoader,
} from '../../actions/test';
import { BsCheckCircle } from 'react-icons/bs';

const {Option} = Select;

const thickPic = require("../../Assets/brilogo.png");

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addQmodal: false,
      beginTime: moment(),
      endTime: moment().add(20, 'minutes'),
      date: moment(),
      sendDate: moment().format('YYYY-MM-DD'),
      sendTime: moment().format('HH:mm'),
      title: '',
      type: 'Aptitude',
      startTime: "2020-12-19 03:00:00",
      duration: 20,
      currentTestId: 0,
      edit: false
    }
    this.addModal = this.addModal.bind(this);
    this.addTest = this.addTest.bind(this);
  }
  componentDidMount() {
    const {
      getTest,
      toggleTestLoader
    } = this.props;
    getTest('Admin');
    toggleTestLoader(false);
  }

  openAddQModal = () => this.setState({addQmodal : true})
  closeAddQModal = () => {
    this.setState({addQmodal : false})
    this.clearTestParams();
  }
  clearTestParams = () => this.setState({
    title: '',
    type: 'Aptitude',
    startTime: "2020-12-19 03:00:00",
    duration: 20,
    currentTestId: 0,
    edit: false
  })

  selectAfter = (
    <Select
      style={{ width: '100%', margin: 0, boderRadius: 10, }}
      onChange={(e) => this.setState({type: e})}
      defaultValue="Aptitude" className="select-after">
      <Option value="Aptitude">Aptitude</Option>
      <Option value="Coding">Coding</Option>
    </Select>
  );

  openEditModal(data){
    this.setState({
      title: data.title,
      type: data.type,
      startTime: data.startTime,
      duration: parseInt(data.duration),
      beginTime: moment(data.startTime),
      endTime: moment(data.startTime).add(data.duration, 'minutes'),
      currentTestId: data.id,
      addQmodal: true,
      edit: true,
    })
  }


  async addTest() {
    const {
      currentTestId,
      title,
      type,
      sendDate,
      sendTime,
      duration,
    } = this.state;
    const {
      addAdminTest
    } = this.props;
    // console.log({
    //   title: title,
    //   type: type,
    //   startTime: sendDate + ' ' + sendTime + ':00',
    //   duration: duration
    // });
    if(title === '' || sendDate === '' || sendTime === '' || duration === '') {
      return
    }
    let response = await addAdminTest({
      id: currentTestId,
      title: title,
      type: type,
      startTime: sendDate + ' ' + sendTime + ':00',
      duration: duration
    })

    if(response) {
      this.closeAddQModal()
    }
  }

  addModal = () => {
    const {
      beginTime,
      date,
      type,
      title,
      startTime,
      sendDate,
      sendTime,
      endTime,
      duration,
      edit
    } = this.state;
    const {
      addAdminTest
    } = this.props;
    return (
      <Modal
        className='autoSaveModal'
        centered
        visible={this.state.addQmodal}
        bodyStyle={{
          padding: 25,
        }}
        closable={false}
        footer={null}
      >
        <div className='text-sm bold-600 text-center'>
          Add Test Details
        </div>
        <span className='text-purple'>
          Title
        </span>
        <input
          style={{
            border: '1px solid #d9d9d9',
            padding: 5,
            width: '100%',
            display: 'block',
            color: '#452F65 !important',
          }}
          value={title}
          onChange={(e) => this.setState({title: e.target.value})}
          type='text'
        />
        <Row justify='space-between' className='m-t-10'>
          <Col xs={11}>
            <div className='text-purple'>
              Type
            </div>
            <div>
              {this.selectAfter}
            </div>
          </Col>
          <Col xs={11}>
            <span className='text-purple m-r-10'>
              Date
            </span>
            <DatePicker
              value={date}
              style={{
                width: '100%'
              }}
              onChange={(date, dateString) => this.setState({
                sendDate: dateString,
                date: date,
              })}
            />
          </Col>
        </Row>
        <Row justify='space-between' className='m-t-10'>
          <Col xs={11}>
            <div className='text-purple m-r-10'>
              Start Time
            </div>
            <TimePicker
              style={{width: '100%'}}
              format='HH:mm'
              value={beginTime}
              onChange={(time, timeString) =>
                this.setState({
                  sendTime: timeString,
                  beginTime: time,
                  endTime: time,
                  duration: moment(time).diff(moment(beginTime, 'minutes')) / 60000,
                })
              }
            />
          </Col>
          <Col xs={11}>
            <div className='text-purple m-r-10'>
              End Time
            </div>
            <TimePicker
              style={{width: '100%'}}
              format='HH:mm'
              value={endTime}
              onChange={(time, timeString) => {
                this.setState({
                  duration: moment(time).diff(moment(beginTime, 'minutes')) / 60000,
                  endTime: time
                })
              }}
            />
          </Col>
        </Row>
        <Row justify='space-between' className='m-t-20'>
          <RedButton
            onClick={() => this.closeAddQModal()}
            shadowString='1px 1px 2px 1px #ff436577'
          >
            Cancel
          </RedButton>
          <RedButton
            loading={this.props.testLoader}
            disabled={duration <= 0 || title == ''}
            onClick={() => {
              this.addTest()
            }}
            shadowString='1px 1px 2px 1px #ff436577'
          >
            {edit ? "Update" : "Add"}
          </RedButton>
        </Row>
      </Modal>
    )
  }

  render() {
    const {
      currentTestId
    } =  this.state;
    const {
      history,
      testList,
      testLoader,
      deleteTest,
      addAdminTest,
      deleteLoader,
      getAdminTestQ,
      adminBoardLoader,
    } = this.props;
    return(
      <div className='full-width full-height mainGreyBack' >
        <Row
          className='testTopBack p-10 text-center'
          justify='space-between'
          align='middle'
        >
          <Col className='text-white text-md bold-600'>
            Brigosha Hackathon
          </Col>
          <Col className='text-white text-md bold-600 colockBox'>
            TESTS
          </Col>
          <Col>
            <Button
              onClick={() => history.push('/admin/users')}
              style={{
                backgroundColor: '#FF4365',
                color: 'white',
                border: 'none',
                fontWeight: 500,
                borderRadius: 5,
                marginTop: 10,
              }}>
              Users
            </Button>

            {/*<Button
              onClick={() => this.openAddQModal()}
              style={{
                backgroundColor: '#FF4365',
                color: 'white',
                border: 'none',
                fontWeight: 500,
                borderRadius: 5,
                marginTop: 10,
              }}>
              Add Test +
            </Button>*/}
          </Col>
        </Row>
        <Row style={{margin: 30}}>
          <div
          onClick={() => this.openAddQModal()}
          className='addTestBox p-15 m-10 r-c-c-c cursor-pointer'
          > <PlusCircleOutlined /> </div>
          {testList && testList.length ?
            testList.map((data, index) => (
              <TestBox
                loading={testLoader && currentTestId === data.id}
                deleteLoading={deleteLoader && currentTestId === data.id}
                onClickEdit={() => {
                  this.setState({
                    currentTestId: data.id,
                  })
                  if(testLoader || deleteLoader) return;
                  getAdminTestQ(history, data.id)
                }}
                onClickDelete={() => {
                  this.setState({
                    currentTestId: data.id,
                  })
                  if(testLoader || deleteLoader) return;
                  deleteTest(data.id)
                }}
                data={data}
                index={index}
                editTest={() => this.openEditModal(data)}
              />
            ))
          : null
          /*<Empty
            description={
            <div>
              <div className='text-lightGrey bold-600'>
                No Question Added
              </div>
              <Button
                onClick={() => this.openAddQModal()}
                style={{
                  backgroundColor: '#FF4365',
                  color: 'white',
                  border: 'none',
                  fontWeight: 500,
                  borderRadius: 5,
                  marginTop: 10,
                }}>
                Add Question +
              </Button>
            </div>
            }
            style={{marginTop: 20}}
          />}*/}
        </Row>
        {this.addModal()}
        <LoadingDataModal
          visible={adminBoardLoader}
          title='Tests'
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    testLoader,
    testList,
    deleteLoader,
    adminBoardLoader,
  } = state.test;
  return {
    testLoader,
    testList,
    deleteLoader,
    adminBoardLoader,
  }
};

const mapDispatchToProps = dispatch => ({
  addAdminTest: (params) => dispatch(addAdminTest(params)),
  getTest: (role) => dispatch(getTest(role)),
  toggleTestLoader: (bool) => dispatch(toggleTestLoader(bool)),
  deleteTest: (testId) => dispatch(deleteTest(testId)),
  getAdminTestQ: (history, testId) => dispatch(getAdminTestQ(history, testId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
