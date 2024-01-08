import { useState } from 'react'
import { Button, Card, Container, Row, Col, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

export default function Board() {

  let icons = ['coffee', 'yin-yang', 'wrench', 'vr-cardboard', 'table-tennis', 'teeth-open', 'sun', 'snowman', 'poo', 'hippo', 'shower', 'robot', 'lightbulb', 'dice'];
  let rawCards = icons.concat(icons);
  let shuffledCards = rawCards.sort((a, b) => 0.5 - Math.random());
  // let bestScore = localStorage.getItem('memory-best-score');

  let shuffledCardObjects = shuffledCards.map(function (cardIcon, index) {
    return ({
      icon: cardIcon,
      flipped: false,
      pairFound: false,
      selected: false,
    })
  })

  const [cards, setCards] = useState(shuffledCardObjects);
  const [currentPair, setCurrentPair] = useState([]);
  const [playsCounter, setPlaysCounter] = useState(0);
  const [bestScore, setBestScore] = useState(localStorage.getItem('memory-best-score'));

  let victory = isVictory(cards);
  if (victory) {
    if (!localStorage.getItem('memory-best-score')) {
      localStorage.setItem('memory-best-score', playsCounter);
    } else {
      if (playsCounter < bestScore) {
        localStorage.setItem('memory-best-score', playsCounter);
      }
    }
  }

  function handleMemoryCardClick(index) {
    if (victory) {
      return;
    }

    if (cards[index].pairFound) {
      return;
    }

    let nextCards = cards.slice();
    let nextCurrentPair = currentPair.slice();

    if (currentPair.length < 2) {
      nextCurrentPair.push(index);
      nextCards[index].flipped = true;
      nextCards[index].selected = true;

      if (nextCurrentPair.length === 2) {
        setPlaysCounter(playsCounter + 1);

        if (isPairCorrect(cards[nextCurrentPair[0]].icon, cards[nextCurrentPair[1]].icon)) {
          nextCurrentPair.forEach(function (card) {
            nextCards[card].pairFound = true;
          });
        }
      }
    }

    if (currentPair.length === 2) {
      nextCurrentPair = [index];
      nextCards[index].flipped = true;
      nextCards[index].selected = true;


      currentPair.forEach(function (card) {
        if (!nextCards[card].pairFound) {
          nextCards[card].flipped = false;
        }
        nextCards[card].selected = false;

      });
    }

    setCards(nextCards);
    setCurrentPair(nextCurrentPair);

  }

  function handleRestart() {
    window.location.reload(false);
  }

  const cardElements = cards.map(function (card, index) {
    return (
      <MemoryCard key={index} icon={card.icon} flipped={cards[index].flipped} selected={cards[index].selected} pairFound={cards[index].pairFound} onMemoryCardClick={cards[index].flipped ? null : () => handleMemoryCardClick(index)}></MemoryCard>
    );
  })

  const bestScoreElement = bestScore ? <h2>Record : {bestScore}</h2> : '';


  return (
    <>
      <h1>React memory!</h1>
      <h2>Score : {playsCounter}</h2>
      {bestScoreElement}
      <Container className='grid-container'>
        {cardElements}
      </Container>
      <VictoryModal show={victory} playsCounter={playsCounter} onRestart={handleRestart} />
    </>
  );
}

function MemoryCard({ icon, flipped, selected, pairFound, onMemoryCardClick }) {
  let backgroundColor = pairFound ? 'gray' : '';
  let borderColor = selected ? 'red' : '';
  let flipStatus = flipped ? 'flip-card' : '';

  let cardFront = <FontAwesomeIcon icon={["fas", icon]} size="2x" />;

  if (flipped) {
    cardFront = <FontAwesomeIcon icon={["fas", icon]} size="2x" />
  }

  return (
    <>
      <Card style={{ width: '5rem', height: '7rem', background: backgroundColor, borderColor: borderColor }} className={classNames('memory-card', 'grid-item', flipStatus)} onClick={onMemoryCardClick}>
        <Card.Body className='d-flex align-items-center justify-content-center memory-card'>
          <div className='card-back'>
            {cardFront}
          </div>
          <div className="card-front">
            <FontAwesomeIcon icon={["fas", 'chess-queen']} size="2x" />
          </div>
        </Card.Body>
      </Card >
    </>
  );
}

function VictoryModal({ show, playsCounter, onRestart }) {
  console.log(playsCounter);
  return (
    <>
      <Modal show={show}
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>bien jouerr tu etre fort</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>nn c faux t'as fait en {playsCounter} tours et moi en 2 la premiere fois mais c pas une competition 🙂</p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={onRestart} variant='secondary'>Recommencer</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

function isPairCorrect(icon1, icon2) {
  return icon1 === icon2;
}

function isVictory(cards) {
  for (const card of cards) {
    if (card.pairFound === false) {
      return false;
    }
  }

  return true;
}