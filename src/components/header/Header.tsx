export type HeaderProps = {
    page: Page;
    setPage: (page: Page) => void;
};

export type Page = 'timer' | 'stopwatch' | 'dash';

export function Header(props: HeaderProps) {
    return (
        <header>
            <nav>
                <a onClick={() => props.setPage('dash')} class={props.page == 'dash' && 'active'}>
                    Dashboard
                </a>
                <a onClick={() => props.setPage('timer')} class={props.page == 'timer' && 'active'}>
                    Timer
                </a>
                <a onClick={() => props.setPage('stopwatch')} class={props.page == 'stopwatch' && 'active'}>
                    Stop Watch
                </a>
            </nav>
        </header>
    );
}
