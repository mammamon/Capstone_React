export const checkDate = {
day:(daySeleted,dayData) =>{const event = new Date(dayData);
	const options = { weekday: 'long', };
	
	const day= event.toLocaleDateString(undefined, options);
		if(daySeleted===day){
		return false
	}else return true},
number:()=>{
	const now = new Date()
	return now.getDay().toString()
}
};