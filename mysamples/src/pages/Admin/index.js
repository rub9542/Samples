import React from 'react';
import { Row, Col, Button, Switch} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import {
  LoginInputs
} from '../../components';
import '../../design/layout.css';
import './styles.css';
import {Api} from '../../services';
import {
  adminLogin
} from '../../actions/login';
import { BsCheckCircle } from 'react-icons/bs';

const thickPic = require("../../Assets/brilogo.png");

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showEmailValidator: false,
      email: '',
      pass: '',
    }
  }
  componentDidMount() {
    this.setState({
      email: "admin@brigosha.com",
      pass: "1234"
    })
  }


  render() {
    const {
      email,
      pass,
      showEmailValidator,
    } =  this.state;
    const {
      history,
      adminLogin,
      loginLoader,
    } = this.props;
    return(
      <Row
        className='darkBack full-width full-height'
        align='middle'
        justify='end'
      >
        <Col xs={0} md={16} className='full-height'>
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
              type='password'
              value={pass}
              onChangeText={(e) =>
                this.setState({pass: e.target.value})
              }
              label='Password'
            />
          </div>
          <Button
            onClick={() => adminLogin({
              email: email,
              password: pass,
            }, history)}
            size='large'
            style={{
              color: 'white',
              marginTop: 25,
              borderRadius: 100,
              width: '100%',
              border: 'none',
              backgroundImage: 'linear-gradient(90deg, #EE677E, #EB57DE)',
            }}>
            Sign In {loginLoader ? <LoadingOutlined style={{color: 'white'}} /> : <div style={{width: '1em', height: '1em'}} />}
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
  adminLogin: (params, history) => dispatch(adminLogin(params, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
