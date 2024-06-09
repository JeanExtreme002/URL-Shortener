// RedirectComponent.js
import React from 'react';
import { useParams } from 'react-router-dom';

function RedirectComponent() {
  const { id } = useParams();

  React.useEffect(() => {
    const serverUrl = process.env.REACT_APP_BACKEND_HOST + ":" + process.env.REACT_APP_BACKEND_PORT;

    fetch(serverUrl + "/" + id).then((response) => {
        response.json().then((body) => {
            window.location.href = body.url;
        })
    }).catch(() => {
        window.location.href = "/";
    });
  }, [id]);

  return (
    <div>
      Redirecionando...
    </div>
  );
};

export default RedirectComponent;