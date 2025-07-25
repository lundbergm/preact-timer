import { useEffect, useState } from 'preact/hooks';

const url = 'https://wpt-a.smhi.se/backend-weatherpage/forecast/v2025.4/2712526';

export type ForecastHour = {
    validFrom: string;
    validTo: string;
    symbol: number;
    tempMin: number;
    tempMax: number;
    precMin: number;
    precMax: number;
    precMedian: number;
    precProb: number;
    wd: number;
    ws: number;
    gust: number;
};

export type ForecastPeriod = ForecastHour & {
    name: string;
    semanticLabel: string;
    timeOfDay: 'day';
};

type ForecastResponse = {
    forecast24h: {
        timeSeries: ForecastHour[];
    };
    forecast6h: {
        timeSeries: ForecastPeriod[];
    };
};

export const useWeatherForecast = () => {
    const [data, setData] = useState<ForecastResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setLoading(true);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Weather data fetch failed');
                }
                const weatherData = (await response.json()) as ForecastResponse;
                setData(weatherData);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Unknown error'));
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [url]);

    return { data, loading, error };
};
