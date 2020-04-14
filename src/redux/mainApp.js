
const CLEAR = 'clear';
const DELETE_SYMBOL = 'deleteSymbol';
const PROC = 'proc';
const SIGN = 'sign';
const NUMBER = 'number';
const EQUALS = 'equals';

let initialState = {
  calcValue: '',
  isProcInvalue: false,
  resultValues: []
}

export const mainReducer = (state = initialState, action) => {
 switch(action.type) {
 	case CLEAR: {
	  return {
      ...state,
      calcValue: '',
      isProcInvalue: false
	  };
   }
   case DELETE_SYMBOL: {
	  return {
      ...state,
      calcValue: state.calcValue.slice(0, -1).trim(),
      isProcInvalue: false
	  };
   }
   case PROC: {
    let checkEndValue = Number(+state.calcValue.slice(-1));
    if (state.calcValue.slice(-1) === '0') checkEndValue = true;

    if (checkEndValue && (state.calcValue.length > 0)) {
      return {
        ...state,
        calcValue: state.calcValue + '%',
        isProcInvalue: true
      }
    }	else {
      alert('You entered an incorrect expression!');
      return state;
    }  
   }
   case SIGN: {
    let checkEndValue = Number(+state.calcValue.slice(-1));
    if (state.calcValue.slice(-1) === '0') checkEndValue = true;

    if ((checkEndValue && (state.calcValue.length > 0)) || state.isProcInvalue) {
      return {
        ...state,
        calcValue: `${state.calcValue + action.value}`,
        isProcInvalue: false
      }
    }	else {
      alert('You entered an incorrect expression!');
      return state;
    } 
   }
   case NUMBER: {
    if (!state.isProcInvalue) {
      return {
        ...state,
        calcValue: state.calcValue + action.value
      };
    }	else {
      alert('You entered an incorrect expression!');
      return state;
    }	  
   }
   case EQUALS: {
    let copyValue = state.calcValue.replace(/%/g, ' / 100');
    let checkEndValue = Number(+state.calcValue.slice(-1));
    if (state.calcValue.slice(-1) === '0') checkEndValue = true;

    if (checkEndValue || state.isProcInvalue) { 
      // eslint-disable-next-line
      let endValue = eval(copyValue);

      let resultValue = {
        id: Date.now(),
        date: new Date(2014, 11, 31, 12, 30, 0).toLocaleString(),
        value: `${state.calcValue} = ${endValue || ''}`
      }

      return {
        ...state,
        calcValue: '',
        isProcInvalue: false,
        resultValues: [resultValue]
      };
    }	else {
      alert('You entered an incorrect expression!');
      return state;
    }    
   }
	 default: 
	  return state;
 }
}


export const calculateValue = (type, value) => ({
 type, value
});





