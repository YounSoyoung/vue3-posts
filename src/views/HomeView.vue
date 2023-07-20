<template>
	<div>
		<h2>Home View</h2>
		<!-- $route: 현재 페이지 컴포넌트에 대한 정보 출력 -->
		<p>{{ $route.path }}</p>
		<p>{{ $route.name }}</p>
		<button class="btn btn-primary" @click="goAboutPage">About으로 이동</button>
		<hr class="my-4" />
		<AppGrid :items="items" v-slot="{ item }">
			<AppCard>{{ item }}</AppCard>
		</AppGrid>
		<hr class="my-4" />
		<!-- <h2>{{ $person.name }}</h2> -->
		<!-- <button class="btn btn-primary" @click="person.say">click person</button> -->
		<h2>{{ position }}</h2>
		<h2>x: {{ x }}, y: {{ y }}</h2>
	</div>
</template>

<script>
export default {
	created() {
		// console.log(this.$person.name);
		// this.$person.say();
	},
};
</script>

<script setup>
import { reactive } from 'vue';
import { toRefs } from 'vue';
import { toRef } from 'vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter(); //router : HomeView
const goAboutPage = () => {
	router.push('/about');
};

const items = ref(['사과', '딸기', '포도', '바나나']);

// const person = inject('person');
// console.log('person.name: ', person.name);

const position = reactive({
	x: 100,
	y: 1000,
});

//positon은 반응형 객체이지만 안에 있는 x는 그냥 숫자이다. -> 반응형으로 동작 X
// const x = position.x;
// const { x, y } = position;
// const x = ref(position.x);
// const y = ref(position.y);
// console.log('x: ', typeof x.value);
// console.log('y: ', typeof y.value);

//toRefs는 구조분해 할당을 통해 가져올 수 있는 API
// const x = toRef(position, 'x');
// const y = toRef(position, 'y');
const { x, y } = toRefs(position);
</script>

<style lang="scss" scoped></style>
