import React from 'react';
import ReactDOM from 'react-dom/client';

function Example() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header"> a a a aExample Component</div>

                        <div className="card-body">I' sasm an example component!</div>
                    </div>
                </div>
            </div>
        </div>
    );
} 

export default Example;

if (document.getElementById('example')) {
  /*   const Index = ReactDOM.createRoot(document.getElementById("example"));

    Index.render(
        <React.StrictMode>
            <Example/>
        </React.StrictMode>
    ) */

    let container = null;
    document.addEventListener('DOMContentLoaded', function(event) {
        if (!container) {
            container = document.getElementById('example') ;
            const root = ReactDOM.createRoot(container)
            root.render(
            <React.StrictMode>
                <Example/>
            </React.StrictMode>
            );
        }
    });
    
}
