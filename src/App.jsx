import React, {useState, useEffect} from 'react';
import './App.css';
import {calculateValue} from './redux/mainApp';
import {connect} from 'react-redux';


const AppContainer = ({calcValue, calculateValue, resultValues}) => {
  const [value, setValue] = useState(calcValue);
  const [resultValuesState, setResultValuesState] = useState(resultValues);

  useEffect(() => {
    setValue(calcValue)
  }, [calcValue]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('resultValuesState') || '[]')
    setResultValuesState(saved)
  }, []);

  useEffect(() => {
    setResultValuesState((prev => [...resultValues, ...prev]))
  }, [resultValues]);

  useEffect(() => {
    localStorage.setItem('resultValuesState', JSON.stringify(resultValuesState))
  }, [resultValuesState]);



  // const [todos, setTodos] = useState<ITodo[]>([])
  
  // useEffect(() => { // забираем элементы
  //  const saved = JSON.parse(localStorage.getItem('todos') || '[]') as ITodo[]
  //  setTodos(saved)
  // }, [])

  // useEffect(() => {
  //   localStorage.setItem('todos', JSON.stringify(todos))
  // }, [todos])


  return (
    <div className="App">
      <div className="calcWrap">

        <div className="calc grey darken-1">
          <input readOnly type="text" className="grid-item value" value={value ? value : 0}/>
          <div onClick={() => calculateValue('clear')} className="grid-item clear">AC</div>
          <div onClick={() => calculateValue('deleteSymbol')} className="grid-item deleteSymbol">&#8617;</div>
          <div onClick={() => calculateValue('proc')} className="grid-item proc">%</div>
          <div onClick={() => calculateValue('sign', " / ")} className="grid-item grid-computation share">&divide;</div>
          <div onClick={() => calculateValue('number', '7')} className="grid-item seven">7</div>
          <div onClick={() => calculateValue('number', '8')} className="grid-item eight">8</div>
          <div onClick={() => calculateValue('number', '9')} className="grid-item nine">9</div>
          <div onClick={() => calculateValue('sign', ' * ')} className="grid-item grid-computation multiply">&times;</div>
          <div onClick={() => calculateValue('number', '4')} className="grid-item four">4</div>
          <div onClick={() => calculateValue('number', '5')} className="grid-item five">5</div>
          <div onClick={() => calculateValue('number', '6')} className="grid-item six">6</div>
          <div onClick={() => calculateValue('sign', ' - ')} className="grid-item grid-computation subtract">&ndash;</div>
          <div onClick={() => calculateValue('number', '1')} className="grid-item one">1</div>
          <div onClick={() => calculateValue('number', '2')} className="grid-item two">2</div>
          <div onClick={() => calculateValue('number', '3')} className="grid-item three">3</div>
          <div onClick={() => calculateValue('sign', ' + ')} className="grid-item grid-computation plus">+</div>
          <div onClick={() => calculateValue('number', '0')} className="grid-item ziro">0</div>
          <div onClick={() => calculateValue('sign', '.')} className="grid-item comma">.</div>
          <div onClick={() => calculateValue('equals')} className="grid-item grid-computation equals">=</div>
        </div>

        <div className="info">
          {/* <div className="info"> */}
            <div className="infoTitle">Operations history:</div> 

            {resultValuesState.map(item => (
              <div className="infoBlock" key={item.id}>
                <span className="infoData">
                  {item.date}
                </span>
                <span className="infoValue">
                  {item.value}
                </span>
              </div>
            ))}

          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    calcValue: state.mainApp.calcValue,
    resultValues: state.mainApp.resultValues
  }
}
let mapDispatchToProps = {
  calculateValue
}


const App = connect(mapStateToProps, mapDispatchToProps)(AppContainer)

export default App;
