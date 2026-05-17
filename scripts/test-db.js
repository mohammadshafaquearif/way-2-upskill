import pg from 'pg';
import os from 'os';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'way2upskill_db',
  user: process.env.DB_USER || os.userInfo().username,
  password: process.env.DB_PASSWORD || '',
});

async function testDatabase() {
  console.log('🔍 Testing PostgreSQL Database Connection...\n');
  
  try {
    // Test connection
    const client = await pool.connect();
    console.log('✅ Database connection successful!');
    
    // Test queries
    console.log('\n📊 Testing database queries...\n');
    
    // Check tables
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('📋 Available tables:', tablesResult.rows.map(row => row.table_name));
    
    // Check users table
    const usersCount = await client.query('SELECT COUNT(*) FROM users');
    console.log(`👥 Users count: ${usersCount.rows[0].count}`);
    
    // Check courses table
    const coursesCount = await client.query('SELECT COUNT(*) FROM courses');
    console.log(`📚 Courses count: ${coursesCount.rows[0].count}`);
    
    // Check instructors table
    const instructorsCount = await client.query('SELECT COUNT(*) FROM instructors');
    console.log(`👨‍🏫 Instructors count: ${instructorsCount.rows[0].count}`);
    
    // Show sample courses
    const courses = await client.query('SELECT title, price, duration FROM courses LIMIT 3');
    console.log('\n📖 Sample courses:');
    courses.rows.forEach(course => {
      console.log(`  - ${course.title}: $${course.price} (${course.duration})`);
    });
    
    // Show sample instructor
    const instructor = await client.query('SELECT first_name, last_name, email, linkedin FROM instructors LIMIT 1');
    if (instructor.rows.length > 0) {
      console.log('\n👨‍🏫 Sample instructor:');
      console.log(`  - ${instructor.rows[0].first_name} ${instructor.rows[0].last_name}`);
      console.log(`  - Email: ${instructor.rows[0].email}`);
      console.log(`  - LinkedIn: ${instructor.rows[0].linkedin}`);
    }
    
    client.release();
    console.log('\n✅ Database test completed successfully!');
    
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
    console.error('Full error:', error);
  } finally {
    await pool.end();
  }
}

// Run the test
testDatabase();
