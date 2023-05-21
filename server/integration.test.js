const axios = require('axios');
const { expect } = require('chai');

describe('Playlist API', () => {
    it('should add a new playlist', async () => {
        const requestBody = {
            id: 2,
            name: 'My Playlist tested in integration',
            description: 'This is my favorite playlist'
        };

        try {
            const response = await axios.post('http://localhost:3001/addPlaylist', requestBody);
            expect(response.status).to.equal(200);
            expect(response.data).to.deep.equal(requestBody);
        } catch (error) {
            console.error('Error adding playlist:', error);
        }
    });
});
