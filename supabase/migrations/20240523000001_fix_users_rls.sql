-- Drop existing RLS policies if they exist
DROP POLICY IF EXISTS "Public access" ON users;

-- Create a policy that allows inserting users
CREATE POLICY "Allow inserts for authenticated users" 
ON users FOR INSERT 
WITH CHECK (true);

-- Create a policy that allows selecting users
CREATE POLICY "Allow select for authenticated users" 
ON users FOR SELECT 
USING (true);

-- Create a policy that allows updating users
CREATE POLICY "Allow update for authenticated users" 
ON users FOR UPDATE 
USING (true);

-- Enable realtime for users table
alter publication supabase_realtime add table users;