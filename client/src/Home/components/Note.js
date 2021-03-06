import React, { Fragment, useState } from 'react';
// import gapi from 'gapi-client';

import './Note.css';


const gapi = window.gapi;


function Note(props) {
  const {
    isSignedIn,
  } = props;

  const [url, setUrl] = useState('');


  async function handleCreateNotes() {
    const doc = await gapi.client.request({
      path: 'https://docs.googleapis.com/v1/documents',
      method: 'POST',
    });

    const documentId = doc.result.documentId;
    setUrl(`https://docs.google.com/document/d/${documentId}`);
  }

  function renderControls() {
    if (isSignedIn === false) return null;

    return (
      <Fragment>
        <button
          className='button is-primary te-button'
          onClick={handleCreateNotes}
        >
          Create Note
        </button>
      </Fragment>
    );
  }

  return (
    <div className="te-note-container">
      <div className='te-controls'>
        {renderControls()}
      </div>

      <iframe className="te-embedded-note" src={url} />
    </div>
  );
}

export default Note;
