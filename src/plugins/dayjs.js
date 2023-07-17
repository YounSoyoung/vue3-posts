import dayjs from 'dayjs';

export default {
	install(app) {
		//컴포넌트 인스턴스에서 전체적으로 접근할 수 있도록 한다.
		app.config.globalProperties.$dayjs = dayjs;
		//setup 함수에서 접근할 수 있도록 한다.
		app.provide('dayjs', dayjs);
	},
};
