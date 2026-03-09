"use client";

import { useState, useCallback, useEffect } from "react";
import { useBKT } from "@/lib/bkt/hooks";
import { pickNextKC, shouldShowIntro, TUTOR_STRATEGIES } from "@/lib/tutor/selection";
import { generateMiniBoardByStrategy } from "@/lib/sudoku";
import type { Strategy } from "@/lib/sudoku/types";
import { IntroSlide } from "./IntroSlide";
import { SolveCellQuestion } from "./SolveCellQuestion";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";

type QuestionType = "solve" | "multiple_choice";

export function TutorMode() {
  const { probabilities, loading, getMastery, recordObservation, refetch } = useBKT();
  const [introStep, setIntroStep] = useState(0);
  const [showIntro, setShowIntro] = useState<boolean | null>(null);
  const [currentKC, setCurrentKC] = useState<Strategy | null>(null);
  const [questionType, setQuestionType] = useState<QuestionType>("solve");
  const [miniBoard, setMiniBoard] = useState<{
    initial: number[][];
    answerRow: number;
    answerCol: number;
    correctValue: number;
    strategy: "naked_single" | "hidden_single";
  } | null>(null);
  const [advanceKey, setAdvanceKey] = useState(0);

  const loadNextQuestion = useCallback(() => {
    const kc = pickNextKC(probabilities ?? []);
    setCurrentKC(kc);
    const mastery = getMastery(kc);
    const level = Math.max(1, Math.min(10, 1 + Math.floor(mastery * 9)));
    const result = generateMiniBoardByStrategy(kc, level as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10);
    const strategy = kc as "naked_single" | "hidden_single";
    setMiniBoard({
      initial: result.initial.map((r) => [...r]),
      answerRow: result.answer.row,
      answerCol: result.answer.col,
      correctValue: result.answer.value,
      strategy,
    });
    setQuestionType(Math.random() < 0.5 ? "solve" : "multiple_choice");
    setAdvanceKey((k) => k + 1);
  }, [probabilities, getMastery]);

  useEffect(() => {
    if (loading || probabilities === null) return;
    setShowIntro(shouldShowIntro(probabilities, getMastery));
  }, [loading, probabilities, getMastery]);

  useEffect(() => {
    if (showIntro === false && probabilities && !currentKC) {
      loadNextQuestion();
    }
  }, [showIntro, probabilities, currentKC, loadNextQuestion]);

  const handleIntroNext = () => {
    if (introStep < TUTOR_STRATEGIES.length - 1) {
      setIntroStep((s) => s + 1);
    } else {
      if (typeof window !== "undefined") localStorage.setItem("tutor-intro-done", "true");
      setShowIntro(false);
      setIntroStep(0);
      loadNextQuestion();
    }
  };

  const handleResult = useCallback(
    async (correct: boolean) => {
      if (!currentKC) return;
      try {
        await recordObservation(currentKC, correct);
      } catch {
        // ignore
      }
    },
    [currentKC, recordObservation]
  );

  const handleAdvance = useCallback(() => {
    loadNextQuestion();
  }, [loadNextQuestion]);

  const handleSolveResult = useCallback(
    (correct: boolean) => {
      handleResult(correct);
      // Do not auto-advance on correct; user clicks Next after "Great job!" overlay
    },
    [handleResult]
  );

  if (loading && showIntro === null) {
    return (
      <div className="mt-6 py-8 text-center text-muted-foreground">
        Loading…
      </div>
    );
  }

  if (showIntro) {
    const strategy = TUTOR_STRATEGIES[introStep];
    if (!strategy) return null;
    return (
      <div className="mt-6">
        <IntroSlide strategy={strategy} onNext={handleIntroNext} />
      </div>
    );
  }

  if (!miniBoard || !currentKC) {
    return (
      <div className="mt-6 py-8 text-center text-muted-foreground">
        Loading question…
      </div>
    );
  }

  if (questionType === "solve") {
    return (
      <div className="mt-6 space-y-4">
        <p className="text-sm font-medium text-foreground">
          Practice: {currentKC === "naked_single" ? "Naked Single" : "Hidden Single"}
        </p>
        <SolveCellQuestion
          key={advanceKey}
          initial={miniBoard.initial}
          answerRow={miniBoard.answerRow}
          answerCol={miniBoard.answerCol}
          correctValue={miniBoard.correctValue}
          strategy={miniBoard.strategy}
          onResult={handleSolveResult}
          onAdvance={handleAdvance}
        />
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      <MultipleChoiceQuestion
        key={advanceKey}
        board={miniBoard.initial}
        answerRow={miniBoard.answerRow}
        answerCol={miniBoard.answerCol}
        correctStrategy={miniBoard.strategy}
        onResult={handleResult}
        onAdvance={handleAdvance}
      />
    </div>
  );
}
