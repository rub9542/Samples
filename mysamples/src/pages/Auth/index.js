import React from 'react';
import { Row, Col, Tag, Button, Dropdown, Menu, Select} from 'antd';
import { CloseOutlined, DownOutlined, LoadingOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import {
  LoginInputs
} from '../../components';
import '../../design/layout.css';
import './styles.css';
import {Api} from '../../services';
import {
  logIn
} from '../../actions/login';
import {
  setStudentId,
  setStudentTestId,
  resetStudentTest,
} from '../../actions/test';
import { BsCheckCircle, BsExclamationDiamond, BsBoxArrowInRight } from 'react-icons/bs';

const thickPic = require("../../Assets/brilogo.png");

const { Option } = Select;

class App extends React.Component {
  constructor(props) {
    super(props)
    this.addPl = this.addPl.bind(this);
    this.addSkill = this.addSkill.bind(this);
    this.state = {
      visible: true,
      showEmailValidator: false,
      name: '',
      email: '',
      phNo: '',
      sendSkills: [],
      languages: [],
      skills: ['API', 'DBMS', "FED", "ANDROID"],
      programmingLangs: [],
    }
  }
  componentDidMount() {
    const {
      setStudentId,
      setStudentTestId,
      resetStudentTest,
    } = this.props;
    var url = new URL(window.location);
    var userId = url.searchParams.get("userId");
    var testId = url.searchParams.get("testId");
    setStudentId(userId);
    setStudentTestId(testId);
    resetStudentTest();
    window.history.pushState({}, document.title, "/" + "");
    Api.get(`/hackathon/register/${userId}`).send((response, error) => {
      console.log(response);
      if (response !== '' && response !== undefined) {
        console.log("response", response);
        this.setState({
          skills: response.skills,
          programmingLangs: response.programmingLangs,
          name: response.user.name,
          email: response.user.email,
          phNo: response.user.phone,
        });
      }
    });
  }
  showMenu = (e) => {
    e.stopPropagation();
    console.log('testing');
    this.setState({visible : true,})
  }

  addPl(data) {
    const {
      programmingLangs,
      languages,
    } =  this.state;
    const len = programmingLangs.length;
    for(let i=0; i<len; i++) {
      if(languages[i] === data) return
    }
    languages.push(data);
    this.setState({
      languages
    })
  }
  addSkill(data) {
    console.log(data);
    const {
      skills,
      sendSkills,
    } =  this.state;
    const len = sendSkills.length;
    for(let i=0; i<len; i++) {
      if(sendSkills[i] === data) return
    }
    sendSkills.push(data);
    this.setState({
      sendSkills
    })
  }

  removeSkill(index) {
    const {
      sendSkills
    } =  this.state;
    sendSkills.splice(index,1)
    this.setState({sendSkills});
  }
  removeLanguage(index) {
    const {
      languages
    } =  this.state;
    languages.splice(index,1)
    this.setState({languages});
  }

  render() {
    const {
      name,
      email,
      phNo,
      programmingLangs,
      languages,
      skills,
      sendSkills,
      showEmailValidator,
    } =  this.state;
    const {
      history,
      logIn,
      loginLoader
    } = this.props;

    const langOptions = programmingLangs.map((data, index) => (
      <Option key={data}>{data}</Option>
    ));

    const skillOptions = skills.map((data, index) => (
      <Option key={data}>{data}</Option>
    ))

    return(
      <Row
        className='darkBack full-width full-height'
        align='middle'
        justify='end'
      >
        <Col xs={0} md={16} className='full-height hackBack'>
          <div className='m-l-30 m-t-30'>
            <img
              src={thickPic.default}
              style={{width: 25, height: 'auto',}}
              alt=""
            />
          </div>
        </Col>
        <Col xs={24} md={8} className='p-10 p-r-30'>
          <div
            className='text-white bold-600 text-mdl'>
            Brigosha Hackathon 2020
          </div>
          <div className='m-t-30'>
            <LoginInputs
              type="text"
              value={name}
              onChangeText={(e) => this.setState({name: e.target.value})}
              label='Name'
              after={
                <BsCheckCircle className='text-cyan' style={{opacity: name ? 1 : 0}} />
              }
            />
          </div>
          <div className='m-t-15'>
            <LoginInputs
              type="email"
              value={email}
              onChangeText={(e) => {
                const { value } = e.target;
                const reg = /\S+@\S+\.\S+/;
                if(!reg.test(value)) this.setState({showEmailValidator: true})
                else this.setState({showEmailValidator: false})
                this.setState({email: value})
              }}
              label='E-mail'
              after={<BsCheckCircle className='text-cyan' style={{opacity: email && !showEmailValidator ? 1 : 0}} />}
            />
            <div
              className='text-xs text-red bold-500'
              style={{
                height: '1.2em',
                textShadow: '0px 0px 2px rgba(255,255,255, 0.5)',
              }}>
              {showEmailValidator && email? 'Enter a valid email address':''}
            </div>
          </div>
          <div className='m-t-15'>
            <LoginInputs
              value={phNo}
              onChangeText={(e) => {
                const { value } = e.target;
                const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
                if ((!Number.isNaN(value) && reg.test(value)) || value === '' || value === '-') {
                  this.setState({phNo: e.target.value})
                }
              }}
              label='Phone Number'
              after={<BsCheckCircle className='text-cyan' style={{opacity: phNo.length === 10 ? 1 : 0}} />}
            />
          </div>
          {/*
          <Row className='m-t-15'>
              <Col xs={9}>
              <LoginInputs
                label='Expreience'
                after={
                  <div className='bold-500 fade-color transparentBack'>Years</div>
                }
              />
            </Col>
            <Col xs={1} />
            <Col xs={14}>
              <LoginInputs
                value={languages.toString()}
                disabled
                label='Programming Languages'
                after={
                  <Dropdown overlay={this.menu} trigger={['click']} >
                    <DownOutlined />
                  </Dropdown>
                }
              />
            </Col>
          </Row>
          */}
          <div className='m-t-15'>
            <div className='m-b-5 text-xs text-e3'>
              Languages
            </div>
            <Select
              size='large'
              defaultValue=''
              onChange={(e) => this.addPl(e)}
              style={{
                width: '100%'
              }}
            >
              {langOptions}
            </Select>
            <div className='m-t-10 m-b-10'>
              {languages.length ? languages.map((data, index) =>
                <Tag
                  key={index.toString()}
                  className='skillTag transparentBack'
                  closable
                  closeIcon={
                    <CloseOutlined
                      className='text-xs'
                      style={{
                        color: 'white',
                        border: '1px solid white',
                        padding: 2,
                        borderRadius: 20
                      }}
                    />
                  }
                  onClose={() => this.removeLanguage(index)}
                >
                  {data}
                </Tag>
              ): null}
            </div>
          </div>
          <div className='m-b-5 text-xs text-e3'>
            Skills
          </div>
          <Select
            size='large'
            defaultValue=''
            onChange={(e) => this.addSkill(e)}
            style={{ width: '100%' }}
          >
            {skillOptions}
          </Select>
          <div className='m-t-15'>
            {sendSkills.length ? sendSkills.map((data, index) =>
              <Tag
                key={index.toString()}
                className='skillTag transparentBack'
                closable
                closeIcon={
                  <CloseOutlined
                    className='text-xs'
                    style={{
                      color: 'white',
                      border: '1px solid white',
                      padding: 2,
                      borderRadius: 20
                    }}
                  />
                }
                onClose={() => this.removeSkill(index)}
              >
                {data}
              </Tag>
            ): null}
          </div>
          <Button
            onClick={() => logIn({
              name: name,
              phone: phNo,
              email: email,
              programmingLangs: languages,
              skills: sendSkills,
            }, history)}
            size='large'
            style={{
              color: 'white',
              marginTop: 15,
              borderRadius: 100,
              width: '100%',
              border: 'none',
              backgroundImage: 'linear-gradient(90deg, #EE677E, #EB57DE)',
            }}>
            Proceed <BsBoxArrowInRight /> {loginLoader ? <LoadingOutlined style={{color: 'white'}} /> : <div style={{width: '1em', height: '1em'}} />}
          </Button>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    loginLoader
  } = state.login;
  return {
    loginLoader
  }
};

const mapDispatchToProps = dispatch => ({
  logIn: (params, history) => dispatch(logIn(params, history)),
  setStudentId: (value) => dispatch(setStudentId(value)),
  setStudentTestId: (value) => dispatch(setStudentTestId(value)),
  resetStudentTest: () => dispatch(resetStudentTest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
