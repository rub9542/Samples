import { Api } from '../services';

export const TOGGLE_TEST_LOADER = 'TOGGLE_TEST_LOADER';
export const SET_TEST_QUESTIONS = 'SET_TEST_QUESTIONS';
export const SET_CURRENT_ADMIN_TEST = 'SET_CURRENT_ADMIN_TEST';
export const SET_TEST_DETAILS = 'SET_TEST_DETAILS';
export const TOGGLE_DELETE = 'TOGGLE_DELETE';
export const RESET_STUDENT_TEST = 'RESET_STUDENT_TEST';
export const SET_QUES = 'SET_QUES';
export const SET_BOOKMARK = 'SET_BOOKMARK';
export const SET_ANSWER = 'SET_ANSWER';
export const SET_RESULT = 'SET_RESULT';
export const SET_TIME_AND_SEC = 'SET_TIME_AND_SEC';
export const SET_ADMIN_ANSWER = 'SET_ADMIN_ANSWER';
export const SET_ANSWER_ARRAY = 'SET_ANSWER_ARRAY';
export const SET_ADMIN_QINDEX = 'SET_ADMIN_QINDEX';
export const SET_ADMIN_QUESTION = 'SET_ADMIN_QUESTION';
export const SET_Q_TYPE = 'SET_Q_TYPE';
export const ADD_ADMIN_QUES = 'ADD_ADMIN_QUES';
export const ADD_ADMIN_OPTION = 'ADD_ADMIN_OPTION';
export const DELETE_ADMIN_QUES = 'DELETE_ADMIN_QUES';
export const DELETE_ADMIN_OPTION = 'DELETE_ADMIN_OPTION';
export const SET_ADMIN_OPTION_VALUE = 'SET_ADMIN_OPTION_VALUE';
export const SET_ADMIN_TEST_LIST = 'SET_ADMIN_TEST_LIST';
export const PUSH_ADMIN_TEST = 'PUSH_ADMIN_TEST';
export const PUSH_Q_TO_ARRAY = 'PUSH_Q_TO_ARRAY';
export const TOGGLE_ADMIN_BOARD_LOADER = 'TOGGLE_ADMIN_BOARD_LOADER';
export const SET_STATEMENT = 'SET_STATEMENT';
export const SET_STUDENT_TEST_ID = 'SET_STUDENT_TEST_ID';
export const SET_STUDENT_ID = 'SET_STUDENT_ID';
export const UPDATE_Q_PARAMS = 'UPDATE_Q_PARAMS';
export const TOGGLE_DEL_Q_LOADER = 'TOGGLE_DEL_Q_LOADER';

export const toggleTestLoader = (bool) => ({
  type: TOGGLE_TEST_LOADER,
  bool,
});

export const toggleAdminBoardLoader = (bool) => ({
  type: TOGGLE_ADMIN_BOARD_LOADER,
  bool,
});

export const toggleDeleteLoader = (bool) => ({
  type: TOGGLE_DELETE,
  bool,
});

export const setTestQuestions = (data, answerArray) => ({
  type: SET_TEST_QUESTIONS,
  data,
  answerArray,
});

export const setStudentTestId = (value) => ({
  type: SET_STUDENT_TEST_ID,
  value,
});

export const setStudentId = (value) => ({
  type: SET_STUDENT_ID,
  value,
});

export const setTestDetails = (data) => ({
  type: SET_TEST_DETAILS,
  data,
});

export const setQues = (index) => ({
  type: SET_QUES,
  index,
});

export const setAnswer = (value) => ({
  type: SET_ANSWER,
  value,
});

export const setQtype = (value) => ({
  type: SET_Q_TYPE,
  value,
});

export const setAdminAnswer = (value) => ({
  type: SET_ADMIN_ANSWER,
  value,
});

export const handleQuestionInput = (value, key) => ({
  type: UPDATE_Q_PARAMS,
  qParam: { [key]: value }
});

export const setAnswerArray = () => ({
  type: SET_ANSWER_ARRAY,
});

export const setBookmark = (index) => ({
  type: SET_BOOKMARK,
  index,
});

export const setStatement = (value) => ({
  type: SET_STATEMENT,
  value,
});

export const resetStudentTest = () => ({
  type: RESET_STUDENT_TEST,
});

// export const setAdminQuestion = (value) => {
//   return {
//   type: SET_ADMIN_QUESTION,
//   value,
// }};

export const setAdminQindex = (index) => ({
  type: SET_ADMIN_QINDEX,
  index,
});

export const addAdminQues = () => ({
  type: ADD_ADMIN_QUES,
});

export const pushQToArray = (statement) => ({
  type: PUSH_Q_TO_ARRAY,
  statement
})

export const addAdminOption = () => ({
  type: ADD_ADMIN_OPTION,
});

export const pushAdminTest = (data) => ({
  type: PUSH_ADMIN_TEST,
  data
});

export const setCurrentAdminTest = (data) => ({
  type: SET_CURRENT_ADMIN_TEST,
  data
});

export const setResult = (data) => ({
  type: SET_RESULT,
  data
});

export const setTimeAndSecs = (time, sec) => ({
  type: SET_TIME_AND_SEC,
  time, sec
});

export const setAdminTestList = (data) => ({
  type: SET_ADMIN_TEST_LIST,
  data
});

export const setAdminOptionValue = (value, index) => ({
  type: SET_ADMIN_OPTION_VALUE,
  value,
  index,
});

export const deleteAdminOption = (index) => ({
  type: DELETE_ADMIN_OPTION,
  index,
});


export const getTestStudent = (history, role) => {
  return (dispatch, getState) => {
    const {
      studentId,
      studentTestId,
    } = getState().test;
    const params = {
      role: "Candidate",
      userId: studentId,
    }
    dispatch(toggleTestLoader(true));
    const url = `/hackathon/test/${studentTestId}`;
    return Api.get(url).params(params).send((response, error) => {
      console.log(response);
      dispatch(toggleTestLoader(false));
      if(response && response !== '') {
        history.push('/test');
      }
    });
  };
};


export const removeQFromLocal = () => ({
  type: DELETE_ADMIN_QUES,
});

export const toggleDeleteQtLoader = (state) => ({
  type: TOGGLE_DEL_Q_LOADER,
  state,
});


export const deleteAdminQues = () => {
  return (dispatch, getState) => {
    const params = {
      role: "Admin",
    }
    const qId = getState().test.currentQ.id;
    if(qId !== -1){
      const url = `/hackathon/question/${qId}`
      dispatch(toggleDeleteQtLoader(true));
      return Api.delete(url).params(params).send((response, error) => {
        console.log(response);
        dispatch(toggleDeleteQtLoader(false));
        if(response && response !== '') {
          dispatch(removeQFromLocal());
        }
      });
    }else{
      dispatch(removeQFromLocal());
    }

  };
};

export const getAdminTestQ = (history, testId) => {
  return (dispatch) => {
    const params = {
      role: "Admin",
    }
    if (!testId) testId = 0;
    const url = `/hackathon/test/${testId}`
    dispatch(toggleTestLoader(true));
    return Api.get(url).params(params).send((response, error) => {
      console.log(response);
      dispatch(toggleTestLoader(false));
      if(response && response !== '') {
        dispatch(setCurrentAdminTest(response));
        history.push('/admin/dashboard/add-test');
      }
    });
  };
};

export const deleteTest = (testId) => {
  return (dispatch) => {
    const params = {
      role: "Admin",
    }
    if (testId < 0) return;
    const url = `/hackathon/test/${testId}`
    dispatch(toggleDeleteLoader(true));
    return Api.delete(url).params(params).send((response, error) => {
      dispatch(toggleDeleteLoader(false));
      dispatch(getTest('Admin'));
    });
  };
};

export const getTest = (role) => {
  return (dispatch) => {
    const params = {
      role: role,
    }
    dispatch(toggleAdminBoardLoader(true));
    return Api.get('/hackathon/test').params(params).send((response, error) => {
      console.log(response);
      dispatch(toggleAdminBoardLoader(false));
      if(response && response !== '') {
        dispatch(setAdminTestList(response))
      }
    });
  };
};


export const getTestQ = (history) => {
  return (dispatch, getState) => {
    const {
      studentId,
      studentTestId,
    } = getState().test;
    const params = {
      role: "Candidate",
      userId: studentId,
    }
    const answerArray = [];
    const url = `/hackathon/test/${studentTestId}`
    dispatch(toggleTestLoader(true));
    return Api.get(url).params(params).send((response, error) => {
      dispatch(toggleTestLoader(false));
      console.log(response, 'treeq');
      if(response && response !== '') {
        if(response.attempted) {
          dispatch(setResult(response))
          history.push('/result');
        } else {
          for(let i=0; i<response.questions.length; i++) {
            answerArray.push({
              questionId: response.questions[i].id,
              answer: '',
            });
            response.questions[i].answer = '';
          }
          dispatch(setTestDetails(response));
          dispatch(setTestQuestions(response.questions, answerArray));
          history.push('/test');
        }
      }
    });
  };
};

export const submitTestQ = (history) => {
  return (dispatch, getState) => {
    const {
      solutions,
      studentId,
      studentTestId,
    } = getState().test;
    const params = {
      "candidateId": parseInt(studentId),
      "testId": parseInt(studentTestId),
      "answers": solutions,
    }
    const url = `/hackathon/submit-test`
    dispatch(toggleTestLoader(true));
    return Api.post(url).params(params).send((response, error) => {
      dispatch(toggleTestLoader(false));
      if(response && response !== '') {
        dispatch(setResult(response))
        history.push('/result');
      }
    });
  };
};

export const addAdminTest = (params) => {
  return (dispatch, getState) => {
    const url = `/hackathon/test`
    dispatch(toggleTestLoader(true));
    return new Promise((resolve, reject) => {
      Api.post(url).params(params).send(async (response, error) => {
        dispatch(toggleTestLoader(false));
        resolve(response);
        if(response && response !== '') {
          dispatch(getTest('Admin'));
        } else reject('error')
      })
    })
  };
};

export const addAdminTestQues = (history) => {
  return (dispatch, getState) => {
    const url = `/hackathon/questions`
    const {
      editingTest,
      adminQ
    } = getState().test;
    const params = {
      testId: editingTest.id,
      questions: adminQ,
    }
    dispatch(toggleTestLoader(true));
    return new Promise((resolve, reject) => {
      Api.post(url).params(params).send(async (response, error) => {
        dispatch(toggleTestLoader(false));
        resolve(response);
        if(response && response !== '') {
          console.log(response);
          history.goBack();
          // dispatch(pushAdminTest(params))
        } else reject('error')
      })
    })
  };
};

export const deleteImages = (images, index = null) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
        resolve();
        const params = {deletedFiles: images}
        Api.delete('/hackathon/delete-image').params(params).send((response, error) => {
          if(response){}
        });
    });
  }
};
