process.env.NODE_ENV = 'test';
const request = require('supertest');
const { app, server } = require('../server');
const db = require('../database');

async function setupData() {
    try {
        await db.query(
            `INSERT INTO playlists (title, user_id) 
             VALUES ($1, $2)`, 
            ['Test Playlist3', 1]
        );
    } catch (error) {
        console.error('Setup data error:', error);
    }
}

async function teardownData() {
    try {
        await db.query('DELETE FROM playlists WHERE title = $1', ['Test Playlist3']);
        await db.query('DELETE FROM playlists WHERE title = $1', ['Test Playlist4']);
        await db.query('DELETE FROM playlists WHERE title = $1', ['Updated Test Playlist']);
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
    await db.$pool.end();
});

test('should create a new playlist', async () => {
    const res = await request(app)
        .post('/playlists')
        .send({ title: 'Test Playlist4', user_id: 2 })
        .expect('Content-Type', /json/)
        .expect(201);

    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.playlist.title).toBe('Test Playlist4');
});

test('should get all playlists', async () => {
    const res = await request(app)
        .get('/playlists')
        .expect('Content-Type', /json/)
        .expect(200);

    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.playlists).toBeInstanceOf(Array);
    console.log('Line 60', res.body.playlists);
    expect(res.body.playlists.some(p => p.playlist_title === 'Test Playlist1')).toBeTruthy();
});

test('should get playlist by title', async () => {
    const res = await request(app)
        .get('/playlists/Test Playlist1')
        .expect('Content-Type', /json/)
        .expect(200);

    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.playlist.playlist_title).toBe('Test Playlist1');
});

test('should update playlist by title', async () => {
    const res = await request(app)
        .patch('/playlists/Test Playlist3')
        .send({ title: 'Updated Test Playlist', user_id: 3 })
        .expect('Content-Type', /json/)
        .expect(200);

    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.playlist.title).toBe('Updated Test Playlist');
});

test('should delete playlist by title', async () => {
    const res = await request(app)
        .delete('/playlists/Updated Test Playlist')
        .expect('Content-Type', /json/)
        .expect(200);

    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.deleted).toBe('Updated Test Playlist');
});