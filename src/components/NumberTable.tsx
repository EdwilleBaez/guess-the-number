import React, { useState, useEffect } from "react";

type NumberTableProps = {
  arrayToMap: number[][];
};

// function getRandomInt(min: number, max: number) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

// const randomNumber: number[] = Array.from(
//   String(getRandomInt(1000, 9999)),
//   Number
// );

function getRandomNums(): number[] {
  const numArr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  numArr.sort(() => Math.random() - 0.5);
  return numArr.slice(0, 4);
}

const randomNumber = getRandomNums()
console.log("soy random number", randomNumber);

const NumberTable: React.FC<NumberTableProps> = ({ arrayToMap }) => {
  const [correctPositions, setCorrectPositions] = useState<number[]>([]);
  const [correctNumbers, setCorrectNumbers] = useState<number[]>([]);

  console.log("soy correct numbers", correctNumbers);

  useEffect(() => {

    // const calculateCorrectPositions = () => {
    //   const positions = arrayToMap.map((attempt) => {
    //     if (attempt.length > 0) {
    //       return attempt.filter((num, index) => num === randomNumber[index])
    //         .length;
    //     } else {
    //       console.log("Debes ingresar los valores");
    //       return 0; // Return a default value when attempt is empty
    //     }
    //   });
    //   setCorrectPositions(positions);
    // };

    const calculateCorrectPositions = () => {
      const numbers = arrayToMap.map((attempt) => {
        const correctNumberCount = attempt.filter(
          (num, index) => num === randomNumber[index]
        ).length;
        return correctNumberCount;
      });

      setCorrectPositions(numbers);
    };

    const calculateCorrectNumbers = () => {
    
          const numbers = arrayToMap.map((attempt) => {
            const matchingNumbers = attempt
              .filter(num => randomNumber.includes(num)).length;
              console.log("soy sorted attemps:",[...attempt])
                console.log("soy sorted random numbers:", randomNumber)
                console.log("matchingNumbers", attempt)
                return matchingNumbers;
          });
    
          setCorrectNumbers(numbers);
        };
    
        calculateCorrectPositions();
        calculateCorrectNumbers();
        
      }, [arrayToMap]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="h-[451px] mb-4">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Attempt</th>
              <th className="px-4 py-2">Result</th>
            </tr>
          </thead>
          <tbody>
            {arrayToMap.map((number, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">
                  <div className="flex justify-center">{index + 1}</div>
                </td>
                <td className="border px-4 py-2">
                  <div className="flex text-rose-800 justify-center tracking-wider">
                    {number}
                  </div>
                </td>
                <td className="border px-4 py-2">
                  <div className="flex justify-center">{`${correctPositions[index]} - ${correctNumbers[index]}`}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NumberTable;
