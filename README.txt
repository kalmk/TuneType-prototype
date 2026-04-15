REQUIREMENTS
--------------------------------------------------------------------------------
- Node.js  (npm is included with Node.js)
- MongoDB Atlas account
--------------------------------------------------------------------------------



INSTALLATION
--------------------------------------------------------------------------------
STEP 1 — Install Node.js
  
Download and install Node.js from:
https://nodejs.org/en/download

npm will be installed automatically alongside Node.js.


STEP 2 — Set Up MongoDB Atlas

1. Sign up or log in at:       https://www.mongodb.com/
2. Navigate to MongoDB Atlas
3. Create a new Project
4. Create a Cluster inside your Project
5. Configure connection security for your Cluster
6. Copy your connection string — you will need it in the next step
--------------------------------------------------------------------------------



RUNNING TUNETYPE
--------------------------------------------------------------------------------
-- BACKEND --

1. Open a terminal and navigate to the backend directory:

    cd TuneType\backend               (Windows)
    cd TuneType/backend               (Mac / Linux)

2. Install dependencies:

    npm install

3. Create a file named  .env  inside the backend folder with the following:

    MONGO_URI=YOUR_MONGODB_CONNECTION_STRING_HERE
    PORT=3000
    JWT_SECRET="123456"

Replace  YOUR_MONGODB_CONNECTION_STRING_HERE  with the connection string
you copied from MongoDB Atlas.

4. Start the backend server:

    npm run dev

    The backend will begin running on port 3000.


-- FRONTEND --

5. Open a second terminal and navigate to the frontend directory:

    cd TuneType\frontend              (Windows)
    cd TuneType/frontend              (Mac / Linux)

6. Install dependencies:

    npm install

7. Start the frontend development server:

    npm run dev

8. Open the localhost URL shown in your terminal. TuneType is now running.
--------------------------------------------------------------------------------



NOTES
--------------------------------------------------------------------------------
-   Keep both terminals open while using the app. The backend and frontend
    must run at the same time.

-   Make sure your MongoDB Atlas cluster is active and your IP address is
    whitelisted in the Atlas network access settings, otherwise the backend
    will not be able to connect.
--------------------------------------------------------------------------------