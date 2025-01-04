import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';

import { Header, Page } from './components/header/Header.js';
import { Home } from './pages/Home/index.jsx';
import { NotFound } from './pages/_404.jsx';
import './style.css';
import { useState } from 'preact/hooks';
import { Timer } from './pages/Timer/index.js';
import { StopWatch } from './pages/StopWatch/index.js';

export function App() {
    const [page, setPage] = useState<Page>('home');

    let content = null;
    switch (page) {
        case 'home':
            content = <Home />;
            break;
        case 'timer':
            content = <Timer />;
            break;
        case 'stopwatch':
            content = <StopWatch />;
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
