import { ACTIONS } from "./App";
export default function OperatorButton({symbol,dispatch})
{
    return(
        <button onClick={()=>dispatch({type:ACTIONS.OPERATE, payload:{symbol}})}>{symbol}</button>
    )
}