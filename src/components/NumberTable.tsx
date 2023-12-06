import React, { useState, useEffect } from "react";

type NumberTableProps = {
  arrayToMap: number[][];
  randomNumber: number[];
  language: boolean;
};

const NumberTable: React.FC <NumberTableProps> = ({ arrayToMap, randomNumber, language }) => {
  const [correctPositions, setCorrectPositions] = useState<number[]>([]);
  const [correctNumbers, setCorrectNumbers] = useState<number[]>([]);


  useEffect(() => {

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
              <th className="px-4 py-2">{language? "Attempt" : "Intento"}</th>
              <th className="px-4 py-2">{language? "Result" : "Resultado"}</th>
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
                  <p className="flex justify-center tracking-wider"><span className="text-green-500">{correctNumbers[index]}</span>-<span className="text-green-800">{correctPositions[index]}</span></p>
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
