import axios from 'axios';
import { isRef, ref, unref, watchEffect } from 'vue';

//defaults 속성에 설정하면 전체적으로 적용된다.
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

//get 메소드를 default로 설정
const defaultConfig = {
	method: 'get',
};

const defaultOptions = {
	immediate: true,
};

//config 객체는 구조분해할당을 할 것이기 때문에
//undefined로 넘어왔을 때는 값을 빈 객체로 선언한다. -> config = {}
//이렇게 해야 에러가 안난다.
//파라미터로 콜백 함수를 받는다. -> options
export const useAxios = (url, config = {}, options = {}) => {
	const response = ref(null);
	const data = ref(null);
	const error = ref(null);
	const loading = ref(false);

	//options이라는 객체 안에 onSuccess, onError 함수를 받는다.
	//onSuccess - 성공했을 때 실행할 콜백함수, onSuccess - 실패했을 때 실행할 함수
	//{ ...defaultOptions, ...options }; - default로 immediate가 ture였다가 options에서 false가 오면 최종적으로 false가 된다.
	const { onSuccess, onError, immediate } = { ...defaultOptions, ...options };

	const { params } = config;
	const execute = body => {
		data.value = null;
		error.value = null;
		loading.value = true;
		//axios(config) 또는 axios(url, config)
		//unref() : 매핑을 해제한다.
		axios(url, {
			...defaultConfig,
			...config,
			params: unref(params),
			data: typeof body === 'object' ? body : {},
		})
			.then(res => {
				response.value = res;
				console.log('response.value: ', response.value);
				data.value = res.data;
				if (onSuccess) {
					onSuccess(res);
				}
			})
			.catch(err => {
				error.value = err;
				if (onError) {
					onError(err);
				}
			})
			.finally(() => {
				loading.value = false;
			});
	};

	//isRef 함수로 정의한 함수라면, watchEffect()로 실행하고
	//일반 변수라면 execut() 함수를 한번만 호출
	if (isRef(params)) {
		watchEffect(execute);
	} else {
		//immediate이 true일 때 즉시 실행하고 false일 때는 실행 X
		if (immediate) {
			execute();
		}
	}

	return {
		response,
		data,
		error,
		loading,
		execute,
	};
};

//return{} 안에 있는 데이터들은 반응형으로 연결돼있기 때문에
//나중에 data.value = res.data;처럼 데이터를 삽입해도 해당 UI에서 감지해서 변경된다
// -> async, await을 넣지 않은 이유
