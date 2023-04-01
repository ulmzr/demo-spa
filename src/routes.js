export default [
	{
		path: '/about/:page',
		page: import('./pages/About/index.xht'),
	},
	{
		path: '/',
		page: import('./pages/Home.xht'),
	},
	{
		path: '/learn',
		page: import('./pages/Learn.xht'),
	},
	{
		path: '/user/:page',
		page: import('./pages/user/pageIndex.xht'),
	},
];