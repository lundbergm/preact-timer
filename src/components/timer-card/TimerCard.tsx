import { Timer } from '../../types/timer';
import { getTimerTime } from '../../utils/timer';
import './TimerCard.css';
import { IoMdTrash } from 'react-icons/io';
import { MdOutlineEdit } from 'react-icons/md';

export interface Props {
    timer: Timer;
    id: number;
    onDelete: (id: number) => void;
}
export function TimerCard({ timer, id, onDelete }: Props) {
    const { title, description } = timer;
    const timerTime = getTimerTime(timer);
    const handleDelete = () => {
        onDelete(id);
    };
    const handleEdit = () => {
        console.log('edit');
    };

    return (
        <div class="timer-card">
            <div class={'container-lr'}>
                <h2>{title}</h2>
                <button onClick={handleEdit} class="no-style-button">
                    <MdOutlineEdit size={25} />
                </button>
                <button style={{ paddingRight: 0 }} onClick={handleDelete} class="no-style-button">
                    <IoMdTrash size={25} />
                </button>
            </div>
            <p>{description}</p>
            <div class="stats">
                <div class={'container-lr'}>
                    <p>Duration</p>
                    <p>{timerTime.formattedTime}</p>
                </div>
            </div>
        </div>
    );
}
