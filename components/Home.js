// Importing necessary modules and components
import { useState, useEffect } from 'react'; // Importing useState and useEffect hooks from React
import Card from './Card'; // Importing the Card component
import styles from '../styles/Home.module.css'; // Importing the CSS module for styling the Home component

// Defining the Home component
function Home() {
  // Defining an array of cards representing the deck with their unique IDs, names, and image URLs
  const deck = [
    // Each card has a unique id, name, and image associated with it
    // The deck contains duplicate cards to form pairs for the memory game
    // The game will match cards with the same name
    // You can add more cards or modify the existing ones to expand or customize the game
    // For example, you can add more unique cards with different images and names
  ];

  // Setting up state variables using the useState hook
  const [cards, setCards] = useState([]); // Holds the current state of cards in the game
  const [selected, setSelected] = useState([]); // Keeps track of selected cards during a turn
  const [matched, setMatched] = useState([]); // Stores the IDs of matched cards

  // useEffect hook is used to shuffle the deck of cards and initialize the game when the component is mounted
  useEffect(() => {
    // Shuffling the deck of cards using a random sorting function
    const shuffledDeck = deck.sort(() => Math.random() - 0.5);

    // Updating the state of cards with the shuffled deck
    setCards(shuffledDeck);
  }, []);

  // Function to handle card selection during the game
  const selectCard = (id) => {
    setSelected([...selected, id]); // Adding the selected card's ID to the 'selected' state array

    if (selected.length === 1) {
      // If two cards are selected, we check if they are a match
      const [firstCardId] = selected;
      const [firstCard] = cards.filter((card) => card.id === firstCardId);
      const [secondCard] = cards.filter((card) => card.id === id);

      if (firstCard.name === secondCard.name) {
        // If the names of the two selected cards match, it's a successful match
        // We update the 'matched' state with the IDs of the matched cards
        setMatched([...matched, firstCardId, id]);
      }

      // After a brief timeout, we reset the 'selected' state array to start a new turn
      setTimeout(() => {
        setSelected([]);
      }, 1000);
    }
  };

  // Generating JSX elements for displaying the cards on the UI
  const cardsToDisplay = cards.map((card) => {
    // Checking if the current card is matched or selected based on their IDs
    const isMatched = matched.includes(card.id);
    const isSelected = selected.includes(card.id);

    return (
      // Rendering the Card component with relevant props
      <Card
        key={card.id} // React requires a unique 'key' prop when rendering an array of elements
        id={card.id} // ID of the card
        name={card.name} // Name of the card (used for matching)
        image={card.image} // Image URL of the card
        selectCard={selectCard} // Callback function to handle card selection
        selected={isSelected || isMatched} // Whether the card is currently selected or matched
        matched={isMatched} // Whether the card is currently matched
      />
    );
  });

  // Rendering the Home component
  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Memory Game 🧠</h1>
        <div className={styles.headerDivider} />
      </div>

      <div className={styles.main}>
        <div className={styles.grid}>{cardsToDisplay}</div>
      </div>
    </div>
  );
}

// Exporting the Home component so it can be used in other parts of the application
export default Home;
