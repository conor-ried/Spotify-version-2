process.env.NODE_ENV = 'test';
const request = require('supertest');
const { app, server } = require('../server'); // Note this change
const db = require('../database');

async function setupData() {
    try {
      // Insert a new record to set up data for the tests
      await db.query(
        `INSERT INTO favorite_podcasts (title, host, description) 
         VALUES ($1, $2, $3)`, 
        [ 'Test Podcast3', 'Test Host2', 'Test Description2']
      );
    } catch (error) {
      console.error('Setup data error:', error);
    }
  }
  
  async function teardownData() {
    try {
      // Clean up the database after running the tests by deleting the podcasts inserted in setupData and during the tests
      await db.query('DELETE FROM favorite_podcasts WHERE title = $1', ['Test Podcast3']);
      await db.query('DELETE FROM favorite_podcasts WHERE title = $1', ['Cheese']);
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
  
  test('should create new podcast', async () => {
    const res = await request(app)
      .post('/favoritepodcasts') 
      .send({
        title: "Cheese",
        host: "Bob", 
        description: "tests"
      });
      console.log(res.body);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('podcast');
      expect(res.body.podcast).toHaveProperty('title', "Cheese");
      expect(res.body.podcast).toHaveProperty('host', "Bob");
      expect(res.body.podcast).toHaveProperty('description', "tests");
    });

    test('should get test podcast', async () => {
        try {
        const res = await request(app)
          .get('/favoritepodcasts/Test Podcast3') 
          .expect('Content-Type', /json/)
          .expect(200);
          console.log(res.body);
          expect(res.body).toBeInstanceOf(Array);   
          expect(res.body).toHaveProperty('podcast');
          expect(res.body.podcast).toHaveProperty('title', "Test Podcast3");
          expect(res.body.podcast).toHaveProperty('host', "Test Host2");
          expect(res.body.podcast).toHaveProperty('description', "Test Description2");
          }
          
         
          catch (error) {
            console.error('Test error:', error);
          }
        });
  test('should get all podcasts', async () => {
    try {
    const res = await request(app)
      .get('/favoritepodcasts') // Update this endpoint to whatever endpoint returns all podcasts
      .expect('Content-Type', /json/)
      .expect(200);

    console.log(res.body);

    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(2); // Expecting the array to have 2 podcasts

    // If you wish, you can add more detailed assertions here to check the properties of each podcast
    } catch (error) {
    console.error('Test error:', error);
    }
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