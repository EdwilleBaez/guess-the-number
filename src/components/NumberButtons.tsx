import React from "react";

// Definición de tipo para los botones
type NumberButtonsProps = {
  numbers: number[];
  chooseNumber: number[];
  activeButtons: boolean;
  language: boolean;
  onNumberClick: (number: number) => void;
  deleteNumber: (arr: number[]) => void;
  tryAttempt: (arr: number[]) => void;
};

const NumberButtons: React.FC<NumberButtonsProps> = ({
  numbers,
  chooseNumber,
  activeButtons,
  language,
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
          {language ? "Try" : "Revisar"}
        </button>
      </div>
      <div className="text-md mt-2">
        {numbers.map((number, index) => (
          <button
            key={index}
            className={`rounded-md w-5 mx-1 ${activeButtons ? "text-gray-400" : "hover:bg-red-400" }`}
            onClick={() => onNumberClick(number)}
            disabled={activeButtons}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NumberButtons;
