import './WeatherCard.css';

import { ForecastHour, ForecastPeriod } from '../../hooks/weather';

export function WeatherCard({ data }: { data: ForecastHour | ForecastPeriod }) {
    return (
        <div class="weather-card">
            {(data as ForecastPeriod).name && <div class="wc-when">{(data as ForecastPeriod).name}</div>}
            <div class="wc-symbol">
                <img
                    src={`/weather-icons/${data.symbol}.svg`}
                    alt={`Weather symbol ${data.symbol}`}
                    class="wc-weather-icon"
                />
            </div>

            <div class="wc-temp">
                {data.tempMax}° / {data.tempMin}°
            </div>
            <div class="wc-wind">
                <img
                    src={`/weather-icons/arrow.svg`}
                    alt={`Wind direction arrow`}
                    style={{ transform: `rotate(${data.wd}deg)` }}
                />
                <div>
                    {data.ws} ({data.gust}) m/s
                </div>
            </div>
            {data.precMax === 0 ? (
                <div class="wc-precipitation">0mm</div>
            ) : (
                <>
                    <div class="wc-precipitation">
                        {data.precMin}mm - {data.precMax}mm
                    </div>
                    <div class="wc-precipitation">({data.precProb}%)</div>
                </>
            )}
        </div>
    );
}
