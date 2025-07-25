import { ForecastHour } from '../../hooks/weather';
import './SlimWeatherCard.css';

export function SlimWeatherCard({ data }: { data: ForecastHour }) {
    return (
        <div class="slim-weather-card">
            <div class="swc-dash-row">
                <div class="swc-symbol">
                    <img
                        src={`/weather-icons/${data.symbol}.svg`}
                        alt={`Weather symbol ${data.symbol}`}
                        class="swc-weather-icon"
                    />
                </div>

                <div class="swc-temp">{data.tempMin}°</div>
            </div>

            {data.precMax === 0 ? (
                <div class="swc-precipitation">0mm</div>
            ) : (
                <>
                    <div class="swc-precipitation">
                        {data.precMin}mm - {data.precMax}mm
                    </div>
                </>
            )}
        </div>
    );
}
