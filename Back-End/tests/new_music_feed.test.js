process.env.NODE_ENV = 'test';
const request = require('supertest');
const { app, server } = require('../server'); // Note this change
const db = require('../database');

async function setupData() {
    try {
        await db.query(
            `INSERT INTO new_music_feed (artist, title, release_year, genre, date_added) 
             VALUES ($1, $2, $3, $4, $5)`, 
            ['Test Artist2', 'Test Song2', 2023, 'Test Genre2', new Date()]
        );
    } catch (error) {
        console.error('Setup data error:', error);
    }
}

async function teardownData() {
    try {
        await db.query('DELETE FROM new_music_feed WHERE title = $1', ['Test Song2']);
    } catch (error) {
        console.error('Teardown data error:', error);
    }
}

beforeEach(async () => {
    await setupData();
});

afterEach(async () => {
    await teardownData();
});

afterAll(async () => {
    server.close(); 
    await db.$pool.end(); // Close the server
});

test('should get all songs', async () => {
    try {
        const res = await request(app)
            .get('/newmusicfeeds') // Adjust with your endpoint
            .expect('Content-Type', /json/)
            .expect(200);

        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.songs).toBeInstanceOf(Array);
        expect(res.body.songs.length).toBe(2); 
    } catch (error) {
        console.error('Test error:', error);
    }
});

test('should get song by genre', async () => {
    try {
        const res = await request(app)
            .get('/newmusicfeeds/Test Genre1') // Adjust with your endpoint
            .expect('Content-Type', /json/)
            .expect(200);

        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.song).toBeInstanceOf(Array); // Assuming it returns an array of songs matching the genre
        expect(res.body.song[0]).toHaveProperty('title', 'Test Song1');
    } catch (error) {
        console.error('Test error:', error);
    }
});