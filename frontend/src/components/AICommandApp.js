import React, { useState } from 'react';
import axios from 'axios';

const AICommandApp = () => {
    const [command, setCommand] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendCommand = async () => {
        if (!command.trim()) return;
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/command', { command });
            setResponse(res.data.response);
        } catch (error) {
            setResponse('Error: Unable to fetch response');
        }
        setLoading(false);
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial' }}>
            <h1>AI Command Bot</h1>
            <textarea 
                rows="4" 
                cols="50" 
                placeholder="Enter your command..."
                value={command}
                onChange={(e) => setCommand(e.target.value)}
            />
            <br />
            <button onClick={handleSendCommand} disabled={loading}>
                {loading ? 'Processing...' : 'Send Command'}
            </button>
            <h2>Response:</h2>
            <p>{response}</p>
        </div>
    );
};

export default AICommandApp;
