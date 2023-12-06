import React from "react";
import { useState, useEffect } from "react";
import NumberTable from "./components/NumberTable";
import NumberButtons from "./components/NumberButtons";

const App: React.FC = () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const [activeButtons, setActiveButtons] = useState<boolean>(true); // estado para desabilitar botones
  const [randomNumber, setRandomNumber] = useState<number[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]); //los numeros que son renderizados en arrayToMap
  const [chooseNumber, setChooseNumber] = useState<number[]>([]); //los numeros que el usuario elige antes de revisarlos
  const [arrayToMap, setArrayToMap] = useState<number[][]>([]); //arreglo con los numeros seleccionados
  const [message, setMessage] = useState<number>(0);
  const [language, setLanguage] = useState<boolean>(true);

  function getRandomNums(): number[] {
    const numArr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    numArr.sort(() => Math.random() - 0.5);
    return numArr.slice(0, 4);
  }

  console.log("soy random", randomNumber)

  useEffect(() => {
    if (selectedNumbers.length === 4) {
      // Agregar selectedNumbers a arrayToMap
      setArrayToMap((prevArrayToMap) => {
        loseWin();

        if (prevArrayToMap.length <= 9) {
          return [...prevArrayToMap, selectedNumbers];
        } else {
          return prevArrayToMap;
        }
      });
    }
  }, [selectedNumbers]);

  //entrada del jugador sin revisar
  const handleNumberClick = (number: number) => {
    if (arrayToMap.length < 10) {
      setChooseNumber((prevNumbers) => {
        if (prevNumbers.length < 4 && !prevNumbers.includes(number)) {
          return [...prevNumbers, number];
        }
        return prevNumbers;
      });
    }
  if (arrayToMap.length < 10) {
    setMessage(0)
  }
  };

  const handleDeleteNumber = (arr: number[]) => {
    setChooseNumber(arr.slice(0, -1));
    if(message === 4){
      setMessage(0)
    }
  };

  // envia los numeros para ser revisados
  const handleTryAttempt = (arr: number[]) => {
    if (arr.length === 4) {
      setSelectedNumbers(arr);
      setChooseNumber([]);
    } else if (activeButtons == false && arrayToMap.length < 10) {
      setMessage(4)
    }
  };

  const start = () => {
    setRandomNumber(getRandomNums());
    setActiveButtons(false);
    setArrayToMap([]);
    setMessage(0);
  };

  const loseWin = () => {
    if (JSON.stringify(selectedNumbers) === JSON.stringify(randomNumber)) {
      setMessage(1);
      setActiveButtons(true);
    }
    if (arrayToMap.length === 9) {
      setMessage(2);
    }
  };

  const changeLanguage = () => {
    setLanguage(!language);
  };

  return (
    <div className="w-screen flex gap-20 mx-auto mt-4">
      <div className="ml-12 w-2/6">
        <button onClick={() => changeLanguage()}>
          {language
            ? "Change language to spanish"
            : "Cambiar lenguaje a inglés"}
        </button>
        <h2 className=""> {language ? "How to play" : "Cómo jugar"}</h2>
        <p>
  {language
    ? (
      <>
        Guess the Number is a game in which you have to use your logic to
        Guess a secret 4-digit number that the computer chooses at the beginning of the game.
        The secret number is made up of digits from 0 to 9 without repetition. In each attempt you will get first
        a computer result with the <span className="text-green-500">number of corrects digits</span> regardless of the order followed by the
       <span className="text-green-800"> number of correct digits in the correct position</span>. Using this information guess the number
        secret in maximum 10 attempts. Good luck!
      </>
    )
    : (
      <>
        Adivina el Número es un juego en el que tienes que utilizar tu lógica para 
        adivinar un número secreto de 4 dígitos que el ordenador escoge al principio del partido. 
        El número secreto está formado por dígitos del 0 al 9 sin repetición. En cada intento obtendrás primero 
        un resultado del ordenador con la <span className="text-green-500">cantidad de dígitos correctos</span> sin importar el orden seguido de la 
        <span className="text-green-800"> cantidad de dígitos correctos en la posición correcta</span>. Usando esta información adivina el número 
        secreto en máximo 10 intentos. ¡Buena suerte!
      </>
    )
  }
</p>

      </div>
      <div>
        <h1 className="text-2xl font-bold mb-2 flex justify-center items-center">
          {language ? "Guess the number" : "Adivina el número"}
        </h1>
        <NumberTable
          arrayToMap={arrayToMap}
          randomNumber={randomNumber}
          language={language}
        />
        <NumberButtons
          numbers={numbers}
          chooseNumber={chooseNumber}
          activeButtons={activeButtons}
          language={language}
          onNumberClick={handleNumberClick}
          deleteNumber={handleDeleteNumber}
          tryAttempt={handleTryAttempt}
        />
      </div>
      <div>
        <button onClick={() => start()}>
          {language
            ? activeButtons
              ? "Start"
              : "Restart"
            : activeButtons
            ? "Iniciar"
            : "Reiniciar"}
        </button>
        <p className={`text-green-500 text-[100px] absolute right-[20px] top-[150px] bg-white/70 rounded-md ${message === 1 ? "block" : "hidden"}`}>
          {language ? "You win!" : "¡Ganaste!"}
        </p>
        <p className={`text-green-500 text-[30px] absolute z-10 right-[35px] top-[300px] bg-white/70 rounded-md  ${message === 1 ? "block" : "hidden"}`}>
          {language ? "Congrats, you are awesome! :)" : "¡Felicidades, eres increíble! :)"}
        </p>
        <p className={`text-red-600 text-[100px] absolute right-[20px] top-[150px] bg-white/70 rounded-md ${message === 2 ? "block" : "hidden"}`}>
          {language ? "You Lose!" : "¡Perdiste!"}
        </p>
        <p className={`text-red-600 text-[30px] absolute z-10 right-[35px] top-[300px] bg-white/70 rounded-md  ${message === 2 ? "block" : "hidden"}`}>
          {language ? "Better luck next time :'(" : "Mejor suerte la próxima :'("}
        </p>
        <p className={`text-red-400 ${message === 4 ? "block" : "hidden"}`}>
          {language ? "Complete 4 numbers" : "Completa 4 dígitos"}
        </p>
      </div>
    </div>
  );
};

export default App;
