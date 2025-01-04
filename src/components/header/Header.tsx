export type HeaderProps = {
    page: Page;
    setPage: (page: Page) => void;
};

export type Page = 'home' | 'timer' | 'stopwatch' | '404';

export function Header(props: HeaderProps) {
    return (
        <header>
            <nav>
                <a onClick={() => props.setPage('home')} class={props.page == 'home' && 'active'}>
                    Home
                </a>
                <a onClick={() => props.setPage('timer')} class={props.page == 'timer' && 'active'}>
                    Timer
                </a>
                <a onClick={() => props.setPage('stopwatch')} class={props.page == 'stopwatch' && 'active'}>
                    Stop Watch
                </a>
                <a onClick={() => props.setPage('404')} class={props.page == '404' && 'active'}>
                    404
                </a>
            </nav>
        </header>
    );
}
