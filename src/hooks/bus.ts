import { useEffect, useRef, useState } from 'preact/hooks';

export type BusResponse = {
    time: string;
    usedSearchTime: string;
    refreshRateSeconds: number;
    id: string;
    journeys: [
        {
            id: number;
            sequenceNo: number;
            noOfChanges: number;
            routeLinks: RouteLink[];
        },
    ];
};

export type RouteLink = {
    id: string;
    from: {
        name: string;
        time: string;
        deviation?: number;
    };
    line: {
        name: string;
        type: string;
        no: string;
    };
};

export enum Stations {
    GessieBy = '9021012033001000',
    Stamhem = '9021012080427000',
}

const getUrl = (station: Stations) => {
    return `https://www.skanetrafiken.se/gw-tps/api/v2/Journey?fromPointId=${station}&fromPointType=STOP_AREA&toPointId=9021012080101000&toPointType=STOP_AREA&arrival=false&priority=SHORTEST_TIME&isBobCapable=false&journeysAfter=4&walkSpeed=NORMAL&maxWalkDistance=2000&allowWalkToOtherStop=true`;
};

export const useBusDeparture = (station: Stations) => {
    const [data, setData] = useState<BusResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const intervalRef = useRef<NodeJS.Timeout>();

    const fetchBusDeparture = async () => {
        try {
            setLoading(true);
            const response = await fetch(getUrl(station), { headers: { 'search-engine-environment': 'TjP' } });
            if (!response.ok) {
                throw new Error('Bus departure data fetch failed');
            }
            const busData = await response.json();
            setData(busData);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBusDeparture();
    }, [station]);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            fetchBusDeparture();
        }, 60000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return { data, loading, error };
};
