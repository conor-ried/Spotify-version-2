process.env.NODE_ENV = 'test';
const request = require('supertest');
const { app, server } = require('../server');
const db = require('../database');


async function setupData() {
    try {
        await db.query(
            `INSERT INTO users (user_id, username,  password, first_name, last_name, email, is_admin)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`, 
            [5, 'Test Song10', 'Test Artist3', 'lama', 'arecool', 'coasd@aol.com', true]
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
        await db.query('DELETE FROM users WHERE username = $1', ['Test Song10']);
        await db.query('DELETE FROM users WHERE username = $1', ['newuser']);
        await db.query('DELETE FROM users WHERE username = $1', ['UpdatedFirst']);    
        await db.query('DELETE FROM users WHERE username = $1', ['dummyuser']);          
    } catch (error) {
        console.error('Teardown data error:', error);
    }
}


describe("User Routes", () => {
  
    test("Can create a new user", async () => {
      const resp = await request(app)
        .post("/users")
        .send({
          username: "newuser",
          password: "newpass",
          first_name: "New",
          last_name: "User",
          email: "newuser@example.com",
          is_admin: false
        });

  
      expect(resp.statusCode).toBe(201);
      expect(resp.body.user.username).toEqual("newuser");
    });
  
    test("Can't create a user without first_name", async () => {
      const resp = await request(app)
        .post("/users")
        .send({
          username: "newuser",
          password: "newpass",
          last_name: "User",
          email: "newuser@example.com"
        });
        console.log('Line 70', resp.statusCode);
  
      expect(resp.statusCode).toBe(500);
    });
  
    test("Can fetch all users", async () => {
      const resp = await request(app).get("/users");
      expect(resp.statusCode).toBe(200);
      expect(resp.body.users.length).toBeGreaterThanOrEqual(5); // Adjust based on your actual data
    });
  
    test("Can fetch a specific user", async () => {
      const resp = await request(app).get("/users/testuser1");
      expect(resp.statusCode).toBe(200);
      expect(resp.body.user.username).toEqual("testuser1");
    });
  
    test("Get error when fetching non-existent user", async () => {
      const resp = await request(app).get("/users/nonexistentuser");
      expect(resp.statusCode).toBe(404);
    });
  
    test("Can update a specific user", async () => {
      const resp = await request(app)
        .patch("/users/Test Song10")
        .send({
          first_name: "UpdatedFirst"
        });
  
      expect(resp.statusCode).toBe(200);
      expect(resp.body.user.first_name).toEqual("UpdatedFirst");
    });
  
    test("Can delete a user", async () => {
      // First add a dummy user
      await request(app)
        .post("/users")
        .send({
          username: "dummyuser",
          password: "dummypass",
          first_name: "Dummy",
          last_name: "User",
          email: "dummyuser@example.com",
          is_admin: false
        });
      
      // Now, delete the dummy user
      const resp = await request(app).delete("/dummyuser");
      expect(resp.statusCode).toBe(200);
      expect(resp.body).toEqual({ deleted: "dummyuser" });
    });
  
  });