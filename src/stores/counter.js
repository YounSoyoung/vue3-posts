import { defineStore } from 'pinia';

//defineStore(id값, store에 관련된 옵션)
//store도 컴포저블 함수처럼 use로 시작하는 이름을 짓는 것이 관례이다
//'counter' - store의 고유한 아이디, 뷰 dev tools와 연결하는데 사용된다.
export const useCounterStore = defineStore('counter', {
	state: () => ({
		counter: 1,
	}),
	getters: {
		doubleCount: state => state.counter * 2,
		doubleCountPlueOne() {
			return this.doubleCount + 1;
		},
	},
	actions: {
		increment() {
			this.counter++;
		},
	},
});
