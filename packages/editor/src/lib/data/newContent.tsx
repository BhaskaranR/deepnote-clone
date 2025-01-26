import { SqlSnippet } from "@deepnote-clone/ui/sql-snippet";
// export const demoQueries = [
// 	{
// 		label: "User Growth Over Time",
// 		messages: [
// 			{
// 				id: "1",
// 				role: "user" as const,
// 				content: "Show me user signups over the past 12 months",
// 				createdAt: new Date(),
// 			},
// 			{
// 				id: "2",
// 				role: "assistant" as const,
// 				content: "Here is a chart showing user growth by month:",
// 				createdAt: new Date(),
// 				render: (
// 					<SqlSnippet
// 						id="user-growth"
// 						title="Monthly User Signups"
// 						resultType="chart"
// 						sql={`SELECT
//   date_trunc('month', created_at) as month,
//   count(*) as new_users
//   FROM users
//   GROUP BY month
//   ORDER BY month
//   LIMIT 12;`}
// 						mockData={[
// 							{ name: "Jan 2023", value: 245 },
// 							{ name: "Feb 2023", value: 312 },
// 							{ name: "Mar 2023", value: 287 },
// 							{ name: "Apr 2023", value: 401 },
// 							{ name: "May 2023", value: 352 },
// 							{ name: "Jun 2023", value: 489 },
// 							{ name: "Jul 2023", value: 567 },
// 							{ name: "Aug 2023", value: 623 },
// 							{ name: "Sep 2023", value: 712 },
// 							{ name: "Oct 2023", value: 812 },
// 							{ name: "Nov 2023", value: 934 },
// 							{ name: "Dec 2023", value: 1023 },
// 						]}
// 					/>
// 				),
// 			},
// 		],
// 	},
// 	{
// 		label: "Latest Products",
// 		messages: [
// 			{
// 				id: "23",
// 				role: "user" as const,
// 				content: "Show me our latest products",
// 				createdAt: new Date(),
// 			},
// 			{
// 				id: "24",
// 				role: "assistant" as const,
// 				content: "Here are the 5 most recently added products:",
// 				createdAt: new Date(),
// 				render: (
// 					<SqlSnippet
// 						id="latest-products"
// 						title="Latest Products"
// 						sql={`SELECT
//   product_id,
//   name,
//   price,
//   category,
//   created_at,
//   stock_level
//   FROM products
//   ORDER BY created_at DESC
//   LIMIT 5;`}
// 						mockData={{
// 							rows: [
// 								{
// 									product_id: "PROD-001",
// 									name: "Wireless Earbuds Pro",
// 									price: 199.99,
// 									category: "Electronics",
// 									created_at: "2024-01-15T16:30:00Z",
// 									stock_level: 45,
// 								},
// 								{
// 									product_id: "PROD-002",
// 									name: "Smart Home Hub",
// 									price: 299.99,
// 									category: "Smart Home",
// 									created_at: "2024-01-15T15:45:00Z",
// 									stock_level: 32,
// 								},
// 								{
// 									product_id: "PROD-003",
// 									name: "Fitness Tracker Elite",
// 									price: 149.99,
// 									category: "Wearables",
// 									created_at: "2024-01-15T14:20:00Z",
// 									stock_level: 78,
// 								},
// 							],
// 						}}
// 					/>
// 				),
// 			},
// 		],
// 	},
// 	{
// 		label: "Create Function",
// 		messages: [
// 			{
// 				id: "19",
// 				role: "user" as const,
// 				content: "Help me create a function to calculate user points",
// 				createdAt: new Date(),
// 			},
// 			{
// 				id: "20",
// 				role: "assistant" as const,
// 				content:
// 					"Here's a Postgres function that calculates user points based on their activity:",
// 				createdAt: new Date(),
// 				render: (
// 					<SqlSnippet
// 						id="create-function"
// 						title="Create User Points Function"
// 						sql={`CREATE OR REPLACE FUNCTION calculate_user_points(user_id UUID)
//   RETURNS INTEGER AS $$
//   DECLARE
//     total_points INTEGER;
//   BEGIN
//     SELECT 
//       COALESCE(
//         (SELECT COUNT(*) * 10 FROM posts WHERE author_id = user_id) + -- 10 points per post
//         (SELECT COUNT(*) * 5 FROM comments WHERE user_id = user_id) + -- 5 points per comment
//         (SELECT COUNT(*) * 2 FROM post_likes WHERE user_id = user_id), -- 2 points per like
//         0
//       ) INTO total_points;
      
//     RETURN total_points;
//   END;
//   $$ LANGUAGE plpgsql;`}
// 					/>
// 				),
// 			},
// 		],
// 	},
// 	{
// 		label: "RLS Policy",
// 		messages: [
// 			{
// 				id: "21",
// 				role: "user" as const,
// 				content: "Show me how to create an RLS policy for a team members table",
// 				createdAt: new Date(),
// 			},
// 			{
// 				id: "22",
// 				role: "assistant" as const,
// 				content:
// 					"Here's an RLS policy that allows team members to only see other members in their team:",
// 				createdAt: new Date(),
// 				render: (
// 					<SqlSnippet
// 						id="rls-policy"
// 						title="Team Members RLS Policy"
// 						sql={`-- Enable RLS on the table
//   ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
  
//   -- Create policy for viewing team members
//   CREATE POLICY view_team_members ON team_members
//   FOR SELECT
//   USING (
//     team_id IN (
//       -- User can see members of teams they belong to
//       SELECT team_id 
//       FROM team_members 
//       WHERE user_id = auth.uid()
//     )
//     OR 
//     -- Team admins can see all members
//     EXISTS (
//       SELECT 1 
//       FROM team_admins 
//       WHERE user_id = auth.uid() 
//       AND team_id = team_members.team_id
//     )
//   );`}
// 					/>
// 				),
// 			},
// 		],
// 	},
// 	{
// 		label: "SQL to Supabase-js",
// 		messages: [
// 			{
// 				id: "23",
// 				role: "user" as const,
// 				content: "How do I query all projects?",
// 				createdAt: new Date(),
// 			},
// 			{
// 				id: "24",
// 				role: "assistant" as const,
// 				content: "Here's the SQL query to get all projects:",
// 				createdAt: new Date(),
// 				render: (
// 					<SqlSnippet
// 						id="projects-sql"
// 						title="Get All Projects SQL"
// 						sql={`SELECT 
//     p.id,
//     p.name,
//     p.description,
//     p.created_at,
//     u.email as owner_email
//   FROM projects p
//   JOIN users u ON p.owner_id = u.id
//   WHERE p.is_active = true
//   ORDER BY p.created_at DESC;`}
// 						mockData={{
// 							rows: [
// 								{
// 									id: 1,
// 									name: "Project A",
// 									description: "First project",
// 									created_at: "2024-01-15T10:00:00Z",
// 									owner_email: "user@example.com",
// 								},
// 								{
// 									id: 2,
// 									name: "Project B",
// 									description: "Second project",
// 									created_at: "2024-01-14T10:00:00Z",
// 									owner_email: "user2@example.com",
// 								},
// 							],
// 						}}
// 					/>
// 				),
// 			},
// 			{
// 				id: "25",
// 				role: "user" as const,
// 				content: "Can you show me how to do this with the Supabase client?",
// 				createdAt: new Date(),
// 			},
// 			{
// 				id: "26",
// 				role: "assistant" as const,
// 				content:
// 					"Here's how to perform the same query using the Supabase JavaScript client:",
// 				createdAt: new Date(),
// 				render: (
// 					<SqlSnippet
// 						id="projects-js"
// 						title="Get All Projects with Supabase Client"
// 						sql={`const { data: projects, error } = await supabase
//     .from('projects')
//     .select(\`
//       id,
//       name,
//       description,
//       created_at,
//       owner_id (
//         email
//       )
//     \`)
//     .eq('is_active', true)
//     .order('created_at', { ascending: false })`}
// 					/>
// 				),
// 			},
// 		],
// 	},
// 	{
// 		label: "Recent Orders",
// 		messages: [
// 			{
// 				id: "3",
// 				role: "user" as const,
// 				content: "Show me the most recent orders",
// 				createdAt: new Date(),
// 			},
// 			{
// 				id: "4",
// 				role: "assistant" as const,
// 				content: "Here are the 5 most recent orders:",
// 				createdAt: new Date(),
// 				render: (
// 					<SqlSnippet
// 						id="recent-orders"
// 						title="Recent Orders"
// 						sql={
// 	`SELECT
//   order_id,
//   customer_name,
//   amount,
//   status,
//   created_at
//   FROM orders
//   ORDER BY created_at DESC
//   LIMIT 5;`}
// 						mockData={{
// 							rows: [
// 								{
// 									order_id: "ORD-001",
// 									customer_name: "John Smith",
// 									amount: 299.99,
// 									status: "processing",
// 									created_at: "2024-01-15T14:22:31Z",
// 								},
// 								{
// 									order_id: "ORD-002",
// 									customer_name: "Sarah Johnson",
// 									amount: 149.5,
// 									status: "shipped",
// 									created_at: "2024-01-15T13:45:12Z",
// 								},
// 								{
// 									order_id: "ORD-003",
// 									customer_name: "Mike Wilson",
// 									amount: 499.99,
// 									status: "completed",
// 									created_at: "2024-01-15T12:30:45Z",
// 								},
// 							],
// 						}}
// 					/>
// 				),
// 			},
// 		],
// 	},
// 	{
// 		label: "Revenue by Category",
// 		messages: [
// 			{
// 				id: "5",
// 				role: "user" as const,
// 				content: "What are our top performing product categories?",
// 				createdAt: new Date(),
// 			},
// 			{
// 				id: "6",
// 				role: "assistant" as const,
// 				content: "Here is the revenue breakdown by product category:",
// 				createdAt: new Date(),
// 				render: (
// 					<SqlSnippet
// 						id="category-revenue"
// 						title="Revenue by Category"
// 						resultType="chart"
// 						sql={`SELECT
//   category_name,
//   sum(order_amount) as revenue
//   FROM orders o
//   JOIN products p ON o.product_id = p.id
//   GROUP BY category_name
//   ORDER BY revenue DESC;`}
// 						mockData={[
// 							{ name: "Electronics", value: 125000 },
// 							{ name: "Clothing", value: 98000 },
// 							{ name: "Home & Garden", value: 87000 },
// 							{ name: "Sports", value: 76000 },
// 							{ name: "Books", value: 65000 },
// 							{ name: "Toys", value: 54000 },
// 							{ name: "Beauty", value: 43000 },
// 							{ name: "Automotive", value: 32000 },
// 							{ name: "Food", value: 21000 },
// 							{ name: "Art", value: 15000 },
// 						]}
// 					/>
// 				),
// 			},
// 		],
// 	},
// 	{
// 		label: "Active Users",
// 		messages: [
// 			{
// 				id: "7",
// 				role: "user" as const,
// 				content: "Show me our currently active users",
// 				createdAt: new Date(),
// 			},
// 			{
// 				id: "8",
// 				role: "assistant" as const,
// 				content: "Here are the currently active users:",
// 				createdAt: new Date(),
// 				render: (
// 					<SqlSnippet
// 						id="active-users"
// 						title="Active Users"
// 						sql={`SELECT
//   username,
//   last_login,
//   session_count
//   FROM users
//   WHERE last_active > now() - interval '24 hours'
//   ORDER BY last_login DESC;`}
// 						mockData={{
// 							rows: [
// 								{
// 									username: "alice_smith",
// 									last_login: "2024-01-15T15:30:00Z",
// 									session_count: 45,
// 								},
// 								{
// 									username: "bob_jones",
// 									last_login: "2024-01-15T15:15:00Z",
// 									session_count: 32,
// 								},
// 								{
// 									username: "carol_white",
// 									last_login: "2024-01-15T14:45:00Z",
// 									session_count: 28,
// 								},
// 							],
// 						}}
// 					/>
// 				),
// 			},
// 		],
// 	},

// 	{
// 		label: "Daily Page Views",
// 		messages: [
// 			{
// 				id: "11",
// 				role: "user" as const,
// 				content: "Show me daily page views for the last 2 weeks",
// 				createdAt: new Date(),
// 			},
// 			{
// 				id: "12",
// 				role: "assistant" as const,
// 				content: "Here are the daily page views:",
// 				createdAt: new Date(),
// 				render: (
// 					<SqlSnippet
// 						id="page-views"
// 						title="Daily Page Views"
// 						resultType="chart"
// 						sql={`SELECT
//   date_trunc('day', timestamp) as day,
//   count(*) as views
//   FROM page_views
//   WHERE timestamp > now() - interval '14 days'
//   GROUP BY day
//   ORDER BY day;`}
// 						mockData={[
// 							{ name: "2024-01-01", value: 15234 },
// 							{ name: "2024-01-02", value: 14567 },
// 							{ name: "2024-01-03", value: 16789 },
// 							{ name: "2024-01-04", value: 15678 },
// 							{ name: "2024-01-05", value: 17890 },
// 							{ name: "2024-01-06", value: 13456 },
// 							{ name: "2024-01-07", value: 12345 },
// 							{ name: "2024-01-08", value: 16543 },
// 							{ name: "2024-01-09", value: 18765 },
// 							{ name: "2024-01-10", value: 19876 },
// 							{ name: "2024-01-11", value: 20123 },
// 							{ name: "2024-01-12", value: 21234 },
// 							{ name: "2024-01-13", value: 19876 },
// 							{ name: "2024-01-14", value: 18765 },
// 						]}
// 					/>
// 				),
// 			},
// 		],
// 	},
// 	{
// 		label: "Error Distribution",
// 		messages: [
// 			{
// 				id: "1",
// 				role: "user" as const,
// 				content: "Show me the distribution of error types",
// 				createdAt: new Date(),
// 			},
// 			{
// 				id: "15",
// 				role: "assistant" as const,
// 				content: "Here is the distribution of error types:",
// 				createdAt: new Date(),
// 				render: (
// 					<SqlSnippet
// 						id="error-distribution"
// 						title="Error Distribution"
// 						resultType="chart"
// 						sql={`SELECT
//   error_type,
//   count(*) as error_count
//   FROM error_logs
//   GROUP BY error_type
//   ORDER BY error_count DESC;`}
// 						mockData={[
// 							{ name: "404 Not Found", value: 1234 },
// 							{ name: "500 Server Error", value: 567 },
// 							{ name: "403 Forbidden", value: 456 },
// 							{ name: "Rate Limit Exceeded", value: 345 },
// 							{ name: "Database Timeout", value: 234 },
// 							{ name: "Authentication Failed", value: 123 },
// 							{ name: "Invalid Input", value: 98 },
// 							{ name: "Network Error", value: 87 },
// 							{ name: "API Error", value: 76 },
// 							{ name: "Other", value: 45 },
// 						]}
// 					/>
// 				),
// 			},
// 		],
// 	},
// 	{
// 		label: "API Usage Trends",
// 		messages: [
// 			{
// 				id: "17",
// 				role: "user" as const,
// 				content: "Show me API usage trends over time",
// 				createdAt: new Date(),
// 			},
// 			{
// 				id: "18",
// 				role: "assistant" as const,
// 				content: "Here are the API usage trends:",
// 				createdAt: new Date(),
// 				render: (
// 					<SqlSnippet
// 						id="api-usage"
// 						title="API Usage Trends"
// 						resultType="chart"
// 						sql={`SELECT
//   date_trunc('hour', timestamp) as hour,
//   count(*) as request_count
//   FROM api_logs
//   WHERE timestamp > now() - interval '24 hours'
//   GROUP BY hour
//   ORDER BY hour;`}
// 						mockData={[
// 							{ name: "00:00", value: 1200 },
// 							{ name: "02:00", value: 800 },
// 							{ name: "04:00", value: 600 },
// 							{ name: "06:00", value: 900 },
// 							{ name: "08:00", value: 2500 },
// 							{ name: "10:00", value: 3500 },
// 							{ name: "12:00", value: 4000 },
// 							{ name: "14:00", value: 3800 },
// 							{ name: "16:00", value: 3200 },
// 							{ name: "18:00", value: 2800 },
// 							{ name: "20:00", value: 2000 },
// 							{ name: "22:00", value: 1500 },
// 						]}
// 					/>
// 				),
// 			},
// 		],
// 	},
// ];

export const transformDemoQueriesToTiptapContent = () => {
	return {
		"type": "doc",
		"content": [
			{
				"type": "heading",
				"attrs": {
					"level": 2
				  },
				"content": [
				  {
					"type": "text",
					"text": "Sample Dashboard"
				  }
				]
			  },
			 
		  {
			"type": "paragraph",
			"content": [
			  {
				"type": "text",
				"text": "Show me API usage trends over the past 24 hours"
			  }
			]
		  },
		 
		 
		  {
			"type": "sqlSnippet",
			"attrs": {
			  "id": "usage-trends",
			  "sql": 	  `SELECT
			  date_trunc('hour', timestamp) as hour,
			  count(*) as request_count
			  FROM api_logs
			  WHERE timestamp > now() - interval '24 hours'
			  GROUP BY hour
			  ORDER BY hour;`
			,
			  "title": "Here are the API usage trends:",
			  "resultType": "table",
			  "mockData": [
				{ "name": "00:00", "value": 1200 },
				{ "name": "02:00", "value": 800 },
				{ "name": "04:00", "value": 600 },
				{ "name": "06:00", "value": 900 },
				{ "name": "08:00", "value": 2500 },
				{ "name": "10:00", "value": 3500 },
				{ "name": "12:00", "value": 4000 },
				{ "name": "14:00", "value": 3800 },
				{ "name": "16:00", "value": 3200 },
				{ "name": "18:00", "value": 2800 },
				{ "name": "20:00", "value": 2000 },
				{ "name": "22:00", "value": 1500 },
			  ]
			}
		  },
		  {
			"type": "paragraph",
			"content": [
			  {
				"type": "text",
				"text": "Here is a chart showing user growth by month:"
			  }
			]
		  },
		  {
			"type": "sqlSnippet",
			"attrs": {
			  "id": "user-growth",
			  "sql": "SELECT\ndate_trunc('month', created_at) as month,\ncount(*) as new_users\nFROM users\nGROUP BY month\nORDER BY month\nLIMIT 12;",
			  "title": "Monthly User Signups",
			  "resultType": "chart",
			  "mockData": [
				{ "name": "Jan 2023", "value": 245 },
				{ "name": "Feb 2023", "value": 312 },
				{ "name": "Mar 2023", "value": 280 },
				{ "name": "Apr 2023", "value": 320 },
				{ "name": "May 2023", "value": 350 },
				{ "name": "Jun 2023", "value": 380 },
				{ "name": "Jul 2023", "value": 400 },
				{ "name": "Aug 2023", "value": 420 },
				{ "name": "Sep 2023", "value": 450 },
				{ "name": "Oct 2023", "value": 480 },
				{ "name": "Nov 2023", "value": 500 },
				{ "name": "Dec 2023", "value": 520 },
			  ]
			}
		  },

		]
	  }
	  
	};