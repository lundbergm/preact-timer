import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';

import { Header, Page } from './components/header/Header.js';
import { NotFound } from './pages/_404.jsx';
import './style.css';
import { useState } from 'preact/hooks';
import { TabataTimer } from './pages/Timer/index.js';
import { StopWatch } from './pages/StopWatch/index.js';
import { Dash } from './pages/Dash/index.js';

export function App() {
    console.log('App component rendered');
    const [page, setPage] = useState<Page>('dash');

    let content = null;
    switch (page) {
        case 'timer':
            content = <TabataTimer />;
            break;
        case 'stopwatch':
            content = <StopWatch />;
            break;
        case 'dash':
            content = <Dash />;
            break;
        default:
            content = <NotFound />;
    }

    return (
        <LocationProvider>
            <Header page={page} setPage={setPage} />
            <main>
                {content}
                {/* <Router>
                    <Route path="/" component={Home} />
                    <Route default component={NotFound} />
                </Router> */}
            </main>
        </LocationProvider>
    );
}

render(<App />, document.getElementById('app'));
