export default run => [
	{
		path: "/about/:page",
		page: obj => run(import("./pages/About/index.xht"), obj),
	},
	{
		path: "/",
		page: () => run(import("./pages/Home.xht")),
	},
];