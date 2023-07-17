export default {
	install(app, options) {
		const person = {
			name: '짐코딩',
			say() {
				alert(this.name);
			},
			...options,
		};
		//person 객체를 어플리케이션 전체에서 사용하고 싶을 때
		app.config.globalProperties.$person = person;

		app.provide('person', person);
	},
};
