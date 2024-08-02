"use client";

import React from "react";

import Crossword from "@jaredreisinger/react-crossword";
import { Heading } from "./ui/heading";

const data = {
  across: {
    1: {
      clue: "the best egg ",
      answer: "RICHARLYSON",
      row: 0,
      col: 0,
    },

    2: {
      clue: "the sister of the employee of the month",
      answer: "BAGI",
      row: 4,
      col: 2,
    },
    3: {
      clue: "name of the island",
      answer: "QUESADILHA",
      row: 9,
      col: 9,
    },
  },
  down: {
    1: {
      clue: "employee of the month",
      answer: "CELLBIT",
      row: 0,
      col: 2,
    },
    2: {
      clue: "husband of the employee of the month",
      answer: "ROIER",
      col: 0,
      row: 0,
    },
  },
};

export function PuzzleSection() {
  function onCrosswordComplete() {
    console.log("complete");
  }

  return (
    <section
      className="px-8 py-14 sm:py-16 bg-yellow-pattern scroll-py-36"
      id="puzzle"
    >
      <div className="max-w-5.5xl mx-auto flex flex-col items-center">
        <div className="flex flex-col gap-4 items-center mb-10">
          <Heading className="text-center">Time to play</Heading>

          <p>
            Nunc egestas urna ac orci vel sed erat. Sodales vel netus facilisi
            donec donec quis. Risus <br />
            adipiscing mauris cum non est enim a. Quis commodo sit sed lectus ac
            est.
          </p>
        </div>

        <div className="flex flex-col md:flex-row w-full">
          <Crossword
            onCrosswordComplete={onCrosswordComplete}
            data={data}
            theme={{
              gridBackground: "transparent",
              allowNonSquare: true,
            }}
          />
        </div>
      </div>
    </section>
  );
}
