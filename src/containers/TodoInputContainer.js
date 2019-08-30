import React, { Component } from 'react';
import TodoInput from '../components/TodoInput';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as inputActions from '../modules/input';
import * as todosActions from '../modules/todos';

class TodoInputContainer extends Component {
    id = 1
    getId = () => {
        return ++this.id;
    }

    handleChange = (e) => {
        const { value } = e.target;
        const { InputActions } = this.props;
        InputActions.setInput(value);
    }

    handleInsert = () => {
        const { InputActions, TodosActions, value } = this.props;
        const todo = {
            id: this.getId(),
            text: value,
            done: false
        };
        TodosActions.insert(todo);
        InputActions.setInput('');
    }

    render() {
        const { value } = this.props;
        const { handleChange, handleInsert } = this;
        return (
            <TodoInput
                onChange={handleChange}
                onInsert={handleInsert}
                value={value}
            />
        );
    }
}

/* mapStateToProps와 mapDispatchToProps 함수에 대한 레퍼런스를 
   따로 만들지 않고, 그 내부에 바로 정의했습니다.
*/

export default connect(
    (state) => ({
        value: state.input.get('value')
    }),
    (dispatch) => ({
        /*
          bindActionCreators를 사용하면, 자동으로 다음 작업들을 합니다.
          {
              actionCreator: (...params) => dispatch(actionCreator(...params))
          }
          그래서 일일이 dispatch할 필요가 없습니다.
          예를 들어, InputActions에는 
          InputActions: {
              setInput: (value) => dispatch(inputActions.setInput(value))
          }
          나중에 이를 호출할 때는 this.props.InputActions.setInput을 호출하면 됩니다.
        */
        InputActions: bindActionCreators(inputActions, dispatch),
        TodosActions: bindActionCreators(todosActions, dispatch)
    })
)(TodoInputContainer);