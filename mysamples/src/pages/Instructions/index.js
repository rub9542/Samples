import React from 'react';
import { Row, Col, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {
  getTestStudent, getTestQ
} from '../../actions/test';
import { connect } from "react-redux";
import {} from '../../components';
import '../../design/layout.css';
import './styles.css';
import LoremData from './loremData.json';

const thickPic = require("../../Assets/brilogo.png");
const phpImg = require("../../Assets/instructions.png");

class Instructions extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const {
      history,
      testLoader,
      getTestStudent,
      getTestQ,
    } = this.props;
    return(
      <div
        className='full-width full-height'
      >
        <Row className='insturctionBack p-l-30 p-t-30 p-r-30 p-b-30' align='middle'>
          <Col xs={24} md={12}>
            <Row align='middle'>
              <img
                style={{height: 22}}
                src={thickPic.default}
                alt=""
              />
              <div
                className='text-white bold-600 p-l-20 text-mdl'>
                Brigosha Hackathon 2020
              </div>
            </Row>
            <Row className='text-white m-t-20'>
              <div className='m-t-20 m-b-20 bold-600 text-sm'>
                About
              </div>
              {LoremData.data}
            </Row>
          </Col>
          <Col xs={24} md={12}>
            <Row justify='end'>
              <img
                src={phpImg.default}
                alt=""
                style={{width: '57%', height: 'auto'}}
              />
            </Row>
          </Col>
        </Row>
        <Row justify='center' className='text-black m-t-40'>
          <Col xs={24} className='bold-600 text-md text-center'>
            Guidelines
          </Col>
          <Col md={15} className='m-b-40 m-t-40 text-sm m-d-40'>
            <ul>
              <li> Candidate shall be available at the time of interview as mentioned above.</li>
              <li>Candidate shall have a working internet connection.</li>
              <li>Candidate shall open the link in this mail and register himself using the phone number mentioned in his/her resume to start his test.</li>
              <li>Candidate shall grant permission to access the webcam/ mobile camera for the test to begin.</li>
              <li>Candidate's video and screen shall be recorded during the test.</li>
              <li>Candidate shall not switch tabs during the test. Repeating the same more than twice shall lead to forced submission of the test.</li>
              <li>Any unfair means used shall lead to candidate disqualification and the candidate may be barred from appearing in future hirings in Brigosha.</li>
              <li>Candidate shall review all questions before final submission. Changes cannot be made once it's submitted.</li>
              <li>Each candidate can appear the test only once.</li>
              <li>All decisions made by Brigosha Hackathon Team shall be final</li>
            </ul>
          </Col>
          <Col xs={22} md={10} className='m-b-60 m-t-40'>
            <Button
              onClick={() => getTestQ(history)}
              size='large'
              style={{
                color: 'white',
                marginTop: 15,
                width: '100%',
                borderRadius: 100,
                border: 'none',
                backgroundColor: '#583E8E',
              }}>
              Get Started {testLoader ? <LoadingOutlined style={{color: 'white'}} /> : <div style={{width: '1em', height: '1em'}} />}
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    testLoader,
    questions,
    testDetails,
  } = state.test;
  return {
    testLoader,
    questions,
    testDetails,
  }
};

const mapDispatchToProps = dispatch => ({
  getTestStudent: (history) => dispatch(getTestStudent(history)),
  getTestQ: (history) => dispatch(getTestQ(history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Instructions);
