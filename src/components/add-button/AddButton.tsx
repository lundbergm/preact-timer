import './AddButton.css';
import { IoIosAddCircleOutline } from 'react-icons/io';

type Props = {
    onClick?: () => void;
    rotate?: boolean;
};

const styles = {
    main: {
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
    },
    button: {
        color: '#056bf1',
        'background-color': 'transparent',
        border: 'none',
    },
};

export function AddButton({ onClick, rotate }: Props) {
    return (
        <div class="add-button" style={styles.main}>
            <button style={styles.button} onClick={onClick} className={rotate ? 'rotate' : 'no-rotate'}>
                <IoIosAddCircleOutline size={'40px'} />
            </button>
        </div>
    );
}
