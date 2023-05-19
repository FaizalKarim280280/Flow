import { Fragment, React } from 'react';
import './App.css';
import Flow from './components/Flow';
import Navbar from './components/Navbar';

function App() {



    return (
        <>
            <Navbar />
            <div className='flex flex-row h-screen'>
                <Flow />
            </div>

        </>
    );
}

export default App;
