import React from 'react';
import {Link} from 'react-router-dom';

function ErrorPage() {
  return (
    <div id="error-comp">
      <div className="notfound">
        <h1>404</h1>
        <span>Not found.</span>
      </div>
      <span>Back to <Link to="/" className="back-home">Home</Link></span>
    </div>
  )
}

export default ErrorPage;