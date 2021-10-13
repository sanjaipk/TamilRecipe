import React, { Component } from 'react';
import { authProvider } from '../auth/authProvider';

export class FetchData extends Component {
    static displayName = FetchData.name;
    

  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true };
  }

    async componentDidMount() {
        await authProvider.getAccessToken().then(res => this.setState({ token: res.accessToken }));
        this.populateWeatherData();

        
    }

  static renderForecastsTable(forecasts) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map(forecast =>
            <tr key={forecast.date}>
              <td>{forecast.date}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.forecasts);

    return (
      <div>
        <h1 id="tabelLabel" >Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

    async populateWeatherData() {
        const response = await fetch('https://localhost:5001/weatherforecast', {
            headers: !this.state.token ? {} : { 'Authorization': `Bearer ${this.state.token}` }
        });
    //const response = await fetch('weatherforecast');
    const data = await response.json();
    this.setState({ forecasts: data, loading: false });
  }
}
