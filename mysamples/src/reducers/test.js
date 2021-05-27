import {
  TOGGLE_TEST_LOADER,
  SET_TEST_QUESTIONS,
  SET_TEST_DETAILS,
  RESET_STUDENT_TEST,
  SET_QUES,
  SET_RESULT,
  SET_BOOKMARK,
  SET_ANSWER,
  SET_ANSWER_ARRAY,
  SET_ADMIN_ANSWER,
  SET_ADMIN_QINDEX,
  SET_ADMIN_OPTION_VALUE,
  SET_ADMIN_QUESTION,
  SET_TIME_AND_SEC,
  SET_Q_TYPE,
  ADD_ADMIN_QUES,
  DELETE_ADMIN_QUES,
  ADD_ADMIN_OPTION,
  DELETE_ADMIN_OPTION,
  PUSH_ADMIN_TEST,
  SET_ADMIN_TEST_LIST,
  TOGGLE_ADMIN_BOARD_LOADER,
  SET_CURRENT_ADMIN_TEST,
  TOGGLE_DELETE,
  PUSH_Q_TO_ARRAY,
  SET_STATEMENT,
  SET_STUDENT_ID,
  SET_STUDENT_TEST_ID,
  UPDATE_Q_PARAMS,
  TOGGLE_DEL_Q_LOADER
} from '../actions/test';

const initialState = {
  testLoader: false,
  deleteLoader: false,
  questions: [],
  studentTestId: '',
  studentId: '',
  editingTest: [],
  testDetails: {},
  qindex: 0,
  solutions: [],
  result: {},
  currentQType: 'Short',
  adminQIndex: -1,
  testList: [
    {
      "id": 2,
      "title": "Test2",
      "type": "Aptitude",
      "totalPoints": null,
      "startTime": "2020-12-18T21:30:00.000Z",
      "duration": "20"
    },
    {
      "id": 1,
      "title": "Test1",
      "type": "Aptitude",
      "totalPoints": 6,
      "startTime": "2020-12-18T21:30:00.000Z",
      "duration": "20"
    }
  ],
  editingTest: {
    "id": 1,
    "title": "Test1",
    "type": "Aptitude",
    "totalPoints": 6,
    "startTime": "2020-12-18T21:30:00.000Z",
    "duration": "20"
  },
  adminQ: [
    // {
    //   question: null,
    //   type: 'MCQ',
    //   positive: 3,
    //   negative: 1,
    //   options: [
    //
    //   ]
    // },
    // {
    //   question: null,
    //   type: 'Short',
    //   positive: 3,
    //   negative: 1,
    //   answer: '',
    //   options: []
    // }
  ],
  currentQ: {
    question: "<p></p>",
    type: 'Short', //state.adminQIndex
    positive: 3,
    negative: 1,
    answer: '',
    options: [],
  },
  adminBoardLoader: false,
  questionImagesList: [],
  deletedImages: [],
  oldImageList: [],
  seconds: 3600,
  time: {
    h: 1,
    m: 0,
    s: 0,
  },
  delQLoader: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_TEST_LOADER:
      return {
        ...state,
        testLoader : action.bool
      };
    case TOGGLE_DEL_Q_LOADER:
      return {
        ...state,
        delQLoader : action.state
      };
    case TOGGLE_DELETE:
      return {
        ...state,
        deleteLoader : action.bool
      };
    case TOGGLE_ADMIN_BOARD_LOADER:
      return {
        ...state,
        adminBoardLoader : action.bool
      };
    case SET_TEST_QUESTIONS:
      return {
        ...state,
        questions: action.data,
        solutions: action.answerArray,
      };
    case SET_TEST_DETAILS:
      const time = {
        h: Math.floor(action.data.duration / 60),
        m: action.data.duration % 60,
        s: 0,
      }
      return {
        ...state,
        testDetails : {
          ...action.data
        },
        time: {...time},
        seconds: action.data.duration * 60
      };
    case SET_QUES:
      return {
        ...state,
        qindex : action.index
      };
    case SET_RESULT:
      return {
        ...state,
        result : action.data
      };
    case SET_STUDENT_TEST_ID:
      return {
        ...state,
        studentTestId : action.value
      };
    case SET_STUDENT_ID:
      return {
        ...state,
        studentId : action.value
      };
    case SET_BOOKMARK:
      if(typeof state.questions[action.index].bookmarked == 'undefined') {
        state.questions[action.index].bookmarked = true;
      } else {
        state.questions[action.index].bookmarked = !state.questions[action.index].bookmarked
      }
      return {
        ...state,
        questions: state.questions.slice(0)
      }
    case SET_ANSWER:
      if(state.questions[state.qindex].type === 'MCQ' && state.questions[state.qindex].answer === action.value) {
        state.questions[state.qindex].answer = '';
      } else {
        state.questions[state.qindex].answer = action.value;
      }
      return {
        ...state,
        questions: state.questions.slice(0)
      }
    case SET_ADMIN_ANSWER:
      // let que = {...state.currentQ, answer: action.value}
      // if(state.currentQ.type === 'MCQ') {
      //   // if(state.currentQ.options[action.value] === action.value) {
      //   //   state.currentQ.options[action.value] = ''
      //   // } else {
      //   //   que = {...state.currentQ, answer: action.value}
      //   // }
      // } else {
      //   state.currentQ.answer = action.value
      // }
      return {
        ...state,
        currentQ: {...state.currentQ, answer: action.value}
      }
    case SET_ADMIN_OPTION_VALUE:
      state.currentQ.options[action.index] = action.value;
      return {
        ...state,
        // adminQ: state.adminQ.slice(0)
        currentQ: {...state.currentQ }
      }
    case SET_Q_TYPE:
      // state.adminQ[state.adminQIndex].type = action.value;
      state.currentQ.type = action.value;
      console.log(SET_Q_TYPE, state.currentQ);
      return {
        ...state,
        // adminQ: state.adminQ.slice(0),
        currentQ: {...state.currentQ},
      }
    case PUSH_Q_TO_ARRAY:
      // state.adminQ[state.adminQIndex].type = action.value;
      let nextQ;
      const quest = {...state.currentQ, question: action.statement,
        id: state.currentQ.id === -1 ?
        null : state.currentQ.id };
      if(state.adminQ[state.adminQIndex]){
        state.adminQ[state.adminQIndex] = quest;
      }else{
        state.adminQ.push(quest);
      }
      state.adminQIndex = state.adminQIndex === -1 ? 0 : state.adminQIndex;
      if(state.adminQ[state.adminQIndex+1]){
        nextQ = {...state.adminQ[state.adminQIndex+1]}
      }else{
        nextQ = {
          question: "<p></p>",
          type:  'Short', //state.adminQIndex
          positive: 3,
          negative: 1,
          answer: '',
          options: [],
        }

      }
      return {
        ...state,
        adminQIndex: state.adminQIndex+1,
        adminQ: [...state.adminQ],
        currentQ: {...nextQ}
      }
    case ADD_ADMIN_QUES:
      state.adminQ.push({
        question: '<p></p>',
        type: state.adminQ.length ? state.adminQ[state.adminQIndex].type : 'Short',
        positive: 3,
        negative: 1,
        answer: '',
        options: [],
      })
      return {
        ...state,
        // adminQ: state.adminQ.slice(0)
        currentQ: {
          question: "<p></p>",
          type: state.adminQ.length ? state.adminQ[state.adminQIndex].type : 'Short', //state.adminQIndex
          positive: 3,
          negative: 1,
          answer: '',
          options: [],
        }
      }
    case DELETE_ADMIN_QUES:
      state.adminQ.splice(state.adminQIndex, 1);
      if (state.adminQIndex > state.adminQIndex.length - 1) {
        state.adminQIndex = state.adminQ.length - 1
      }
      return {
        ...state,
        adminQ: state.adminQ.slice(0),
        adminQIndex: state.adminQIndex,
      }
    case ADD_ADMIN_OPTION:
      if(state.currentQ.options.length < 4) {
        state.currentQ.options.push('')
      }
      return {
        ...state,
        adminQ: state.adminQ.slice(0)
      }
    case UPDATE_Q_PARAMS:
        return {
          ...state,
          currentQ: {...state.currentQ, ...action.qParam}
        };
    case DELETE_ADMIN_OPTION:
      if(state.adminQ[state.adminQIndex].options.length > 0) {
        state.adminQ[state.adminQIndex].options.splice(action.index, 1)
      }
      return {
        ...state,
        adminQ: state.adminQ.slice(0)
      }
    case SET_ANSWER_ARRAY:
      state.solutions[state.qindex].answer = state.questions[state.qindex].answer
      return {
        ...state,
        solutions: state.solutions.slice(0)
      }
    case SET_ADMIN_QINDEX:
      return {
        ...state,
        adminQIndex: action.index
      }
    case PUSH_ADMIN_TEST:
      state.testList.push(action.data);
      return {
        ...state,
        testList: state.testList.slice(0)
      }
    case SET_ADMIN_TEST_LIST:
      state.testList = action.data
      return {
        ...state,
        testList: state.testList.slice(0)
      }
    case RESET_STUDENT_TEST:
      return {
        ...state,
        questions: [],
        qindex: 0,
        solutions: [],
      }
    // case SET_ADMIN_QUESTION:
    //   // state.adminQ[state.adminQIndex].question = action.value
    //   // state.currentQ.question = action.value;
    //   return {
    //     ...state,
    //     currentQ: {...state.currentQ, question: action.value}
    //     // adminQ: state.adminQ.slice(0)
    //   }
    case SET_STATEMENT:
      return {
        ...state,
        currentQ: {...state.currentQ, question: action.value}
      }
    case SET_CURRENT_ADMIN_TEST:
      return {
        ...state,
        editingTest: action.data,
        adminQ: action.data.questions,
      }
    case SET_TIME_AND_SEC:
      return {
        ...state,
        time: action.time,
        seconds: action.sec
      }
    default:
      return state;
  }
};

export default reducer;
