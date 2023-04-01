export default (page, dynImport)=>{
	if (!page) return;
	else if (page==='page') dynImport(import('./+page.xht'));
	else if (page==='profile') dynImport(import('./+profile.xht'));
	else if (page==='setting') dynImport(import('./+setting.xht'));
}