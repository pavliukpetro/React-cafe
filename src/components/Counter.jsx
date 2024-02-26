import { useDispatch, useSelector } from "react-redux";
import { counterActions } from "../store";

export default function Counter() {
    const counter = useSelector(state => state.counter.counter);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    function handleIncrement() {
        dispatch(counterActions.increment());
    }

    function handleDecrement() {
        dispatch(counterActions.decrement());
    }

    function handleIncrease() {
        // dispatch({ type: 'increase', amount: 5 });
        dispatch(counterActions.increase(5));
    }

    return (
        <div>
            <h1>User name = {user.userName}</h1>
            <h2>Counter {counter}</h2>
            <button onClick={handleIncrement}>+1</button>
            <button onClick={handleDecrement}>-1</button>
            <button onClick={handleIncrease}>+5</button>
        </div>
    )
}
