import { Dispatch, StateUpdater, useEffect, useState } from 'preact/hooks';
import { AddButton } from '../../components/add-button/AddButton';
import { TimerCard } from '../../components/timer-card/TimerCard';
import './style.css';
import { Timer as Timer } from '../../types/timer';
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline, IoIosTimer, IoMdRepeat, IoMdSave } from 'react-icons/io';
import { IconType } from 'react-icons';
import { Nullable } from '../../types/nullable';
import { Spinner } from '../../components/spinner/Spinner';
import { addData, getAll, initDB } from '../../storage/db';
import { v4 as uuidv4 } from 'uuid';

const defaultTimer: Timer = {
    id: uuidv4(),
    title: 'Tabata',
    description: '20 seconds work, 10 seconds rest, 8 cycles',
    warmUp: 60,
    coolDown: 60,
    loops: [
        {
            work: 20,
            rest: 10,
            cycles: 8,
            sets: 1,
            restBetweenSets: 0,
        },
    ],
    restBetweenLoops: 0,
};

export function TabataTimer() {
    const [showDialog, setShowDialog] = useState(false);
    const [timers, setTimers] = useState<Nullable<Array<Timer>>>(null);
    const [editTimer, setEditTimer] = useState<Timer | null>(null);

    useEffect(() => {
        initDB().then((success) => {
            getAll<Timer>('timers').then((data) => {
                setTimers(data);
            });
        });
    }, []);

    const handleAddClick = () => {
        setShowDialog((prev) => !prev);
    };

    const handleSubmit = (timer: Timer) => {
        if (editTimer) {
            setTimers((prev) => prev.map((t) => (t === editTimer ? timer : t)));
            setEditTimer(null);
            setShowDialog(false);
            return;
        }
        setTimers((prev) => [...prev, timer]);

        addData<Object>('timers', timer);
        setShowDialog(false);
    };

    const handleDelete = (id: number) => {
        setTimers((prev) => prev.filter((_, index) => index !== id));
    };

    const handleEdit = (id: number) => {
        setEditTimer(timers[id]);
        setShowDialog(true);
    };

    if (!timers) {
        return (
            <div class="timer">
                <Spinner />
            </div>
        );
    }

    return (
        <div class="timer">
            <section>
                {!showDialog &&
                    timers.map((timer, index) => (
                        <TimerCard timer={timer} id={index} onDelete={handleDelete} onEdit={handleEdit} />
                    ))}
            </section>

            <AddButton onClick={handleAddClick} rotate={!!showDialog} />
            <TimerModal open={showDialog} onSubmit={handleSubmit} timer={editTimer} />
        </div>
    );
}

function TimerModal({
    onSubmit,
    open,
    timer,
}: {
    onSubmit: (timer: Timer) => void;
    open: boolean;
    timer: Nullable<Timer>;
}) {
    const [timerId, setTimerId] = useState(null);
    const [timerName, setTimerName] = useState('My new timer');
    const [description, setDescription] = useState('description');
    const [warmUp, setWarmUp] = useState('60');
    const [coolDown, setCoolDown] = useState('60');
    const [work, setWork] = useState('30');
    const [rest, setRest] = useState('15');
    const [cycles, setCycles] = useState('4');
    const [sets, setSets] = useState('3');
    const [restBetweenSets, setRestBetweenSets] = useState('60');

    useEffect(() => {
        const tmr = timer || {
            id: null,
            title: 'My new timer',
            description: 'description',
            warmUp: 60,
            coolDown: 60,
            loops: [{ work: 30, rest: 15, cycles: 4, sets: 3, restBetweenSets: 60 }],
            restBetweenLoops: 0,
        };
        setTimerId(tmr.id);
        setTimerName(tmr.title);
        setDescription(tmr.description);
        setWarmUp(tmr.warmUp.toString());
        setCoolDown(tmr.coolDown.toString());
        setWork(tmr.loops[0].work.toString());
        setRest(tmr.loops[0].rest.toString());
        setCycles(tmr.loops[0].cycles.toString());
        setSets(tmr.loops[0].sets.toString());
        setRestBetweenSets(tmr.loops[0].restBetweenSets.toString());
    }, [open]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const timer: Timer = {
            id: timerId || uuidv4(),
            title: timerName,
            description,
            warmUp: parseInt(warmUp),
            coolDown: parseInt(coolDown),
            loops: [
                {
                    work: parseInt(work),
                    rest: parseInt(rest),
                    cycles: parseInt(cycles),
                    sets: parseInt(sets),
                    restBetweenSets: parseInt(restBetweenSets),
                },
            ],
            restBetweenLoops: 0,
        };

        onSubmit(timer);
    };

    return (
        <dialog className="new-timer-dialog" open={open}>
            <form style={{ height: '90%', overflow: 'scroll' }} onSubmit={handleSubmit} method="dialog">
                <input
                    className="title"
                    type="text"
                    value={timerName}
                    onInput={(e) => setTimerName(e.currentTarget.value)}
                />
                <input
                    className="description"
                    type="text"
                    value={description}
                    onInput={(e) => setDescription(e.currentTarget.value)}
                />

                {Row({ name: 'Warm up', value: warmUp, setValue: setWarmUp })}
                <div className="loop">
                    {Row({ name: 'Work', value: work, setValue: setWork })}
                    {Row({ name: 'Rest', value: rest, setValue: setRest })}
                    {Row({ name: 'Cycles', value: cycles, setValue: setCycles, icon: IoMdRepeat })}
                    {Row({ name: 'Sets', value: sets, setValue: setSets, icon: IoMdRepeat })}
                    {Row({ name: 'Rest between sets', value: restBetweenSets, setValue: setRestBetweenSets })}
                </div>
                {Row({ name: 'Cool down', value: coolDown, setValue: setCoolDown })}
            </form>
            <button type="submit" onClick={handleSubmit}>
                <IoMdSave size={30} />
            </button>
        </dialog>
    );
}

function Row({
    name,
    setValue,
    value,
    icon,
}: {
    name: string;
    setValue: Dispatch<StateUpdater<string>>;
    value: string;
    icon?: IconType;
}) {
    const handleInput = (e: any) => {
        setValue(e.currentTarget.value);
    };

    const handleButtonClick = (e: any, value: number) => {
        e.preventDefault();
        setValue((prev: string) => (parseInt(prev) + value).toString());
    };
    const Icon = icon || IoIosTimer;

    return (
        <div className="row">
            <div style={{ flex: 1 }}>{Icon({ size: 30 })}</div>
            <div style={{ flex: 3, textAlign: 'left' }}>
                <p>{name}</p>
            </div>
            <button style={{ flex: '0 0 30px' }} onClick={(e) => handleButtonClick(e, -1)}>
                <IoIosRemoveCircleOutline size={30} />
            </button>
            <input style={{ flex: '1 0' }} value={value} onInput={handleInput} name={name} type="number" />
            <button style={{ flex: '0 0 30px' }} onClick={(e) => handleButtonClick(e, 1)}>
                <IoIosAddCircleOutline size={30} />
            </button>
        </div>
    );
}
