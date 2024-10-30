import React from 'react';

class DbDownload extends React.Component {
    constructor(props) {
        super(props);
        this.downloadData = this.downloadData.bind(this);
    }

    async downloadData() {
        try {
            // Fetch data from the API endpoint
            const response = await fetch({ baseUrl: `${process.env.REACT_APP_API_URL}download-data` });
            const blob = await response.blob();
            console.log(response)
            // Create a temporary anchor element to trigger the download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'data.json'; // Filename for the downloaded file
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading data:', error);
        }
    }

    render() {
        return (
            <button onClick={this.downloadData}>Download Data</button>
        );
    }
}

export default DbDownload;
