import React from "react";

// Definición de tipo para los botones
type NumberButtonsProps = {
  numbers: number[];
  chooseNumber: number[];
  onNumberClick: (number: number) => void;
  deleteNumber: (arr: number[]) => void;
  tryAttempt: (arr: number[]) => void;
};

const NumberButtons: React.FC<NumberButtonsProps> = ({
  numbers,
  chooseNumber,
  onNumberClick,
  deleteNumber,
  tryAttempt,
}) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex h-7">
        <div className="text-xl self-center w-12 tracking-wider">
          {chooseNumber}
        </div>
        <button
          className="material-symbols-outlined text-xl hover:text-rose-800 h-7"
          onClick={() => deleteNumber(chooseNumber)}
        >
          backspace
        </button>
      </div>
      <div>
        <button
          className="bg-gray-400 w-20 h-8 rounded-md text-xl mt-3 hover:bg-black hover:text-white"
          title="Complete 4 numbers"
          onClick={() => tryAttempt(chooseNumber)}
        >
          Try
        </button>
      </div>
      <div className="text-md mt-2">
        {numbers.map((number, index) => (
          <button
            key={index}
            className="hover:bg-red-400 rounded-md w-5 mx-1"
            onClick={() => onNumberClick(number)}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NumberButtons;
