import { computed, unref } from 'vue';

//number - composable 함수에게 받은 파라미터
//받은 값이 반응형이기 때문에 unref()를 해준다
export const useNumber = number => {
	const isOdd = computed(() => unref(number) % 2 === 1);
	const isEven = computed(() => !isOdd.value);

	return {
		isOdd,
		isEven,
	};
};
