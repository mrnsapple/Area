import React from 'react';

async function Apk(props) {
  
    const link = document.createElement('a');
    link.href = "/apk/client-release.apk";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log("coucou")
  
  return (
  <div></div>
  );
}



export default Apk;
