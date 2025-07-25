import { useEffect, useRef, useState } from 'preact/hooks';

import './style.css';

import { capitalizeFirstLetter } from '../../utils/capitalize';
import { useWeatherForecast } from '../../hooks/weather';
import { SlimWeatherCard } from '../../components/slim-weather-card/SlimWeatherCard';
import { WeatherCard } from '../../components/weather-card/WeatherCard';
import { RouteLink, Stations, useBusDeparture } from '../../hooks/bus';
import { useTrash } from '../../hooks/trash';

export function Dash() {
    const [time, setTime] = useState(new Date());
    const intervalRef = useRef<NodeJS.Timeout>();
    const { data: forecast, loading: isForecastLoading, error: forecastError } = useWeatherForecast();
    const { data: gessieByData, loading: isGessieByLoading, error: gessieByError } = useBusDeparture(Stations.GessieBy);
    const { data: stamhemData, loading: isStamhemLoading, error: stamhemError } = useBusDeparture(Stations.Stamhem);
    const { data: trashData } = useTrash();

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return (
        <div class="dash">
            <section class="border">
                <div class="dash-row">
                    <>
                        <div>
                            <div class="weekday">
                                {capitalizeFirstLetter(time.toLocaleDateString('sv-SE', { weekday: 'long' }))}{' '}
                                {capitalizeFirstLetter(
                                    time.toLocaleDateString('sv-SE', { month: 'long', day: 'numeric' }),
                                )}
                            </div>
                            {capitalizeFirstLetter(
                                time.toLocaleTimeString('sv-SE', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                }),
                            )}
                        </div>
                    </>
                    {isForecastLoading && <span>Loading weather...</span>}
                    {forecastError && <span>Error loading weather: {forecastError.message}</span>}
                    {forecast && (
                        <div class="forecast">
                            <div class="forecast-24h">
                                <div class="forecast-cards">
                                    <SlimWeatherCard data={forecast.forecast24h.timeSeries[0]} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
            <section class="border">
                <div class="weather">
                    {isForecastLoading && <span>Loading weather...</span>}
                    {forecastError && <span>Error loading weather: {forecastError.message}</span>}
                    {forecast && (
                        <div class="forecast">
                            <div class="forecast-24h">
                                <div class="forecast-cards">
                                    <WeatherCard data={forecast.forecast6h.timeSeries[0]} />
                                    <WeatherCard data={forecast.forecast6h.timeSeries[1]} />
                                    <WeatherCard data={forecast.forecast6h.timeSeries[2]} />
                                    <WeatherCard data={forecast.forecast6h.timeSeries[3]} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
            <section class="border">
                {(isGessieByLoading || isStamhemLoading) && !gessieByData && <span>Loading bus...</span>}
                {(gessieByError || stamhemError) && <span>Error loading bus: {gessieByError.message}</span>}
                {gessieByData && stamhemData && (
                    <div class="bus">
                        <div class="bus-table">
                            <div class="bus-table-header">Busslinje</div>
                            <div class="bus-table-header">
                                {isGessieByLoading ? <span>Loading...</span> : 'Gessie by'}
                            </div>
                            <div class="bus-table-header">{isStamhemLoading ? <span>Loading...</span> : 'Stamhem'}</div>
                            {gessieByData.journeys.slice(0, 5).map((_, i) => {
                                const gessieByRoute = gessieByData.journeys[i].routeLinks[0];
                                // sök rätt!
                                const stamhemRoute = stamhemData.journeys[i].routeLinks.find(
                                    (route) => route.id === gessieByRoute.id,
                                );

                                const getBusTime = (route: RouteLink | undefined) => {
                                    const deviation = route?.from.deviation || 0;
                                    return (
                                        <>
                                            <span class={deviation !== 0 ? 'bus-time bus-deviation' : 'bus-time'}>
                                                {route ? formatTime(route?.from.time) : null}
                                            </span>
                                            {deviation !== 0 && <span>{formatTime(route?.from.time, deviation)}</span>}
                                        </>
                                    );
                                };

                                return (
                                    <>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div>{gessieByRoute.line.no}</div>{' '}
                                            {[...Array(gessieByData.journeys[i].noOfChanges + 1)].map(() => (
                                                <img src="/bus.svg" alt="Bus icon" class="bus-icon" />
                                            ))}
                                        </div>
                                        <div>{getBusTime(gessieByRoute)}</div>
                                        <div>{getBusTime(stamhemRoute)}</div>
                                    </>
                                );
                            })}
                        </div>
                    </div>
                )}
            </section>
            <section class="border">
                <div class="trash-row">
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src="/trash1.svg" alt="Trash icon" class="trash-icon" />
                            <div>{trashData ? trashData.one : 'Loading...'}</div>
                        </div>
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src="/trash2.svg" alt="Trash icon" class="trash-icon" />{' '}
                            <div>{trashData ? trashData.two : 'Loading...'}</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function formatTime(dateTime: string, deviation: number = 0): string {
    const date = new Date(dateTime);
    date.setMinutes(date.getMinutes() + deviation);

    return date.toLocaleTimeString('sv-SE', {
        hour: '2-digit',
        minute: '2-digit',
    });
}
