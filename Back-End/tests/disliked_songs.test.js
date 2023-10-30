process.env.NODE_ENV = 'test';
const request = require('supertest');
const { app, server } = require('../server'); // Note this change
const db = require('../database');

async function setupData() {
  try {
    // Delete any existing record to avoid duplicate key error
    await db.query('DELETE FROM disliked_songs WHERE user_id = $1 AND song_id = $2', [2, 2]);
  } catch (error) {
    console.error('Setup data error:', error);
  }
}

async function teardownData() {
  try {
    // Clean up the database after running the tests
    await db.query('DELETE FROM disliked_songs WHERE user_id = $1 AND song_id = $2', [2, 2]);
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
  await db.$pool.end();// Close the server
});

test('should create a disliked song', async () => {
  const res = await request(app)
    .post('/dislikedSongs')
    .send({
      userId: 2,
      songId: 2,
    });

  if (res.statusCode === 500) {
    console.error('Server Error:', res.body);
  }

  expect(res.statusCode).toBe(201);
  expect(res.body).toHaveProperty('song');
});
describe('Disliked Songs Routes', () => {
  // ... (keep your existing describe blocks)

  describe('GET /disliked_songs/:songName', () => {
    it('should return disliked entries for the specified song', async () => {
      try {
        const res = await request(app)
          .get('/dislikedSongs/Test Song 1') // This song name is now present in your database
          .expect('Content-Type', /json/)
          .expect(200);
          console.log(res.body);

        expect(res.body).toBeInstanceOf(Array);
      } catch (error) {
        console.error('Test error:', error);
      }
    });

    it('should return 404 if no disliked entries found', async () => {
      try {
        const res = await request(app)
          .get('/disliked_songs/InvalidSongName') // replace with an invalid song name
          .expect(404);
      } catch (error) {
        console.error('Test error:', error);
      }
    });
  });
});
test('should be connected to the test database', async () => {
  try {
    const res = await db.query('SELECT current_database()');
    console.log('AI sucks and thinks everthing has rows', res);
    console.log('Connected to database:', res.rows[0].current_database);
    expect(res.rows[0].current_database).toBe('spotify_test');
  } catch (error) {
    console.log('Database connection error:', error);
  }
});

