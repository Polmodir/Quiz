import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function quiz() {
  // Fetching data
  const [data, setData] = useState();
  const [results, setResults] = useState({});
  async function getData() {
    try {
      const res = await axios.get("http://localhost:2007/");
      // console.log("");
      console.log("dsadjoias", res.data);
      setData(res.data);
      setResults(
        res.data.quiz.reduce((prev, _, index) => {
          return { ...prev, [index + 1]: false };
        }, {})
      );
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  const [questionNumber, setQuestionNumber] = useState(1);

  // Getting Id
  const params = useSearchParams();
  const id = params.get("Id");

  // Changing the page
  const router = useRouter();
  const goHome = () => {
    router.push(`/`);
  };
  // Resetter
  const retaker = () => {
    setQuestionNumber(1);
    Object.keys(results).map((answer) => {
      setResults({ ...results, [answer]: false });
    });
  };
  // Main Page
  if (data == null) {
    return <div>loading...</div>;
  }
  return (
    <div className="flex flex-col">
      <button
        onClick={() => {
          goHome();
        }}
        className="w-[100px] bg-gray-100 hover:bg-gray-200"
      >
        Give up
      </button>
      {data.quiz[id - 1]?.name}
      {questionNumber < Object.keys(results).length + 1 ? (
        <div>
          <p>{data.quiz[id - 1]?.questions[questionNumber - 1].question}</p>
          <div className="flex gap-2">
            {data.quiz[id - 1]?.questions[questionNumber - 1].answers.map(
              (question, idx) => {
                return (
                  <button
                    onClick={() => {
                      if (
                        idx + 1 ==
                        data.quiz[id - 1]?.questions[questionNumber - 1].correct
                      ) {
                        setResults((prev) => ({
                          ...prev,
                          [questionNumber]: true,
                        }));
                        console.log("dhsoiajdiosa", questionNumber);
                        setQuestionNumber(questionNumber + 1);
                      } else {
                        setQuestionNumber(questionNumber + 1);
                      }
                      console.log(results);
                    }}
                    className="border-2 hover:bg-gray-200"
                  >
                    {question}
                  </button>
                );
              }
            )}
          </div>
        </div>
      ) : (
        <div>
          your results:
          {Object.keys(results).map((x, idx) => {
            return (
              <p>
                question {idx + 1}:{" "}
                {results[x]
                  ? "Correct"
                  : `Incorrect :/ Akshually answer: ${
                      data.quiz[id - 1]?.questions[idx].answers[
                        data.quiz[id - 1]?.questions[idx].correct - 1
                      ]
                    }`}
              </p>
            );
          })}
          <button
            onClick={() => {
              retaker();
            }}
            className="bg-gray-200 hover:bg-gray-300"
          >
            Retake the quiz
          </button>
        </div>
      )}
      {/* <p>{data.quiz[id - 1]?.questions[questionNumber - 1].question}</p>
        <div className="flex gap-2">{}</div> */}
    </div>
  );
  // }
}
