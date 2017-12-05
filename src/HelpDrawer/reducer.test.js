import helpDrawerReducer from './reducer';
import {HIDE, SHOW} from './actions';

describe('HelpDrawer reducer tests ',()=>{
    it('it should update state when drawer is open', () => {
        const initialState = {
            open: false,
            title: '',
            text: '',
            buttonLabel: 'OK'
        };
        const newState = helpDrawerReducer(initialState, {type:SHOW, payload: initialState});
        expect(newState.open).toEqual(true);
    });

    it('it should update state when drawer is closed', () => {

        const initialState = {
            open: false,
            title: '',
            text: '',
            buttonLabel: 'OK'
        };

        const newState = helpDrawerReducer(initialState, {type:HIDE, payload: initialState})
        expect(newState.open).toEqual(false);
    });

});