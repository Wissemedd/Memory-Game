import Image from 'next/image';
import styles from '../styles/Card.module.css';

function Card(props) {
  const handleClick = () => {
        // Checking if the Card is neither selected nor matched
    if (!props.selected && !props.matched) {
            // If the Card meets the conditions, call the selectCard function from the parent component with the Card's id as the argument
      props.selectCard(props.id);
    }
  };

  return (
    <div onClick={handleClick} className={`${styles.card} ${props.selected && styles.active}`}>
            {/* The Card has a flipper container that will handle the flipping animation */}
      <div className={styles.flipper}>
           {/* The cardFront represents the front side of the Card 
         It shows a question mark image if the Card is neither selected nor matched 
         The hidden class is added when the Card is either selected or matched to hide the front side */}
        <div className={`${styles.cardFront} ${props.selected || props.matched ? styles.hidden : ''}`}>
          <Image src="/images/questionmark.svg" alt="Card back" width={50} height={50} />
        </div>
        <div className={`${styles.cardBack} ${props.selected || props.matched ? '' : styles.hidden}`}>
              {/* The cardBack represents the back side of the Card 
         It shows an image associated with the Card if the Card is either selected or matched 
         The hidden class is added when the Card is neither selected nor matched to hide the back side */}
          <Image src={`/images/${props.image}`} alt={props.name} width={50} height={50} />
        </div>
      </div>
    </div>
  );
}

export default Card;

