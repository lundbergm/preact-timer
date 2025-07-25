import { useEffect, useRef, useState } from 'preact/hooks';

export type TrashDates = {
    one: string;
    two: string;
};

export function useTrash() {
    const [data, setData] = useState<TrashDates | null>(null);
    const intervalRef = useRef<NodeJS.Timeout>();

    const fetchTrashDates = () => {
        const today = new Date();
        const todayString = today.toISOString().split('T')[0];
        const nextTrashDate1 = trashDates1.find((date) => date >= todayString) || null;
        const nextTrashDate2 = trashDates2.find((date) => date >= todayString) || null;
        setData({ one: nextTrashDate1, two: nextTrashDate2 });
    };

    useEffect(() => {
        fetchTrashDates();
        intervalRef.current = setInterval(() => {
            fetchTrashDates();
        }, 1 * 60 * 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return { data };
}

export const trashDates1 = [
    '2025-07-29',
    '2025-08-05',
    '2025-08-12',
    '2025-08-19',
    '2025-08-26',
    '2025-09-02',
    '2025-09-09',
    '2025-09-23',
    '2025-10-07',
    '2025-10-21',
    '2025-11-04',
    '2025-11-18',
    '2025-12-02',
    '2025-12-16',
    '2025-12-23',
    '2025-12-30',
];

const trashDates2 = ['2025-08-15', '2025-09-12', '2025-10-10', '2025-11-07', '2025-12-05'];
