import React, { useState, useEffect } from "react";
import {
  MapPin,
  CheckCircle2,
  Lock,
  Trophy,
  Lightbulb,
  ChevronRight,
  Gift,
} from "lucide-react";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Textarea } from "./components/ui/textarea";
import { Progress } from "./components/ui/progress";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";
import {
  RadioGroup,
  RadioGroupItem,
} from "./components/ui/radio-group";
import { Label } from "./components/ui/label";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import capybaraKeychain from "figma:asset/91aa2213cb70fe1928b427542387094684bdfcae.png";

// Ngee Ann Polytechnic blue and gold colors
const NP_BLUE = "#003D7A";
const NP_GOLD = "#F0AD4E";

// Types
type Screen =
  | "onboarding"
  | "home"
  | "booth1"
  | "booth2"
  | "booth3"
  | "quiz-locked"
  | "quiz"
  | "results"
  | "prize";

interface BoothData {
  id: number;
  name: string;
  completed: boolean;
  notes: string;
  confirmCode: string;
  hints: {
    area: string;
    landmark: string;
    theme: string;
    stronger: string;
  };
}

interface QuizQuestion {
  id: number;
  type: "multiple-choice" | "fill-blank" | "matching";
  question: string;
  options?: string[];
  correctAnswer: string;
  userAnswer?: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("onboarding");
  const [huntStarted, setHuntStarted] = useState(false);
  const [showStrongerHints, setShowStrongerHints] =
    useState(false);

  // Booth states
  const [booths, setBooths] = useState<BoothData[]>([
    {
      id: 1,
      name: "Booth 1: 63 Years of Excellence",
      completed: false,
      notes: "",
      confirmCode: "BOOTHCODE",
      hints: {
        area: "A bright, open indoor space where people usually pass through or gather.",
        landmark: "High ceiling / lots of natural light, open seating, and sometimes event posters or displays.",
        theme: "Where campus stories 'echo', a place made for gatherings and announcements.",
        stronger: "Look for the main indoor gathering space, wide and open, with plenty of seating and a big 'central hub' vibe. If you see people meeting up or waiting around, you're close.",
      },
    },
    {
      id: 2,
      name: "Booth 2: Distinguished Alumni",
      completed: false,
      notes: "",
      confirmCode: "BOOTHCODE",
      hints: {
        area: "A student-focused corner meant for chilling, collaboration, and group work.",
        landmark: "Comfortable seating, power points, study/collab vibe (people working on laptops), and a space that feels like a 'shared lounge'.",
        theme: "A place built for creativity and teamwork, where ideas are 'made'.",
        stronger: "Find the student collaboration/lounge area that feels like a shared hub for projects. If you see people gathered around tables doing work (more 'hangout + productivity' than classroom), you're likely at the right spot.",
      },
    },
    {
      id: 3,
      name: "Booth 3: Memorable Events",
      completed: false,
      notes: "",
      confirmCode: "BOOTHCODE",
      hints: {
        area: "Follow the crowds, this area gets busiest around meal times.",
        landmark: "Food smells, lots of seating, multiple stalls/shops, trays, and noisy chatter.",
        theme: "Fuel for the journey, every hunt needs a 'pit stop'.",
        stronger: "Head toward the food cluster near Block 22. If you spot signs referencing 'Blk 22' or a big dining area with many stalls, that's your target.",
      },
    },
  ]);

  // Quiz state
  const [quizQuestions] = useState<QuizQuestion[]>([
    // 63 Years History
    {
      id: 1,
      type: "multiple-choice",
      question: "How many times has Ngee Ann Polytechnic changed its name? List all the names.",
      options: [
        "3 times — Ngee Ann College → Ngee Ann Technical College (NATC) → Ngee Ann Polytechnic",
        "2 times — Ngee Ann School → Ngee Ann Polytechnic",
        "4 times — Ngee Ann College → Ngee Ann Institute → NATC → Ngee Ann Polytechnic"
      ],
      correctAnswer: "3 times — Ngee Ann College → Ngee Ann Technical College (NATC) → Ngee Ann Polytechnic",
    },
    {
      id: 2,
      type: "multiple-choice",
      question: "Who was the first principal of Ngee Ann Polytechnic?",
      options: [
        "Professor Liu Yin Soon",
        "Mr Lim Keng Huat",
        "Dr Tan Wei Ming"
      ],
      correctAnswer: "Professor Liu Yin Soon",
    },
    {
      id: 3,
      type: "multiple-choice",
      question: "What major shift did NP make in the late 1960s–1970s to support Singapore industrial growth?",
      options: [
        "Shifted from degree programmes to diploma-level education (training skilled technical and commercial workers)",
        "Shifted from full-time study to mainly part-time night classes",
        "Shifted from technical training to arts and humanities specialisation"
      ],
      correctAnswer: "Shifted from degree programmes to diploma-level education (training skilled technical and commercial workers)",
    },
    {
      id: 4,
      type: "multiple-choice",
      question: "How many courses were first offered? Name all of them.",
      options: [
        "7 degree courses — Accountancy, Business Administration, Chinese Language, Malay Language, Applied Chemistry, Telecommunications, Domestic Science",
        "5 diploma courses — Engineering, Business, IT, Design, Hospitality",
        "9 courses — Accountancy, Marketing, Law, Medicine, Nursing, Engineering, Chinese, Malay, Domestic Science"
      ],
      correctAnswer: "7 degree courses — Accountancy, Business Administration, Chinese Language, Malay Language, Applied Chemistry, Telecommunications, Domestic Science",
    },
    {
      id: 5,
      type: "multiple-choice",
      question: "What year did Ngee Ann Polytechnic reach over 10,000 students?",
      options: [
        "1988",
        "1978",
        "1995"
      ],
      correctAnswer: "1988",
    },
    {
      id: 6,
      type: "multiple-choice",
      question: "What learning approach did NP introduce in the early 2000s?",
      options: [
        "Ngee Ann Learning Model",
        "Ngee Ann Lecture-Only Framework",
        "Ngee Ann Dual-Campus Model"
      ],
      correctAnswer: "Ngee Ann Learning Model",
    },
    {
      id: 7,
      type: "multiple-choice",
      question: "What learning experience does \"Dialogue in the Dark\" provide?",
      options: [
        "Experiential learning",
        "Competitive exam-based learning",
        "Fully online self-paced learning"
      ],
      correctAnswer: "Experiential learning",
    },
    {
      id: 8,
      type: "multiple-choice",
      question: "Approximately how many students were enrolled at NP as of 2020?",
      options: [
        "Over 14,000 students",
        "Around 6,000 students",
        "Over 25,000 students"
      ],
      correctAnswer: "Over 14,000 students",
    },
    // NP Key Events History
    {
      id: 9,
      type: "multiple-choice",
      question: "Which NP event is designed to help freshmen transition into polytechnic life and build friendships across schools?",
      options: [
        "THRIVE Camp",
        "RED Camp",
        "Graduation Tea Reception"
      ],
      correctAnswer: "THRIVE Camp",
    },
    {
      id: 10,
      type: "multiple-choice",
      question: "What does RED Camp help prospective students do at Ngee Ann Polytechnic?",
      options: [
        "Explore NP's campus, diploma courses, CCAs, and student life",
        "Train students for national-level sports competitions",
        "Prepare graduating students for internships and job interviews"
      ],
      correctAnswer: "Explore NP's campus, diploma courses, CCAs, and student life",
    },
    {
      id: 11,
      type: "multiple-choice",
      question: "Which NP camp focuses on developing leadership, communication, and teamwork skills?",
      options: [
        "Youth Leaders Camp",
        "THRIVE Camp",
        "Open House Ambassador Camp"
      ],
      correctAnswer: "Youth Leaders Camp",
    },
    // NP Alumni History
    {
      id: 12,
      type: "multiple-choice",
      question: "Which NP alumnus on the poster is associated with the value \"INNOVATION\"?",
      options: [
        "Ian Alexander Ang",
        "Marcus Tan",
        "Quek Siu Rui"
      ],
      correctAnswer: "Ian Alexander Ang",
    },
    {
      id: 13,
      type: "multiple-choice",
      question: "According to the poster, which two alumni are listed as the FOUNDERS of Carousell?",
      options: [
        "Marcus Tan and Quek Siu Rui",
        "Ian Alexander Ang and Marcus Tan",
        "Quek Siu Rui and Ian Alexander Ang"
      ],
      correctAnswer: "Marcus Tan and Quek Siu Rui",
    },
    {
      id: 14,
      type: "multiple-choice",
      question: "What do all six alumni on the poster have in common?",
      options: [
        "They are successful graduates of Ngee Ann Polytechnic from different fields",
        "They were all student council presidents",
        "They all graduated in the same year"
      ],
      correctAnswer: "They are successful graduates of Ngee Ann Polytechnic from different fields",
    },
  ]);

  const [userAnswers, setUserAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Calculate progress
  const completedBooths = booths.filter(
    (b) => b.completed,
  ).length;
  const progressPercentage =
    (completedBooths / booths.length) * 100;

  // Handlers
  const handleStartHunt = () => {
    setHuntStarted(true);
    setCurrentScreen("home");
  };

  const updateBoothNotes = (boothId: number, notes: string) => {
    setBooths((prev) =>
      prev.map((b) => (b.id === boothId ? { ...b, notes } : b)),
    );
  };

  const completeBooths = (boothId: number, code: string) => {
    const booth = booths.find((b) => b.id === boothId);
    if (booth && code.toUpperCase() === booth.confirmCode) {
      setBooths((prev) =>
        prev.map((b) =>
          b.id === boothId ? { ...b, completed: true } : b,
        ),
      );
      setCurrentScreen("home");
      return true;
    }
    return false;
  };

  const handleQuizAnswer = (
    questionId: number,
    answer: string,
  ) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const submitQuiz = () => {
    let score = 0;
    quizQuestions.forEach((q) => {
      const userAnswer = userAnswers[q.id]
        ?.trim()
        .toLowerCase();
      const correctAnswer = q.correctAnswer
        .trim()
        .toLowerCase();
      if (userAnswer === correctAnswer) {
        score++;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
    setCurrentScreen("results");
  };

  const resetHunt = () => {
    setBooths((prev) =>
      prev.map((b) => ({ ...b, completed: false, notes: "" })),
    );
    setUserAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    setHuntStarted(false);
    setCurrentScreen("onboarding");
  };

  // Screen Components
  const OnboardingScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Hero Image */}
      <div className="w-full h-48 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1600903308878-bf5e554ab841?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYW1wdXMlMjBidWlsZGluZ3xlbnwxfHx8fDE3Njc1MjMyODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Campus Building"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full p-6">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mb-6 -mt-12 border-4 border-white shadow-lg"
          style={{ backgroundColor: NP_BLUE }}
        >
          <MapPin className="w-12 h-12 text-white" />
        </div>

        <h1
          className="text-center mb-3"
          style={{ color: NP_BLUE }}
        >
          NP History Hunt
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Discover the rich heritage of Ngee Ann Polytechnic
        </p>

        <Card className="w-full mb-6">
          <CardHeader>
            <CardTitle className="text-center">
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: NP_BLUE }}
              >
                <span className="text-white">1</span>
              </div>
              <p className="text-gray-700">
                Follow hints to find 3 physical booths around
                campus
              </p>
            </div>

            <div className="flex gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: NP_BLUE }}
              >
                <span className="text-white">2</span>
              </div>
              <p className="text-gray-700">
                At each booth, collect historical information
                and take notes
              </p>
            </div>

            <div className="flex gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: NP_BLUE }}
              >
                <span className="text-white">3</span>
              </div>
              <p className="text-gray-700">
                Enter the booth code to mark it complete
              </p>
            </div>

            <div className="flex gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: NP_GOLD }}
              >
                <span className="text-white">4</span>
              </div>
              <p className="text-gray-700">
                Complete all booths to unlock the final quiz and
                win a gift!
              </p>
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={handleStartHunt}
          className="w-full text-white"
          style={{ backgroundColor: NP_BLUE }}
          size="lg"
        >
          Start the Hunt
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );

  const HomeScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div
        className="text-white p-6 pb-12"
        style={{ backgroundColor: NP_BLUE }}
      >
        <h2 className="text-white mb-2">Your Progress</h2>
        <div className="flex items-center gap-3 mb-3">
          <Progress
            value={progressPercentage}
            className="flex-1 h-3"
          />
          <span className="text-white">
            {completedBooths}/3
          </span>
        </div>
        <p className="text-blue-100">
          {completedBooths === 0 &&
            "Let's begin your journey through NP's history!"}
          {completedBooths === 1 &&
            "Great start! Two more booths to go!"}
          {completedBooths === 2 &&
            "Almost there! One booth remaining!"}
          {completedBooths === 3 &&
            "Amazing! You've completed all booths! Ready for the quiz?"}
        </p>
      </div>

      {/* Booths */}
      <div className="px-6 -mt-8 space-y-4">
        {booths.map((booth) => (
          <Card
            key={booth.id}
            className={`cursor-pointer transition-all ${booth.completed ? "border-2" : ""}`}
            style={
              booth.completed ? { borderColor: NP_GOLD } : {}
            }
            onClick={() =>
              setCurrentScreen(`booth${booth.id}` as Screen)
            }
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: booth.completed
                    ? NP_GOLD
                    : NP_BLUE,
                }}
              >
                {booth.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-white" />
                ) : (
                  <MapPin className="w-6 h-6 text-white" />
                )}
              </div>

              <div className="flex-1">
                <h4 style={{ color: NP_BLUE }}>{booth.name}</h4>
                <p className="text-sm text-gray-600">
                  {booth.completed
                    ? "Completed ✓"
                    : "Tap to view hints"}
                </p>
              </div>

              <ChevronRight className="w-5 h-5 text-gray-400" />
            </CardContent>
          </Card>
        ))}

        {/* Quiz Card */}
        <Card
          className={`cursor-pointer transition-all ${completedBooths === 3 ? "border-2" : ""}`}
          style={
            completedBooths === 3
              ? { borderColor: NP_GOLD }
              : {}
          }
          onClick={() =>
            setCurrentScreen(
              completedBooths === 3 ? "quiz" : "quiz-locked",
            )
          }
        >
          <CardContent className="p-4 flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor:
                  completedBooths === 3 ? NP_GOLD : "#e5e7eb",
              }}
            >
              {completedBooths === 3 ? (
                <Trophy className="w-6 h-6 text-white" />
              ) : (
                <Lock className="w-6 h-6 text-gray-400" />
              )}
            </div>

            <div className="flex-1">
              <h4
                style={{
                  color:
                    completedBooths === 3 ? NP_BLUE : "#9ca3af",
                }}
              >
                Final Quiz
              </h4>
              <p className="text-sm text-gray-600">
                {completedBooths === 3
                  ? "Ready to test your knowledge!"
                  : `Complete ${3 - completedBooths} more booth${3 - completedBooths > 1 ? "s" : ""}`}
              </p>
            </div>

            <ChevronRight className="w-5 h-5 text-gray-400" />
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const BoothScreen = ({ boothId }: { boothId: number }) => {
    const booth = booths.find((b) => b.id === boothId);
    const [codeInput, setCodeInput] = useState("");
    const [codeError, setCodeError] = useState(false);
    const [localNotes, setLocalNotes] = useState(booth?.notes || "");

    // Sync local notes with booth notes when booth changes
    useEffect(() => {
      if (booth) {
        setLocalNotes(booth.notes);
      }
    }, [booth?.id]);

    if (!booth) return null;

    const handleComplete = () => {
      const success = completeBooths(booth.id, codeInput);
      if (!success) {
        setCodeError(true);
        setTimeout(() => setCodeError(false), 2000);
      }
    };

    const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newNotes = e.target.value;
      setLocalNotes(newNotes);
    };

    const handleNotesBlur = () => {
      updateBoothNotes(booth.id, localNotes);
    };

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div
          className="text-white p-6"
          style={{ backgroundColor: NP_BLUE }}
        >
          <Button
            variant="ghost"
            className="text-white mb-2 -ml-2"
            onClick={() => setCurrentScreen("home")}
          >
            ← Back to Home
          </Button>
          <h2 className="text-white">{booth.name}</h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Hints Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle
                  className="flex items-center gap-2"
                  style={{ color: NP_BLUE }}
                >
                  <Lightbulb className="w-5 h-5" />
                  Hints to Find This Booth
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setShowStrongerHints(!showStrongerHints)
                  }
                  style={{
                    borderColor: NP_GOLD,
                    color: NP_GOLD,
                  }}
                >
                  {showStrongerHints
                    ? "Light Hints"
                    : "Stronger Hint"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {!showStrongerHints ? (
                <>
                  <div>
                    <Badge variant="outline" className="mb-2">
                      Area
                    </Badge>
                    <p className="text-gray-700">
                      {booth.hints.area}
                    </p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">
                      Look For
                    </Badge>
                    <p className="text-gray-700">
                      {booth.hints.landmark}
                    </p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">
                      Theme
                    </Badge>
                    <p className="text-gray-700">
                      {booth.hints.theme}
                    </p>
                  </div>
                </>
              ) : (
                <div
                  className="p-4 rounded-lg"
                  style={{
                    backgroundColor: "#FFF9E6",
                    borderLeft: `4px solid ${NP_GOLD}`,
                  }}
                >
                  <p className="text-gray-800">
                    {booth.hints.stronger}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notes Section */}
          <Card>
            <CardHeader>
              <CardTitle style={{ color: NP_BLUE }}>
                Notes / Info I Found
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Write down the historical information you
                discover at the booth
              </p>
            </CardHeader>
            <CardContent>
              <Textarea
                value={localNotes}
                onChange={handleNotesChange}
                onBlur={handleNotesBlur}
                placeholder="What did you learn at this booth? Write your notes here..."
                className="min-h-32"
              />
            </CardContent>
          </Card>

          {/* Complete Booth */}
          <Card>
            <CardHeader>
              <CardTitle style={{ color: NP_BLUE }}>
                Mark Booth as Completed
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Enter the code displayed at the booth
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                placeholder="Enter booth code"
                className={codeError ? "border-red-500" : ""}
              />
              {codeError && (
                <p className="text-sm text-red-600">
                  Incorrect code. Please try again.
                </p>
              )}
              <Button
                onClick={handleComplete}
                className="w-full text-white"
                style={{ backgroundColor: NP_GOLD }}
                disabled={!codeInput.trim()}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Complete Booth
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const QuizLockedScreen = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => setCurrentScreen("home")}
        >
          ← Back to Home
        </Button>

        <Card className="text-center">
          <CardContent className="p-8">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "#e5e7eb" }}
            >
              <Lock className="w-10 h-10 text-gray-400" />
            </div>

            <h2 className="mb-3" style={{ color: NP_BLUE }}>
              Quiz Locked
            </h2>
            <p className="text-gray-600 mb-6">
              Complete all 3 booths to unlock the final quiz and
              earn your certificate!
            </p>

            <div className="space-y-2 mb-6">
              {booths.map((booth) => (
                <div
                  key={booth.id}
                  className="flex items-center gap-3 justify-center"
                >
                  {booth.completed ? (
                    <CheckCircle2
                      className="w-5 h-5"
                      style={{ color: NP_GOLD }}
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                  )}
                  <span
                    className={
                      booth.completed
                        ? "text-gray-900"
                        : "text-gray-400"
                    }
                  >
                    {booth.name}
                  </span>
                </div>
              ))}
            </div>

            <Button
              onClick={() => setCurrentScreen("home")}
              style={{ backgroundColor: NP_BLUE }}
              className="text-white"
            >
              Continue Hunt
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const QuizScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-6">
      <div
        className="text-white p-6"
        style={{ backgroundColor: NP_BLUE }}
      >
        <h2 className="text-white mb-2">Final Quiz</h2>
        <p className="text-blue-100">
          Test your knowledge of NP's history
        </p>
      </div>

      <div className="p-6 space-y-6">
        {quizQuestions.map((q, index) => (
          <Card key={q.id}>
            <CardHeader>
              <div className="flex gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: NP_BLUE }}
                >
                  <span className="text-white">
                    {index + 1}
                  </span>
                </div>
                <CardTitle className="text-gray-900">
                  {q.question}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {q.type === "multiple-choice" && q.options && (
                <RadioGroup
                  value={userAnswers[q.id] || ""}
                  onValueChange={(value) =>
                    handleQuizAnswer(q.id, value)
                  }
                >
                  <div className="space-y-3">
                    {q.options.map((option, i) => (
                      <div
                        key={i}
                        className="flex items-center space-x-3 p-3 rounded-lg border-2 transition-colors cursor-pointer hover:bg-gray-50"
                        style={{
                          borderColor:
                            userAnswers[q.id] === option
                              ? NP_BLUE
                              : "#e5e7eb",
                        }}
                        onClick={() =>
                          handleQuizAnswer(q.id, option)
                        }
                      >
                        <RadioGroupItem
                          value={option}
                          id={`q${q.id}-${i}`}
                        />
                        <Label
                          htmlFor={`q${q.id}-${i}`}
                          className="flex-1 cursor-pointer"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              )}

              {q.type === "fill-blank" && (
                <Input
                  value={userAnswers[q.id] || ""}
                  onChange={(e) =>
                    handleQuizAnswer(q.id, e.target.value)
                  }
                  placeholder="Type your answer here"
                />
              )}
            </CardContent>
          </Card>
        ))}

        <Button
          onClick={submitQuiz}
          className="w-full text-white"
          style={{ backgroundColor: NP_GOLD }}
          size="lg"
          disabled={
            Object.keys(userAnswers).length !==
            quizQuestions.length
          }
        >
          Submit Quiz
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );

  const ResultsScreen = () => {
    const percentage = Math.round(
      (quizScore / quizQuestions.length) * 100,
    );
    const passed = percentage >= 60;
    const perfectScore = percentage === 100;

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6 flex items-center justify-center">
        <div className="max-w-md w-full">
          <Card className="text-center">
            <CardContent className="p-8">
              {/* Trophy/Badge */}
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{
                  backgroundColor: passed ? NP_GOLD : NP_BLUE,
                }}
              >
                <Trophy className="w-12 h-12 text-white" />
              </div>

              {/* Title */}
              <h1 className="mb-2" style={{ color: NP_BLUE }}>
                {passed ? "Congratulations!" : "Quiz Complete!"}
              </h1>
              <p className="text-gray-600 mb-6">
                {passed
                  ? "You've successfully completed the NP History Hunt!"
                  : "You've completed the hunt. Review and try again!"}
              </p>

              {/* Score */}
              <div
                className="p-6 rounded-lg mb-6"
                style={{ backgroundColor: "#E8F4F8" }}
              >
                <div
                  className="text-6xl mb-2"
                  style={{ color: NP_BLUE }}
                >
                  {percentage}%
                </div>
                <p className="text-gray-700">
                  {quizScore} out of {quizQuestions.length}{" "}
                  correct
                </p>
              </div>

              {/* Results Breakdown */}
              <div className="space-y-3 mb-6 text-left">
                {quizQuestions.map((q, index) => {
                  const userAnswer = userAnswers[q.id]
                    ?.trim()
                    .toLowerCase();
                  const correctAnswer = q.correctAnswer
                    .trim()
                    .toLowerCase();
                  const isCorrect =
                    userAnswer === correctAnswer;

                  return (
                    <div
                      key={q.id}
                      className="p-3 rounded-lg flex items-start gap-3"
                      style={{
                        backgroundColor: isCorrect
                          ? "#E8F8E8"
                          : "#FFF0F0",
                      }}
                    >
                      <div className="flex-shrink-0 mt-1">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        ) : (
                          <span className="w-5 h-5 flex items-center justify-center text-red-600">
                            ✗
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 mb-1">
                          Question {index + 1}
                        </p>
                        {!isCorrect && (
                          <p className="text-xs text-gray-600">
                            Hint: hint 1
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Feedback */}
              <div
                className="p-4 rounded-lg mb-6"
                style={{
                  backgroundColor: "#FFF9E6",
                  borderLeft: `4px solid ${NP_GOLD}`,
                }}
              >
                <p className="text-sm text-gray-800">
                  {percentage >= 80 &&
                    "Outstanding! You're a true NP historian!"}
                  {percentage >= 60 &&
                    percentage < 80 &&
                    "Well done! You have a good grasp of NP's history."}
                  {percentage < 60 &&
                    "Keep learning! Visit the booths again to discover more."}
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                {perfectScore ? (
                  <Button
                    onClick={() => setCurrentScreen("prize")}
                    className="w-full text-white"
                    style={{ backgroundColor: NP_GOLD }}
                    size="lg"
                  >
                    Claim Your Prize
                    <Gift className="ml-2 h-5 w-5" />
                  </Button>
                ) : (
                  <Button
                    onClick={resetHunt}
                    className="w-full text-white"
                    style={{ backgroundColor: NP_BLUE }}
                    size="lg"
                  >
                    Replay Hunt
                  </Button>
                )}
                {passed && !perfectScore && (
                  <p className="text-sm text-gray-600">
                    🎁 Collect your gift at Location A
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const PrizeScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6 flex items-center justify-center">
      <div className="max-w-md w-full">
        <Card className="text-center">
          <CardContent className="p-8">
            {/* Trophy/Badge */}
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{
                backgroundColor: NP_GOLD,
              }}
            >
              <Gift className="w-12 h-12 text-white" />
            </div>

            {/* Title */}
            <h1 className="mb-2" style={{ color: NP_BLUE }}>
              Perfect Score! 🎉
            </h1>
            <p className="text-gray-600 mb-6">
              You've achieved 100% on the NP History Hunt!
            </p>

            {/* Prize Image */}
            <div
              className="p-6 rounded-lg mb-4"
              style={{ backgroundColor: "#FFF9E6" }}
            >
              <img
                src="/capybara_keychain.png"
                alt="Capybara Keychain Prize"
                className="w-48 h-48 mx-auto mb-4 object-contain"
              />
              <h3 style={{ color: NP_BLUE }} className="mb-2">
                Your Prize
              </h3>
              <p className="text-gray-700">
                Capybara Keychain
              </p>
            </div>

            {/* Instructions */}
            <div
              className="p-4 rounded-lg mb-6"
              style={{
                backgroundColor: "#E8F4F8",
                borderLeft: `4px solid ${NP_GOLD}`,
              }}
            >
              <p className="text-sm text-gray-800">
                📍 Collect your prize at any booth by showing this page to the staff!
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                onClick={() => window.open('https://forms.gle/KSQbHzghn87z2A7d8', '_blank')}
                className="w-full text-white"
                style={{ backgroundColor: NP_GOLD }}
                size="lg"
              >
                Support us by completing a survey
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={resetHunt}
                variant="outline"
                className="w-full"
                style={{ borderColor: NP_BLUE, color: NP_BLUE }}
                size="lg"
              >
                Replay Hunt
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Render current screen
  return (
    <div
      className="min-h-screen"
      style={{ maxWidth: "480px", margin: "0 auto" }}
    >
      {currentScreen === "onboarding" && <OnboardingScreen />}
      {currentScreen === "home" && <HomeScreen />}
      {currentScreen === "booth1" && (
        <BoothScreen boothId={1} />
      )}
      {currentScreen === "booth2" && (
        <BoothScreen boothId={2} />
      )}
      {currentScreen === "booth3" && (
        <BoothScreen boothId={3} />
      )}
      {currentScreen === "quiz-locked" && <QuizLockedScreen />}
      {currentScreen === "quiz" && <QuizScreen />}
      {currentScreen === "results" && <ResultsScreen />}
      {currentScreen === "prize" && <PrizeScreen />}
    </div>
  );
}
