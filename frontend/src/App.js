import React from 'react';
import './App.css';
import Flow from './components/Flow';

function App() {
    return (
        <>

        <div className='flex flex-row h-screen'>
            <Flow />
            <div className='flex-none border-2 border-black px-16'>
                Properties
            </div>
        </div>

        </>
    );
}

export default App;
