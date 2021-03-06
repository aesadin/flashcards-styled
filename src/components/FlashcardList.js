import React from "react";
import PropTypes from "prop-types";
import Flashcard from "./Flashcard";
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'

function FlashcardList(props){
  useFirestoreConnect([
    { collection: 'flashcards' }
  ]);

  const flashcards = useSelector(state => state.firestore.ordered.flashcards);

  if(isLoaded(flashcards)) {
    return (
      <React.Fragment>
        <div className="flashcard-grid-layout">
        {flashcards.map((flashcard) => {
          return <div className='flashcard'>
            <Flashcard
          whenDetailsClicked = {props.onFlashcardSelection}
          term={flashcard.term}
          definition={flashcard.definition}
          id={flashcard.id}
          key={flashcard.id}/>
          </div>
        })}
        </div>
        <div className='footer'>
          <button onClick={props.onAddFlashcardClick}>Add Flashcard</button>
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h3>Loading flashcards...</h3>
      </React.Fragment>
    )
  }
}

FlashcardList.propTypes = {
  onFlashcardSelection: PropTypes.func,
  onAddFlashcardClick: PropTypes.func
};

export default FlashcardList;