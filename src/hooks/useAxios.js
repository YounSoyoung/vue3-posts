import axios from 'axios';
import { isRef, ref, unref, watchEffect } from 'vue';

//defaults 속성에 설정하면 전체적으로 적용된다.
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

//get 메소드를 default로 설정
const defaultConfig = {
	method: 'get',
};

//config 객체는 구조분해할당을 할 것이기 때문에
//undefined로 넘어왔을 때는 값을 빈 객체로 선언한다. -> config = {}
//이렇게 해야 에러가 안난다.
export const useAxios = (url, config = {}) => {
	const response = ref(null);
	const data = ref(null);
	const error = ref(null);
	const loading = ref(false);

	const { params } = config;
	const execute = () => {
		data.value = null;
		error.value = null;
		loading.value = true;
		//axios(config) 또는 axios(url, config)
		//unref() : 매핑을 해제한다.
		axios(url, {
			...defaultConfig,
			...config,
			params: unref(params),
		})
			.then(res => {
				response.value = res;
				console.log('response.value: ', response.value);
				data.value = res.data;
			})
			.catch(err => {
				error.value = err;
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
		execute();
	}

	return {
		response,
		data,
		error,
		loading,
	};
};

//return{} 안에 있는 데이터들은 반응형으로 연결돼있기 때문에
//나중에 data.value = res.data;처럼 데이터를 삽입해도 해당 UI에서 감지해서 변경된다
// -> async, await을 넣지 않은 이유
