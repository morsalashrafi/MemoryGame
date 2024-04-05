import "./SingleCard.css";
import Cover from "../assets/img/cover.png";

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  

  return (
    <div className="card">
      <div className={flipped ? "flipped" : "s"}>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          src={Cover}
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
}
