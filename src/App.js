import { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Button";
import commafy from "./utils/commafy";

// let stack = [];
function App() {
  const [time, setTime] = useState(new Date());
  const [value, setValue] = useState("0");
  const [memory, setMemory] = useState("0");
  const [operator, setOperator] = useState(null);
  // const [display, setDisplay] = useState([]);
  const date = new Date().getMinutes();
  useEffect(() => {
    setTime(new Date());
  }, [date]);
  const handlePressButton = (e) => {
    const content = e.target.innerHTML;
    const num = parseFloat(value);
    let result = 0;
    switch (content) {
      case "AC":
        setValue("0");
        setMemory(0);
        setOperator(null);
        // setDisplay(null);
        // stack = [];
        break;
      case ".":
        !value.includes(".") && setValue(value + ".");
        break;
      case "±":
        setValue((num * -1).toString());
        setMemory(num * -1);
        // stack.splice(-1, 1, `(${parseFloat(stack[stack.length - 1] * -1)})`);
        // setDisplay([...stack]);
        break;
      case "%":
        result = num / 100;
        setValue("0");
        setMemory(result);
        setOperator(null);
        break;
      case "+":
        result = performOperation("+");
        setMemory(result);
        setValue("0");
        setOperator("+");
        // stack.push(content);
        // setDisplay([...stack]);
        break;
      case "÷":
        result = performOperation("÷");
        setMemory(result > 0 ? result : value);
        setValue("0");
        setOperator("÷");
        // stack.push(content);
        // setDisplay([...stack]);
        break;
      case "×":
        result = performOperation("×");
        setMemory(result > 0 ? result : value);
        setValue("0");
        setOperator("×");
        // stack.push(content);
        // setDisplay([...stack]);
        break;
      case "−":
        result = performOperation("−");
        setMemory(result > 0 ? result : value);
        setValue("0");
        setOperator("−");
        // stack.push(content);
        // setDisplay([...stack]);
        break;
      case "=":
        if (!operator) break;
        else {
          result = performOperation(operator);
        }
        result = performOperation(operator);
        setValue("0");
        setMemory(result);
        // setDisplay(result);
        // stack = [];
        setOperator(null);
        break;
      default:
        // stack.push(content);
        // setDisplay([...stack]);
        if (value[value.length - 1] === ".") setValue(value + content);
        else setValue(parseFloat(num + content).toString());
    }
  };
  function performOperation(op) {
    switch (op) {
      case "+":
        return (parseFloat(memory) + parseFloat(value)).toString();
      case "−":
        return (parseFloat(memory) - parseFloat(value)).toString();
      case "÷":
        return (parseFloat(memory) / parseFloat(value)).toString();
      case "×":
        return (parseFloat(memory) * parseFloat(value)).toString();
      default:
        return 0;
    }
  }
  return (
    <div className="container">
      <h2 className="header">calculator</h2>
      <div className="App">
        <div className="top">
          <div className="time">{`${time
            .getHours()
            .toString()
            .padStart(2, 0)}:${time.getMinutes().toString().padStart(2, 0)} ${
            time.getHours() >= 12 ? "pm" : "am"
          }`}</div>
        </div>
        <div className="memory">{commafy(memory)}</div>
        <div className="display">{commafy(value)}</div>
        <div className="buttons">
          <Button
            onButtonClick={() => handlePressButton}
            content="AC"
            type="function"
          />
          <Button
            onButtonClick={() => handlePressButton}
            content="±"
            type="function"
          />
          <Button
            onButtonClick={() => handlePressButton}
            content="%"
            type="function"
          />
          <Button
            onButtonClick={() => handlePressButton}
            content="÷"
            type="operator"
          />
          <Button onButtonClick={() => handlePressButton} content="7" />
          <Button onButtonClick={() => handlePressButton} content="8" />
          <Button onButtonClick={() => handlePressButton} content="9" />
          <Button
            onButtonClick={() => handlePressButton}
            content="×"
            type="operator"
          />
          <Button onButtonClick={() => handlePressButton} content="4" />
          <Button onButtonClick={() => handlePressButton} content="5" />
          <Button onButtonClick={() => handlePressButton} content="6" />
          <Button
            onButtonClick={() => handlePressButton}
            content="−"
            type="operator"
          />
          <Button onButtonClick={() => handlePressButton} content="1" />
          <Button onButtonClick={() => handlePressButton} content="2" />
          <Button onButtonClick={() => handlePressButton} content="3" />
          <Button
            onButtonClick={() => handlePressButton}
            content="+"
            type="operator"
          />
          <Button onButtonClick={() => handlePressButton} content="0" />
          <Button onButtonClick={() => handlePressButton} content="." />
          <Button
            onButtonClick={() => handlePressButton}
            content="="
            type="operator"
          />
        </div>
        <div className="bottom"></div>
      </div>
      <footer>rahmanlawal &copy; {time.getFullYear()}</footer>
    </div>
  );
}

export default App;
