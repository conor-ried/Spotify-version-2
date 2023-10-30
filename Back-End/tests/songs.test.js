process.env.NODE_ENV = 'test';
const request = require('supertest');
const { app, server } = require('../server');
const db = require('../database');

// async function getTokenForTests() {
//     const userCredentials = {
//         username: "testuser100000",
//         password: "password123"
//     };

//     const loginResponse = await request(app)
//         .post('/users/auth/login')
//         .send(userCredentials);
//         console.log("Token response: Line 15", loginResponse.body);

//     return loginResponse.body.token;
// }

// let token;

async function setupData() {
    try {
        await db.query(
            `INSERT INTO songs (song_id,title, artist, duration_seconds, release_year)
             VALUES ($1, $2, $3, $4, $5)`, 
            [5, 'Test Song10', 'Test Artist3', 250, 2023]
        );
    } catch (error) {
        console.error('Setup data error:', error);
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
    await db.$pool.end();
});
async function teardownData() {
    try {
        await db.query('DELETE FROM songs WHERE title = $1', ['Test Song10']);
        await db.query('DELETE FROM songs WHERE title = $1', ['Updated Test Song3']);
        await db.query('DELETE FROM songs WHERE title = $1', ['Test Song5']);
    } catch (error) {
        console.error('Teardown data error:', error);
    }
}


test('should create a new song', async () => {
    const res = await request(app)
        .post('/songs')
        .send({
            title: 'Test Song5',
            artist: 'Test Artist5',
            duration_seconds: 270,
            release_year: 2023
        })
        .expect('Content-Type', /json/)
        .expect(201);
        

    expect(res.body.song.title).toBe('Test Song5');
});

test('should get all songs', async () => {
    const res = await request(app)
        .get('/songs')
        .expect('Content-Type', /json/)
        .expect(200);

    expect(res.body.songs.some(song => song.title === 'Test Song1')).toBeTruthy();
    expect(res.body.songs.some(song => song.title === 'Test Song10')).toBeTruthy();
});

test('should get song by song_id', async () => {
    const res = await request(app)
        .get('/songs/5')
        .expect(200);

    expect(res.body.song.title).toBe('Test Song10');
});

test('should update song by song_id', async () => {
    const res = await request(app)
        .patch('/songs/5')
        .send({
            title: 'Updated Test Song3'
        })
        .expect(200);

    expect(res.body.song.title).toBe('Updated Test Song3');
});

test('should delete song by song_id', async () => {
    const res = await request(app)
        .delete('/songs/5')
        .expect('Content-Type', /json/)
        .expect(200);

    expect(res.body.deleted).toBe('5');
});