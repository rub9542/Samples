import React from 'react';
import { Row, Col, Result, Progress, Descriptions, Button} from 'antd';
import { connect } from "react-redux";
import '../../design/layout.css';
import './styles.css';
import {Color} from '../../services'
import { RedButton } from '../../components';
import { HomeOutlined } from '@ant-design/icons';


const thickPic = require("../../Assets/brilogo.png");
const phpImg = require("../../Assets/instructions.png");

class EndTest extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    window.history.pushState(null, window.location.href);
    window.addEventListener('popstate', function (event){
    window.history.pushState(null, window.location.href);
  });
  }

  render() {
    const {
      history,
      result,
      name
    } = this.props;
    return (
      <div className='full-width full-height mainGreyBack'>
        <Result
          status="success"
          title={result.attempted ? "You have already attempted the test!" : "Your test has been submitted successfully"}
          subTitle="You have scored"
          extra={[
            <Row justify='center'>
              <Col xs={24}>
                <Progress
                  type="circle"
                  percent={(result.result.totalMarks * 100/(result.qCount * 3)).toFixed(2)}
                />
              </Col>
              <Col xs={24}>
                <Descriptions
                  bordered
                  title="Result Details"
                  size="small"
                  column={1}
                >
                  <Descriptions.Item label="Name">{name}</Descriptions.Item>
                  <Descriptions.Item label="Marks Obtained">{result.result.totalMarks}</Descriptions.Item>
                  <Descriptions.Item label="Total Questions">{result.qCount}</Descriptions.Item>
                  <Descriptions.Item label="Attempted">{result.result.attempted}</Descriptions.Item>
                  <Descriptions.Item label="Correct">{result.result.correct}</Descriptions.Item>
                  <Descriptions.Item label="Wrong">{result.result.wrong}</Descriptions.Item>
                </Descriptions>
              </Col>
              <Col xs={24}>
                {/* To redirect to user Instruction page */}
                {/* 
                <RedButton
                onClick={() =>history.replace('/instructions')}
                shadowString='1px 1px 2px 1px #ff436577'
                >Back To Home
                </RedButton> */}
                <RedButton
                onClick={() =>window.location.href='https://brigosha.com/'}
                size='large'
                style={{
                  color: 'white',
                  marginTop: 25,
                }}
                ><HomeOutlined />Home
                </RedButton>
              </Col>
            </Row>
          ]}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    result
  } = state.test;
  const {
    name
  } = state.session.user;
  return {
    result, name
  }
};

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(EndTest);
