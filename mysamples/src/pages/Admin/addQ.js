import React from 'react';
import { Color } from '../../services'
import {
  Row, Col, Tag,
  Button, Tabs,
  Radio, Input,
  Upload, Empty,
  Menu, Dropdown, Modal
} from 'antd';
import { connect } from "react-redux";
import {
  setAdminAnswer,
  setAdminQindex,
  setAdminOptionValue,
  // setAdminQuestion,
  setStatement,
  setQtype,
  addAdminQues,
  deleteAdminQues,
  deleteAdminOption,
  addAdminTestQues,
  addAdminOption,
  deleteImages,
  pushQToArray,
  handleQuestionInput
} from '../../actions/test';
import {
  CloseOutlined, DeleteOutlined,
  PlusCircleOutlined, StarOutlined, LeftOutlined,
  SaveOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';
import {BsFillBookmarkFill, BsBookmark, BsCaretRightFill, BsCaretDownFill} from 'react-icons/bs';
import {ListQuestionBox, RedButton, OptionBox} from '../../components';
import '../../design/layout.css';
import './styles.css';
import {data} from './loremData.js';
import FormulaEditor from './formulaEditor';

const { TabPane } = Tabs;
const { confirm } = Modal;

const thickPic = require("../../Assets/brilogo.png");
const phpImg = require("../../Assets/instructions.png");

function getFilename(url){
  return url ? url.split('/').pop().split('#').shift().split('?').shift() : null;
}

class Test extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rendorEditor: true
    }
  }

  componentWillUnmount(){
    this.clearCurrentQ();
  }

    onDelete(self) {
    return confirm({
      title: `Doyou want to delete the question?`, //${text}
      icon: <ExclamationCircleOutlined />,
      content: 'Please click OK to confim',
      onOk() {self.onDeleteConfirm()},
      onCancel() {},
    })
  }


  onDeleteConfirm(){
    const {deleteAdminQues} = this.props;
    deleteAdminQues();
    this.clearCurrentQ();
  }

  onChange(value) {
    // if(value === "<p><br></p>" && this.props.adminQ[this.props.adminQIndex] === "<p><br></p>") return
    // this.props.setAdminQuestion(value);
    this.props.setStatement(value)
  };

  onSave(){
     const statement =  FormulaEditor.quillRef.getEditorContents();

    this.props.pushQToArray(statement);
    // this.props.setAdminQindex(this.props.adminQIndex + 1);
  }

  clearImages(){
    const {
      questionImagesList,
      deleteImages,
      oldImageList,
      deletedImages,
      adminQIndex,
      adminQ,
    } =  this.props;
    let deletedList = [];
    if(adminQIndex < adminQ.length - 1){ //Edit question case
      deletedImages.forEach(img => {
        if(!oldImageList.includes(img)){
          deletedList.push(img)
        }
      })
    }else{ //Add Question case
      deletedList = [...deletedImages];
      questionImagesList.forEach(img => {
        if(!deletedImages.includes(img)){
          deletedList.push(img)
        }
      })
    }
    if(deletedList.length){
     deleteImages(deletedList);
    }
    questionImagesList.splice(0, questionImagesList.length )
    deletedImages.splice(0, deleteImages.length)
    oldImageList.splice(0, oldImageList.length)
  }

  clearCurrentQ(){
    const { setAdminQindex, handleQuestionInput} = this.props;
    handleQuestionInput(-1, 'id');
    handleQuestionInput("<p></p>", 'question');
    handleQuestionInput("Short", 'type');
    handleQuestionInput("", 'answer');
    handleQuestionInput(1, 'negative');
    handleQuestionInput(3, 'positive');
    handleQuestionInput([], 'options');
    setAdminQindex(-1);
  }

  qClick = (index) => {
    const {
      adminQ,
      adminQIndex,
      setAdminQindex,
      questionImagesList,
      oldImageList,
      handleQuestionInput,
    } =  this.props;
    setAdminQindex(index);
    handleQuestionInput(adminQ[index].id, 'id');
    handleQuestionInput(adminQ[index].question, 'question');
    handleQuestionInput(adminQ[index].type, 'type');
    handleQuestionInput(adminQ[index].answer, 'answer');
    handleQuestionInput(adminQ[index].negative, 'negative');
    handleQuestionInput(adminQ[index].positive, 'positive');
    handleQuestionInput(adminQ[index].options, 'options');
    Array.from( new DOMParser().parseFromString( adminQ[index], 'text/html' )
    .querySelectorAll( 'img' ) )
    .map( img => {
      questionImagesList.push(getFilename(img.getAttribute( 'src' )))
      oldImageList.push(getFilename(img.getAttribute( 'src' )))
    })
  }

  typeMenu = (
    <Menu>
      <Menu.Item onClick={() => this.props.handleQuestionInput('Short','type')}>
        Short
      </Menu.Item>
      <Menu.Item onClick={() => this.props.handleQuestionInput('MCQ','type')}>
        MCQ
      </Menu.Item>
    </Menu>
  );

  render() {
    const {
      adminQ,
      adminQIndex,
      testLoader,
      setAdminQindex,
      setAdminAnswer,
      addAdminQues,
      addAdminOption,
      addAdminTestQues,
      setAdminOptionValue,
      deleteAdminOption,
      deleteAdminQues,
      deletedImages,
      questionImagesList,
      editingTest,
      history,
      currentQ,
      pushQToArray,
      delQLoader
    } = this.props;
    // if(!adminQ || !adminQ.length) {
    //   // return (
    //   //   <div>
    //   //     <Row
    //   //       className='testTopBack p-10 text-center'
    //   //       justify='space-between'
    //   //       align='middle'
    //   //     >
    //   //       <Col className='text-white text-md bold-600'>
    //   //         Brigosha Hackathon
    //   //       </Col>
    //   //       <Col className='text-white text-md bold-600'>
    //   //         Questions
    //   //         {/*{editingTest.title}*/}
    //   //       </Col>
    //   //       <Col className='text-white text-md bold-600'>
    //   //
    //   //       </Col>
    //   //     </Row>
    //   //     <Empty
    //   //       description={
    //   //       <div>
    //   //         <div className='text-lightGrey bold-600'>
    //   //           No Questions Added
    //   //         </div>
    //   //         <RedButton onClick={() => addAdminQues()}>
    //   //           Add Question +
    //   //         </RedButton>
    //   //       </div>
    //   //       }
    //   //       style={{marginTop: '20%'}}
    //   //     />
    //   //   </div>
    //   // )
    // }
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
            Questions
            {/*{editingTest.title}*/}
          </Col>
          <Col>
            <RedButton
              loading={testLoader}
              onClick={() => addAdminTestQues(history)}
              shadowString='1px 1px 2px 0px #205'
              margin='0px 10px 0px 0px'
            >
              <SaveOutlined />
            </RedButton>
            <RedButton
              onClick={() => {this.clearCurrentQ(); setAdminQindex(adminQ.length)}}
              shadowString='1px 1px 2px 0px #205'
              margin='0px 10px 0px 0px'
            >
              <PlusCircleOutlined />
            </RedButton>

          </Col>
        </Row>
        <Row>
          <Col xs={8}>

           <div className='listQBox m-10 hideScroll'>
              <div className='p-10 divider topQListBar r-c-sb text-lightGrey'>
                <div  className='text-md bold-600 cursor-pointer' onClick={() => {history.goBack()}}>
                  <LeftOutlined /> {editingTest.title}
                </div>
                <div>
                  {adminQ.length} {adminQ.length > 1 ? 'Questions ' : 'Question '}
                   | Total Points: {adminQ.length * 3}
                </div>
              </div>
              {!adminQ || !adminQ.length ?
                      <Empty
                        className='r-c-c-c'
                        description={
                        <div>
                          <div className='text-lightGrey bold-600'>
                            No Questions Added
                          </div>
                          {/*<RedButton onClick={() => {addAdminQues(); setAdminQindex(0)}}>
                            Add Question +
                          </RedButton>*/}
                        </div>
                        }
                        style={{marginTop: '20%'}}
                      /> :
                adminQ.map((data, index) =>  (
                <div style={index === adminQIndex ? {backgroundColor: Color.lightprimary, margin: 1, borderRadius: 5} : {}}>
                  <ListQuestionBox
                    admin
                    onPressQues={() => this.qClick(index)}
                    data={data}
                    index={index}
                    isSet={false}
                  />
                </div>
              ))}
            </div>
          </Col>
          <Col xs={16}>
          {
            <div className='listQBox hideScroll m-10'>
              <div className='p-10 divider-dark topQListBar r-c-sb text-lightGrey'>
                <div>
                  Question {adminQIndex + 1}
                </div>
                <div>
                  { currentQ ?
                    <>
                    {/*Points: {adminQ[adminQIndex].positive}  Negative:{-1*adminQ[adminQIndex].negative}*/}
                    Points: {currentQ.positive}  Negative:{-1*currentQ.negative}
                    </> :
                    null }
                </div>
                <Dropdown trigger={['hover']} overlay={this.typeMenu}>
                  <Button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      boxShadow: '1px 1px 2px 1px #ff436577',
                      margin: '0px 0px 0px 10px',
                      backgroundColor: '#FF4365',
                      color: 'white',
                      border: 'none',
                      fontWeight: 500,
                      borderRadius: 5,
                    }}
                  >
                    {currentQ && currentQ.type } <BsCaretDownFill />
                  </Button>
                </Dropdown>
              </div>
              <div className='r-jsb-c flex-1 m-b-10'>
                <div className='p-10 flex-1'>
                  {
                   <FormulaEditor
                    id={'statement'}
                    deletedImages={deletedImages}
                    deleteImages={(imgList, index) => deleteImages(imgList, index)}
                    resetEditor={() => this.resetEditor()}
                    clearImages={() => this.clearImages()}
                    data={currentQ ? currentQ.question : '<p></p>'}
                    imagesList={questionImagesList}
                    onChange={(value) => this.onChange(value)} //this.onChange(value)
                    />}
                </div>
                <div className='m-t-10 flex-1'>
                  { currentQ &&  currentQ.type === 'MCQ' ?
                  <>
                    <span className='text-red p-l-10'>* </span>Add Correct Answer
                    <RedButton
                      onClick={() => addAdminOption()}
                      margin='0px 0px 0px 20px'
                      shadowString='1px 1px 2px 1px #ff436577'
                    >
                      Add Option
                    </RedButton>
                  </>
                  : null}
                  {currentQ && currentQ.type === "Short" ?
                    <div className='full-width p-10'>
                      <Input
                        className='optionBox'
                        size='large'
                        value={currentQ.answer}
                        onChange={(e) => setAdminAnswer(e.target.value)}
                      />
                    </div>
                  : null}
                  {currentQ && currentQ.type === 'MCQ' && currentQ.options && currentQ.options.length ? currentQ.options.map((data, index) =>
                    <OptionBox
                      data={data}
                      index={index}
                      isSelected={index.toString() === currentQ.answer}
                      setAdminAnswer={() => setAdminAnswer(index.toString())}
                      setAdminOptionValue={(value) => setAdminOptionValue(value, index)}
                      deleteAdminOption={() => deleteAdminOption(index)}
                    />
                  ) : null}
                    {/*<Button
                      onClick={() => deleteAdminQues()}
                      shadowString='1px 1px 2px 0px #205'
                      margin='0px 10px 0px 0px'
                    >
                      <DeleteOutlined />
                    </RedButton>*/}
                    <div className='r-fe-fe m-r-10'>
                    <Button
                      onClick={() => this.onDelete(this)}
                      size='large'
                      type={'primary'}
                      loading={delQLoader}
                      style={{
                        paddingLeft: 25,
                        paddingRight: 25,
                        marginTop: 15,
                        borderRadius: 10,
                        marginRight: 10,
                        backgroundColor: Color.red,
                        borderColor: Color.red,
                      }}
                      disabled={currentQ ? (!currentQ.question || !currentQ.answer) : true}
                      >
                      Delete
                    </Button>
                    <Button
                      onClick={() => this.onSave()}
                      size='large'
                      type={'primary'}
                      style={{
                        paddingLeft: 25,
                        paddingRight: 25,
                        marginTop: 15,
                        borderRadius: 10,
                        border: '1px solid #A5AAB5',
                      }}
                      disabled={currentQ ? (!currentQ.question || !currentQ.answer) : true}
                      >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </div>}
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    adminQ,
    adminQIndex,
    questionImagesList,
    oldImageList,
    deletedImages,
    testLoader,
    editingTest,
    currentQ,
    delQLoader
  } = state.test;
  return {
    adminQ,
    adminQIndex,
    questionImagesList,
    oldImageList,
    deletedImages,
    testLoader,
    editingTest,
    currentQ,
    delQLoader
  }
};

const mapDispatchToProps = dispatch => ({
  setAdminAnswer: (value) => dispatch(setAdminAnswer(value)),
  setQtype: (value) => dispatch(setQtype(value)),
  addAdminQues: () => dispatch(addAdminQues()),
  deleteImages: (images, index) => dispatch(deleteImages(images, index)),
  deleteAdminQues: () => dispatch(deleteAdminQues()),
  addAdminOption: () => dispatch(addAdminOption()),
  deleteAdminOption: (index) => dispatch(deleteAdminOption(index)),
  setAdminQindex: (index) => dispatch(setAdminQindex(index)),
  // setAdminQuestion: (value) => dispatch(setAdminQuestion(value)),
  setStatement: (value) => dispatch(setStatement(value)),
  addAdminTestQues: (history) => dispatch(addAdminTestQues(history)),
  setAdminOptionValue: (value, index) => dispatch(setAdminOptionValue(value, index)),
  pushQToArray: (statement) => dispatch(pushQToArray(statement)),
  handleQuestionInput: (value, key) => dispatch(handleQuestionInput(value, key)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Test);
