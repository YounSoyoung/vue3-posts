<template>
	<div>
		<h2>About View</h2>
		<p>{{ $route.path }}</p>
		<!-- $router.push('/'): 다른 페이지 컴포넌트로 이동 -->
		<button class="btn btn-primary" @click="$router.push('/')">
			Home으로 이동
		</button>
		<h2>Store</h2>
		<p>counter: {{ counter }}</p>
		<p>doubleCount: {{ doubleCount }}</p>
		<p>doubleCountPlueOne: {{ doubleCountPlueOne }}</p>
		<button @click="increment()">Click!!</button>
	</div>
</template>

<script setup>
// 라우터 객체를 setup 함수 내에서 사용하고 싶다면 useRoute() 함수를 호출해서 사용할 수 있다
import { useRoute } from 'vue-router';
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';

const route = useRoute();
console.log('route.path: ', route.path);

const store = useCounterStore();
// console.log(store);
const { counter, doubleCount, doubleCountPlueOne } = storeToRefs(store);
const { increment } = store;
</script>

<style lang="scss" scoped></style>
