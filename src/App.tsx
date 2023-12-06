import React from "react";
import { useState, useEffect } from "react";
import NumberTable from "./components/NumberTable";
import NumberButtons from "./components/NumberButtons";

const App: React.FC = () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [chooseNumber, setChooseNumber] = useState<number[]>([]);
  const [arrayToMap, setarrayToMap] = useState<number[][]>([]);

  useEffect(() => {
    if (selectedNumbers.length === 4) {
      // Agregar selectedNumbers a arrayToMap
      setarrayToMap((prevarrayToMap) => {
        if (prevarrayToMap.length <= 9) {
          return [...prevarrayToMap, selectedNumbers];
        } else {
          return prevarrayToMap;
        }
      });
      setSelectedNumbers([]);
    }
  }, [selectedNumbers]);

  const handleNumberClick = (number: number) => {
    setChooseNumber((prevNumbers) => {
      if (prevNumbers.length < 4) {
        return [...prevNumbers, number];
      }
      return prevNumbers;
    });
  };

  const handleDeleteNumber = (arr: number[]) => {
    setChooseNumber(arr.slice(0, -1));
  };

  const handleTryAttempt = (arr: number[]) => {
    if (arr.length === 4) {
      setSelectedNumbers(arr);
      setChooseNumber([]);
    }
  };

  return (
    <div className="w-screen mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-2 flex justify-center items-center">
        Guess the number
      </h1>
      <NumberTable arrayToMap={arrayToMap} />
      <NumberButtons
        numbers={numbers}
        chooseNumber={chooseNumber}
        onNumberClick={handleNumberClick}
        deleteNumber={handleDeleteNumber}
        tryAttempt={handleTryAttempt}
      />
    </div>
  );
};

export default App;
