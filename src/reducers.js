


function demoApp(state = initialState, action) {
    switch (action.type) {
        case FIND_QUIZ:
            return Object.assign({}, state, {
                questions: action.question
            })    
        case ADD_QUESTION:    
            return Object.assign({}, state, {
                questions: [...state.questions, ...action.question]
            })
        }
    }
    
    return state
  }