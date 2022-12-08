import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Link } from "react-router-dom";
import { deleteDeck } from "./api/deleteDeck";
import { getDecks, TDeck } from "./api/getDecks";
import { createDeck } from "./api/createDeck";

function App() {
  const [decks, setDecks] = useState<TDeck[]>([]); //where we are storing the decks. this array stores an array of TDeck types
  const [title, setTitle] = useState(""); //
  async function handleCreteDeck(e: React.FormEvent) {
    //preventing default because you will lose data and the data is lost
    e.preventDefault();

    const deck = await createDeck(title);
    setDecks([...decks, deck]); // to reorder arrays you must pass a refrence to old array. so i am passing an array to this new array and spreading it. takes old elements of the array and puts it in the new array. the deck comes from back end and is upended.
    setTitle("");
  }
  async function handleDeleteDeck(deckId: string) {
    await deleteDeck(deckId);
    setDecks(decks.filter((deck) => deck._id !== deckId));
  }

  useEffect(() => {
    //use effect hook
    async function fetchDecks() {
      // when the api request is finished loading we are going to set that array of decks inside of our state

      const newDecks = await getDecks();
      setDecks(newDecks);
    }
    fetchDecks();
  }, []);

  return (
    <div className="App">
      <ul className="decks">
        {decks.map((deck) => (
          <li key={deck._id}>
            <button onClick={() => handleDeleteDeck(deck._id)}>X</button>

            <Link to={`decks/${deck._id}`}>{deck.title}</Link>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreteDeck}>
        <label id="thisLabel" htmlFor="deck-title">
          {" "}
          Deck Title
        </label>
        <input
          id="deck-title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
        <button>Create Deck</button>
      </form>
    </div>
  );
}

export default App;
