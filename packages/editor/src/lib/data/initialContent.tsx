export const initialContent = {
	type: 'doc',
	content: [
	  {
		type: 'heading',
		attrs: { level: 1 },
		content: [{ type: 'text', text: 'Query Block Example' }],
	  },
	  {
		type: 'queryBlock',
		attrs: {
		  label: 'Sample Query Block',
		  sql: `select
	visits.user_id,
	visits.visited_at,
	users.signed_up_at,
	users_ab.variant
  from
	visits
	left join users on visits.user_id = users.user_id
	inner join users_ab on visits.user_id = users_ab.user_id`,
		  language: 'sql',
		  showSql: true,
		},
	  },
	],
  };
  