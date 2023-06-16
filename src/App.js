import logo from './logo.svg';
import './App.css';
import './style.css';
import {useReducer} from 'react'
 import DigitalButton from './DigitButton';
 import OperatorButton from './OperatorButton';
export const ACTIONS={
  ADD_DIGIT:'add-digit',
  DEL_DIGIT:'delete-digit',
  CLEAR:'clear',
  EQUATE:'equate',
  OPERATE:'operate'
}
function reducer(state,{type,payload})
{
  switch(type)
  {
    case ACTIONS.ADD_DIGIT:
      return{
        ...state,
        currentOperand:`${state.currentOperand||""}${payload.digit}`
      }
    case ACTIONS.CLEAR:
      return{
        
      }
    case ACTIONS.DEL_DIGIT:
      if(state.currentOperand==null)
      return{
        ...state
      }
      return{
        ...state,
        currentOperand:state.currentOperand.slice(0,-1)
      }
    case ACTIONS.OPERATE:
      if(state.previousOperand==null && state.currentOperand==null) return{state}
      if(state.previousOperand==null)
      {
        return{
          ...state,
          currentOperand:null,
          previousOperand:state.currentOperand,
          operation:payload.symbol
        }
      }
      if(state.currentOperand==null)
      return{
      ...state,
      operation:payload.symbol
      
    }
      
      return{
        ...state,
        previousOperand:equate(state.currentOperand,state.previousOperand,state.operation),
        currentOperand:null,
        operation: payload.symbol   
      }
    case ACTIONS.EQUATE:
      return{
        ...state,
        currentOperand:equate(state.currentOperand,state.previousOperand,state.operation),
        previousOperand:null,
        operation:null,

      }

  }

}
function equate(current,previous,operation)
{
  const cur=parseFloat(current)
  const prev=parseFloat(previous)
  if(isNaN(prev)||isNaN(cur)) return""
  let solution=''
  switch(operation)
  {
    case '+':
      solution=cur + prev
      break;
    case '-':
      solution=prev-cur
      break;
    case '*':
      solution=cur * prev
      break;
    case '÷':
      solution=prev/cur
      break;

  }
  console.log(solution)
  return solution.toString()
}
const Formatter=new Intl.NumberFormat(
 
)
function addComas(operand)
{
  if(operand==null)return''
  const [integer,decimal]= operand.split('.')
  if(decimal==null) return Formatter.format(integer)
  return `${Formatter.format(integer)}.${decimal}`

}
function App() {
  const [{currentOperand,previousOperand,operation},dispatch]=useReducer(reducer,{})
  return (
    <div className='calculator-grid'>
      <div className='output'>
        <div className='previous-output'>{previousOperand}{operation}</div>
        <div className='current-output'>{addComas(currentOperand)}</div>

      </div>
      
        <button class='span-two' onClick={()=>dispatch({type:ACTIONS.CLEAR})}>AC</button>
        <button onClick={()=>{dispatch({type:ACTIONS.DEL_DIGIT})}}>DEL</button>
        <OperatorButton symbol='÷' dispatch={dispatch}/>
        <DigitalButton digit='1' dispatch={dispatch}/>
        <DigitalButton digit='2' dispatch={dispatch}/>
        <DigitalButton digit='3' dispatch={dispatch}/>
        <OperatorButton symbol='+' dispatch={dispatch}/>
        <DigitalButton digit='4' dispatch={dispatch}/>
        <DigitalButton digit='5' dispatch={dispatch}/>
        <DigitalButton digit='6' dispatch={dispatch}/>
        <OperatorButton symbol='-' dispatch={dispatch}/>
        <DigitalButton digit='7' dispatch={dispatch}/>
        <DigitalButton digit='8' dispatch={dispatch}/>
        <DigitalButton digit='9' dispatch={dispatch}/>
        <OperatorButton symbol='*' dispatch={dispatch}/>
        <DigitalButton digit='.' dispatch={dispatch}/>
        <DigitalButton digit='0' dispatch={dispatch}/>
        <button onClick={()=>dispatch({type:ACTIONS.EQUATE})} className='span-two'>=</button>


      

    </div>
    
    
  )
}

export default App;
