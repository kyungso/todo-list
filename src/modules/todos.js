import { Map, List } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

const INSERT = 'todos/INSERT';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';

export const insert = createAction(INSERT);
export const toggle = createAction(TOGGLE);
export const remove = createAction(REMOVE);

const initialState = List([
    Map({
        id: 0,
        text: '리액트 공부하기',
        done: true
    }),
    Map({
        id: 1,
        text: '컴포넌트 스타일링 해보기',
        done: false
    })
]);

export default handleActions({
    [INSERT]: (state, action) => {
        /*
        payload 안에 있는 id, text, done의 레퍼런스를 만들어 줍니다.
        레퍼런스를 만들지 않고, 바로 push(Map(action.payload))를 해도 되지만,
        나중에 이 코드를 보았을 때,
        이 액션이 어떤 데이터를 처리하는지 쉽게 볼 수 있도록 하는 작업입니다.
        */
        const { id, text, done } = action.payload;

        return state.push(Map({
            id,
            text,
            done
        }));
    },
    [TOGGLE]: (state, action) => {
        const { payload: index } = action; 
        // = const index = action.payload;

        //updateIn으로 현재 값을 참조하여 반대 값으로 설정합니다.
        return state.updateIn([index, 'done'], done => !done);
        /*
         = return state.setIn([index, 'done'], !state.getIn([0, index]));
        */
    },
    [REMOVE]: (state, action) => {
        const { payload: index } = action;
        return state.delete(index);
    }
}, initialState)