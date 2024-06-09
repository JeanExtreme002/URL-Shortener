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
        window.location.href = "/error";
    });
  }, [id]);

  return (
    <div style={{margin: "1vh"}}>
      Redirecting ...
    </div>
  );
};

export default RedirectComponent;