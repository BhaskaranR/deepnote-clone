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
				"text": "Recent user signups for the past 7 days"
			  }
			]
		  },
		  {
			"type": "sqlSnippet",
			"attrs": {
			  "id": "user-signups",
			  "sql": `SELECT 
    id,
    name,
    email,
    created_at,
    status,
    metadata
FROM 
    users
WHERE 
    created_at >= NOW() - INTERVAL '7 days';`
			,
			  "title": "Recent user signups:",
			  "resultType": "table",
			  "mockData": [
				{
				  id: 1,
				  name: 'John Doe',
				  email: 'john@example.com',
				  created_at: '2024-01-15T10:00:00Z',
				  status: 'active',
				  metadata: { role: 'admin', last_login: '2024-01-14' },
				},
				{
				  id: 2,
				  name: 'Jane Smith',
				  email: 'jane@example.com',
				  created_at: '2024-01-14T15:30:00Z',
				  status: 'pending',
				  metadata: null,
				},
				{
				  id: 3,
				  name: 'Bob Wilson',
				  email: 'bob@example.com',
				  created_at: '2024-01-13T09:15:00Z',
				  status: 'active',
				  metadata: { role: 'user', last_login: '2024-01-12' },
				},
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
		  {
			"type": "paragraph",
			"content": [
			  {
				"type": "text",
				"text": "Page views over the past 14 days"
			  }
			]
		  },
		  {
			"type": "sqlSnippet",
			"attrs": {
			  "id": "page-views-2",
			  "sql":`SELECT
  date_trunc('day', timestamp) as day,
  count(*) as views
  FROM page_views
  WHERE timestamp > now() - interval '14 days'
  GROUP BY day
  ORDER BY day;`
			,
			  "title": "Here are the API usage trends:",
			  "resultType": "table",
			  "mockData": [
				{ name: "2024-01-01", value: 15234 },
				{ name: "2024-01-02", value: 14567 },
				{ name: "2024-01-03", value: 16789 },
				{ name: "2024-01-04", value: 15678 },
				{ name: "2024-01-05", value: 17890 },
				{ name: "2024-01-06", value: 13456 },
				{ name: "2024-01-07", value: 12345 },
				{ name: "2024-01-08", value: 16543 },
				{ name: "2024-01-09", value: 18765 },
				{ name: "2024-01-10", value: 19876 },
				{ name: "2024-01-11", value: 20123 },
				{ name: "2024-01-12", value: 21234 },
				{ name: "2024-01-13", value: 19876 },
				{ name: "2024-01-14", value: 18765 },
			]
			}
		  },

		]
	  }
	  
	};

