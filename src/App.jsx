import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";
import toast, { Toaster } from "react-hot-toast";
import { useSpring, animated } from "react-spring";
import Css from "../src/assets/img/icons8-css.svg";
import Html from "../src/assets/img/icons8-html.svg";
import Js from "../src/assets/img/icons8-js.svg";
import ReactNative from "../src/assets/img/icons8-react-native.svg";
import Sass from "../src/assets/img/icons8-sass.svg";
import Tailwindcss from "../src/assets/img/icons8-tailwindcss.svg";
import Visual from "../src/assets/img/icons8-visual-studio-code-2019.svg";

const cardImages = [
  { src: Css, matched: false },
  { src: Html, matched: false },
  { src: Js, matched: false },
  { src: ReactNative, matched: false },
  { src: Sass, matched: false },
  { src: Sass, matched: false },
  { src: Tailwindcss, matched: false },
  { src: Visual, matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showImages, setShowImages] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };
  console.log(cards, turns);

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => prevTurn + 1);
    setDisabled(false);
  };

  useEffect(() => {
    const showImagesOnLoad = () => {
      setTimeout(() => {
        setShowImages(true);

        setTimeout(() => {
          setShowImages(false);
          setGameStarted(true);
        }, 2000); 
      }, 3000); 
    };

    showImagesOnLoad();
    shuffleCards();
  }, []);

  const handleShowImages = () => {
    setShowImages(true);

    setTimeout(() => {
      setShowImages(false);
    }, 2000);
  };

  useEffect(() => {
    const areAllCardsMatched = cards.every((card) => card.matched);

    if (areAllCardsMatched && gameStarted) {
      toast.success("Congratulations! You won!");
    }
  }, [cards, gameStarted]);

  
  const springProps = useSpring({
    from: { opacity: 0},
    to: { opacity: 1 },
    config: { duration: 1500 },
  });

  return (
    <animated.div style={springProps}>
      <div className="App">
        <div>
          <h1>Memory Game </h1>
          <h5>🤍Designer By MorsalAshrafi🤍</h5>
          <div className="btns">
            <button onClick={shuffleCards}>New Game</button>
            <button onClick={handleShowImages}>Show Images</button>
          </div>

          <div className="card-grid">
            {cards.map((card) => (
              <SingleCard
                key={card.id}
                card={card}
                handleChoice={handleChoice}
                flipped={
                  card === choiceOne ||
                  card === choiceTwo ||
                  card.matched ||
                  showImages
                }
                disabled={disabled}
                showImages={showImages}
              />
            ))}
          </div>
          <p className="turn">Turns : {turns}</p>
        </div>
        <Toaster />
      </div>
    </animated.div>
  );
}

export default App;
