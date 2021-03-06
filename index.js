(() => {
  const intervalGetProperties = 100;

  const init = async () => {
    const values = { valueOne: "", valueTwo: "", operation: "" };

    const display = await getDisplay();
    const numbers = await getValuesNumbers();
    const operations = await getValuesOperations();

    setNumbers(numbers, values, display);
    setOperation(operations, values);
  };

  const getDisplay = () => {
    return new Promise((resolve) => {
      let getDisplay = setInterval(() => {
        let display = document.querySelector(".calculator__display");
        if (display) {
          resolve(display);
          clearInterval(getDisplay);
        }
      }, intervalGetProperties);
    });
  };

  const getValuesNumbers = () => {
    return new Promise((resolve) => {
      let getNumbers = setInterval(() => {
        const numbers = document.querySelectorAll(".calculator__numbers");
        if (numbers) {
          resolve(numbers);
          clearInterval(getNumbers);
        }
      }, intervalGetProperties);
    });
  };

  const getValuesOperations = () => {
    return new Promise((resolve) => {
      let getOperations = setInterval(() => {
        const operations = document.querySelectorAll(".calculator__operations");
        if (operations) {
          resolve(operations);
          clearInterval(getOperations);
        }
      }, intervalGetProperties);
    });
  };

  const setNumbers = (numbers, values) => {
    numbers.forEach((element) => {
      element.addEventListener("click", () => {
        if (
          values.valueOne.length < 9 &&
          values.operation == "" &&
          element.value !== "="
        ) {
          values.valueOne += parseInt(element.value);
          display.children[0].innerText = values.valueOne;
        }

        setCurrentValue(values);

        if (values.operation == "") return;

        if (values.valueTwo.length < 9 && element.value !== "=") {
          values.valueTwo += element.value;
          display.children[0].innerText =
            values.valueOne + values.operation + values.valueTwo;
        }

        setCurrentValue(values);

        if (element.value === "=") {
          display.children[1].innerText = "";
          display.children[0].innerText = calculate(values);
          values.valueOne = calculate(values);
          values.valueTwo = "";
        }
      });
    });
  };

  const setOperation = (operation, values) => {
    operation.forEach((op) => {
      op.addEventListener("click", () => {
        if (values.valueOne == "" || op.value == "ON" || op.value == "=") return;
        if (op.value == 'AC'){
          return clear(values);
        } 

        values.operation = op.value;
        display.children[0].innerText = values.valueOne + values.operation + values.valueTwo;
        return setCurrentValue(values);
      });
    });
  };

  const calculate = (values) => {
    if (values.valueTwo == "") return values.valueOne;
    switch (values.operation) {
      case "+":
        return parseInt(values.valueOne) + parseInt(values.valueTwo);
      case "-":
        return parseInt(values.valueOne) - parseInt(values.valueTwo);
      case "/":
        return parseInt(values.valueOne) / parseInt(values.valueTwo);
      case "x":
        return parseInt(values.valueOne) * parseInt(values.valueTwo);
    }
  };

  const setCurrentValue = (values) => {
    display.children[1].innerText = `= ${values.valueOne}`;
    if (values.valueTwo !== "")
      return (display.children[1].innerText = `= ${calculate(values)}`);
  };

  const clear = (values) => {
    display.children[1].innerText = '';
    display.children[0].innerText = '0';
    values.valueOne = '';
    values.valueTwo = '';
    values.operation = '';
  }

  init();
})();
