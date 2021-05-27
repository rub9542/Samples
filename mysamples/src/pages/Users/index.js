import React from 'react';
import {
  Row, Col, Tag,
  Button, Tabs,
  Radio, Input,
  Upload, Empty,
  Menu, Dropdown,
  Select, Checkbox, Table
} from 'antd';
import { connect } from "react-redux";
import {
  CloseOutlined, DeleteOutlined,
  PlusCircleOutlined, StarOutlined, LeftOutlined
} from '@ant-design/icons';
import {BsFillBookmarkFill, BsBookmark, BsCaretRightFill} from 'react-icons/bs';
import {ListQuestionBox, RedButton, OptionBox} from '../../components';
import '../../design/layout.css';
import { Color } from '../../services'
import {getUsers, updateUserSelect, selectAll, updateUserStatus, sendMail, setUserStatusFilter} from '../../actions/users'
import './styles.css';
import {
  LoadingDataModal
} from '../../components';

const { TabPane } = Tabs;
const { Option } = Select;

const thickPic = require("../../Assets/brilogo.png");
const phpImg = require("../../Assets/instructions.png");
const columns = [
  {
    title: 'Total Questions',
    dataIndex: 'qCount',
  },
  {
    title: 'Attempted',
    dataIndex: 'attempted',
  },
  {
    title: 'Correct',
    dataIndex: 'correct',
  },
  {
    title: 'Incorrect',
    dataIndex: 'wrong',
  },
  {
    title: 'Total Marks',
    dataIndex: 'totalMarks',
  },
];

class Users extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectIndex: -1
    }
  }

  state = {
    value: ' '
  }

  handleChange(value) {
    this.setState({ value });
  }

  componentDidMount() {
    this.props.getUsers();
  }

  componentWillUnmount(){
    this.props.emailList.splice(0, this.props.emailList.length)
  }

  changeUserStatus(status){
    const userId = this.props.users[this.state.selectIndex].id;
    this.props.updateUserStatus(this.state.selectIndex, userId, status)
  }

  render() {
    const {
      users, history, updateUserSelect, selectAll, selectLoader, rejectLoader, sendMail, userLoader, setUserStatusFilter, userStatusFilter, mailLoader
    } = this.props;
    return (
      <div className='full-width full-height mainGreyBack' >
        <Row
          className='testTopBack p-10 text-center'
          justify='space-between'
          align='middle'
        >
          <Col className='text-white text-md bold-600'>
            Brigosha Hackathon
          </Col>
          <Col className='text-white text-md bold-600'>
            Users
            {/*{editingTest.title}*/}
          </Col>
          <Col>
          <Button
            onClick={() => history.push('/admin/dashboard')}
            style={{
              backgroundColor: '#FF4365',
              color: 'white',
              border: 'none',
              fontWeight: 500,
              borderRadius: 5,
              marginTop: 10,
            }}>
            Tests
          </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={10}>
            <div className='r-jsb' style={{margin: 10}}>
              <div>
                <Select defaultValue="2020" style={{ width: 120 }} onChange={(val) => console.log(val)}>
                  <Option value="2020">2020</Option>
                </Select>
                <Select defaultValue="All" value={userStatusFilter} style={{ width: 120 }} onChange={(val) => setUserStatusFilter(val)}>
                  <Option value="All">All</Option>
                  <Option value="Selected">Selected</Option>
                  <Option value="Rejected">Rejected</Option>
                </Select>
              </div>
              <div>
                {/*<RedButton style={{marginRight: 10}} onClick={() => console.log("Add User")} disabled={true}>
                  Add User +
                </RedButton>*/}
                <RedButton loading={mailLoader} onClick={() => sendMail()}>
                  Send Link
                </RedButton>
              </div>
            </div>

            <div className='listQBox m-10 hideScroll'>
              {!users || !users.length ?
                    <Empty
                      className='r-c-c-c'
                      description={
                      <div>
                        <div className='text-lightGrey bold-600'>
                          No Users Found
                        </div>
                        {/*<RedButton onClick={() => console.log("Add User")}>
                          Add User +
                        </RedButton>*/}
                      </div>
                      }
                      style={{marginTop: '20%'}}
                    />
                :
                <div style={{height: '100%'}}>
                  {users.filter(user => userStatusFilter === "All" ? user : user.status === userStatusFilter).map((user, index) =>
                    <div className='cursor-pointer' onClick={() => this.setState({selectIndex: index})}
                    key={index} style={{ margin: 5, padding: 5, borderRadius: 5,
                      backgroundColor: this.state.selectIndex === index ? Color.lightprimary : 'transparent'}}>
                      <div className='display-flex'>
                        <div className='r-c-c' style={{flex: 1}}  ><Checkbox onClick={(e) => {updateUserSelect(index); e.stopPropagation();}} checked={user.selected}/></div>
                        <div style={{flex:3}}>
                          <div style={{fontSize: 16}}>{user.name}</div>
                          <div style={{fontSize: 12, color: Color.aeGrey}}>{user.phone}</div>
                        </div>
                        {/*<div style={{flex:2}}>
                          <div style={{fontSize: 16}}>{user.email}</div>
                        </div>
                        <div style={{flex:2}}>
                          <div style={{fontSize: 16}}>2020</div>
                          <div style={{fontSize: 10, color: Color.aeGrey}}>Year of Passing</div>
                        </div>*/}
                        <div style={{flex:1}}>
                          <div style={{fontSize: 16}}>{user && user.testResult ?user.testResult.totalMarks : "NA" }</div>
                          <div style={{fontSize: 10, color: Color.aeGrey}}>Score</div>
                        </div>
                        <div style={{flex:1}}>
                          <div style={{fontSize: 16}}>{user && user.score && user.score || 'NA'}</div>
                          <div style={{fontSize: 10, color: Color.aeGrey}}>CGPA</div>
                        </div>
                      </div>
                    </div>

                  )}
                </div>}
            </div>
            <div className='display-flex' style={{ margin: 5, padding: 5, borderRadius: 5,}}>
                <div className='r-c-c' style={{marginLeft: 60}}><Checkbox onClick={(e) => selectAll(e.target.checked)}>Select All</Checkbox></div>
            </div>
          </Col>
          <Col xs={14}>
            <div style={{height: '100%', width: '100%'}} >
              {
                this.state.selectIndex === -1 ?
                  <div className='r-c-c' style={{height: '100%', width: '100%'}}>
                    <Empty
                      description="Select a student"
                    />
                  </div>

                :
                <>
                  <Row style={{width: '90%', margin: 10, padding: 10, backgroundColor: Color.darkGrey, borderRadius: 5}}>
                      <Col span={22}>
                        <div style={{fontSize: 20, color: 'white', fontWeight: 800}}>{users[this.state.selectIndex].name}</div>
                        <div style={{fontSize: 14, color: 'white'}}>{users[this.state.selectIndex].email}</div>
                      </Col>
                      <Col span={2}>
                        <div className='r-c-c-c' style={{fontSize: 20, color: 'white', fontWeight: 800}}>{users[this.state.selectIndex].passYear || 'NA'}</div>
                      </Col>
                  </Row>
                  <Row style={{width: '90%', margin: 10, padding: 10}}>
                      <div style={{width: '100%', border: '1px solid gray', padding: 10, borderRadius: 5}}>
                        <Row>
                          <span style={{fontWeight: 800, marginRight: 5}}>CGPA:</span> {users[this.state.selectIndex].score || 'NA'}
                        </Row>
                        <Row>
                          <span style={{fontWeight: 800, marginRight: 5}}>Hackathon Result:</span>
                        </Row>
                        <Row>
                          {users[this.state.selectIndex].testResult ? <Table
                              style={{width: '100%'}}
                              columns={columns}
                              pagination={false}
                              dataSource={ [users[this.state.selectIndex].testResult]}
                            /> : 'NA'}
                        </Row>
                      </div>
                      <div style={{width: '100%', border: '1px solid gray', padding: 10, borderRadius: 5, marginTop: 20}}>
                        <Row>
                          <span style={{fontWeight: 800, marginRight: 5}}>Programming Languages:</span> {users[this.state.selectIndex].programmingLangs.map((lang, index, array) => (<>{lang} {index == array.length - 1 ? '' : '|'} </>))}
                        </Row>
                        <Row>
                          <span style={{fontWeight: 800, marginRight: 5}}>Skills:</span> {users[this.state.selectIndex].skills.map((skill, index, array) => (<>{skill} {index == array.length - 1 ? '' : '|'} </>))}
                        </Row>
                      </div>
                      <div className="r-c-c-c"style={{width: '100%',  padding: 10, borderRadius: 5, marginTop: 20}}>
                        <Row>
                          {
                            users[this.state.selectIndex].status === "Pending" || users[this.state.selectIndex].status === "Rejected" ?
                            <Button type="primary" className="selectButton" loading={selectLoader} onClick={() => this.changeUserStatus("Selected")}>Select</Button> :
                            <Tag color="green" className="r-c-c">Selected</Tag>
                          }
                          {
                            users[this.state.selectIndex].status === "Pending" || users[this.state.selectIndex].status === "Selected" ?
                            <Button type="primary" className="rejectButton" loading={rejectLoader} onClick={() => this.changeUserStatus("Rejected")}>Reject</Button> :
                            <Tag color="red" className="r-c-c">Rejected</Tag>
                          }
                        </Row>
                      </div>
                  </Row>
                </>
              }
            </div>

          </Col>
        </Row>
        <LoadingDataModal
          visible={userLoader}
          title='Users'
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    userLoader,
    users,
    selectLoader,
    rejectLoader,
    emailList,
    userStatusFilter,
    mailLoader
  } = state.users;
  return {
    userLoader,
    users,
    selectLoader,
    rejectLoader,
    emailList,
    userStatusFilter,
    mailLoader
  }
};

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsers()),
  updateUserSelect: index => dispatch(updateUserSelect(index)),
  selectAll: (bool) => dispatch(selectAll(bool)),
  updateUserStatus: (index, userId, status) => dispatch(updateUserStatus(index, userId, status)),
  sendMail: () => dispatch(sendMail()),
  setUserStatusFilter: (val) => dispatch(setUserStatusFilter(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
